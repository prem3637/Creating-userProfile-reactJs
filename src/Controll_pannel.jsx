import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './control_pannel.css'
export default function Controll_pannel() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [username, setUserName] = useState('')
    const [userPass, setUserPass] = useState('')
    const [alldata, setAlldata] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        let url = 'http://localhost:5000/users'
        let promise = fetch(url)
        promise.then((response) => {
            return response.json()
        }).then((data) => {
            setAlldata(data)
        }).catch((error) => {
            console.log(error)
        })

    }, [])

    function handleRegister(e) {
        e.preventDefault()

        let url = 'http://localhost:5000/users'
        let newobj = { name, email, password, mobile }
        let promise = fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(newobj)
        })
        promise.then((response) => {
            if (response.ok) {
                alert("Register Successfully...")
                window.location.reload()
            }
        }).then((data) => {
            setName('')
            setEmail('')
            setMobile('')
            setPassword('')
        }).catch((error) => {
            console.log(error)
        })
    }
    function handleLogin(e) {
        e.preventDefault()
        let flag = 0
        let id = 1
        alldata.map((data, index) => {
            if (data.email === username && data.password === userPass) {
                flag++
                id = data.id
            }
        })
        if (flag) {
            alert('Login successfully...')
            setUserName('')
            setUserPass('')
            navigate('/' + username + '/' + id)

        } else {
            alert('username or password incorrect...')
            setUserName('')
            setUserPass('')
        }

    }

    function handleForm(e) {
        let reg = document.querySelector('.register')
        let log = document.querySelector('.login')
        let btn = e.target.value
        if (btn === 'Register') {
            reg.style.display = 'block'
            log.style.display = 'none'
            e.target.value = 'Login'
        } else {
            log.style.display = 'block'
            reg.style.display = 'none'
            e.target.value = 'Register'
        }

    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div id="btn-div">
                        <input type="button" className="btn btn-outline-warning" value="Login" onClick={(e) => { handleForm(e) }} />
                        <div className="col-sm-2"></div>
                    </div>
                    <div className="col-sm-4 register">
                        <h1>Register</h1>
                        <form onSubmit={handleRegister}>
                            <label>Name</label><br />
                            <input type="text" required placeholder="Enter your name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" />
                            <label>Email</label><br />
                            <input type="email" required placeholder="Enter your mail_id" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" />
                            <label>Password</label><br />
                            <input type="password" required value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Your Password" className="form-control" />
                            <label>Mobile</label><br />
                            <input type="number" required value={mobile} onChange={(e) => { setMobile(e.target.value) }} placeholder="Enter ur number" className="form-control" /><br />
                            <input type="submit" value="Register" className="btn btn-success" />
                        </form>
                    </div>
                    <div className="col-sm-4 login">
                        <h1>Login Here !</h1>
                        <form onSubmit={handleLogin}>
                            <label>Email</label><br />
                            <input type="email" required value={username} onChange={(e) => { setUserName(e.target.value) }} className="form-control" placeholder="Enter your Email" />
                            <label>Password</label>
                            <input type="password" required value={userPass} onChange={(e) => { setUserPass(e.target.value) }} className="form-control" placeholder="Enter Your Password.." /> <br />
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </form>
                    </div>

                    <div className="col-sm-2"></div>
                </div>
            </div>
        </>

    )
}