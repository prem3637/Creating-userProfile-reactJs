import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState } from "react";
// import Barcode from "react-barcode";
import { useParams } from 'react-router-dom'
export default function Profile() {
    const [userdata, setUserdata] = useState({})
    const { userid } = useParams()
    useEffect(() => {
        let url = 'http://localhost:5000/users/' + userid
        let promise = fetch(url)
        promise.then((response) => {
            return response.json()
        }).then((data) => {
            setUserdata(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <>
            <h1 className=" text-success text-center">My Profile</h1>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6 text-center">
                        <div className="card">
                            <div className="card-title">
                                <h2 className="text-danger">{userdata.email}</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <b>name : {userdata.name}</b><br />
                                        <b>mobile : {userdata.mobile}</b><br />
                                        <b>email : {userdata.email}</b><br />
                                    </div><br />
                                    <div className="col-sm-4">
                                        {/* <Barcode format="CODE128" width={1} displayValue={false} value={`${userdata.name} ${userdata.email} ${userdata.mobile}`} /> */}
                                        <QRCodeSVG value={`name : ${userdata.name},  email : ${userdata.email}, mobile : ${userdata.mobile} `} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        </>
    )
}