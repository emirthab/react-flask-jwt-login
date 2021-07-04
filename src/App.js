import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import { useState, useEffect } from 'react';
import animprinter from './img/animated-printer.gif'
import logo from './img/company-logo-0.png'

export default function App() {
    const [response, setResponse] = useState("waiting")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")    
    
    useEffect(()=>{
        console.log(response)
    },[response])
    useEffect(() => {
        const _token = localStorage.getItem("token")    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, password: password, token: _token })
        };
        const url = "/api/v1/login"
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => setResponse(data.resp))            
    }, [])
    const handleClickLogOut = () => {
        localStorage.removeItem("token")
        setResponse("")
    }
    const handleClickLogIn = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, password: password, token: "" })
        };
        const url = "/api/v1/login"
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {                
                setResponse(data.resp)
                localStorage.setItem("token",data.token)
            })

        if (response == "wrongpass") {
            alert("şifre yanlış")
        }
        else if (response == "wrongusername") {
            alert("kullanıcı adı yanlış")
        }        
    }

    const nameChange = (event) => {
        setUsername(event.target.value);
    }

    const passChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div id="wrapper" style={{ height: "100vh" }}>
            <div className="d-flex flex-column" id="content-wrapper" style={{ height: "95vh" }}>
                <div id="content">
                    <div className="container shadow-sm"
                        style={{ margin: "0 auto", marginBottom: "10px", background: "#ffffff", maxWidth: "400px" }}>
                        <div className="row">
                            <div className="col"><img className="d-flex justify-content-sm-center align-items-sm-center"
                                src={logo}
                                style={{ margin: "0 auto", transform: "translate(7px", height: "100px" }} /></div>
                        </div>
                    </div>
                    <div className="container" style={{ width: "100%" }}>
                        <div className="card d-flex" style={{ maxWidth: "400px", margin: "0 auto", marginTop: "30px" }}>
                            <div className="card-body">
                                <div style={{ width: "100%" }}><a
                                    className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
                                    href="#" style={{ fontSize: "30px" }}>
                                    <div className="sidebar-brand-icon rotate-n-15"><i
                                        className="fas fa-laugh-wink"></i>
                                    </div>
                                    <div className="sidebar-brand-text mx-3"><span>Akıllı Çıktı</span></div>
                                </a><img className="d-flex justify-content-center align-items-center"
                                    src={animprinter}
                                    style={{ width: "170px", margin: "0 auto", marginTop: "-20px" }} /></div>
                                {response != "ok" && response!= "waiting"  &&
                                    <div>
                                        <div className="float-start" style={{ marginBottom: "30px", marginTop: "20px" }}>
                                            <h5 className="float-start">Kullanıcı adı :</h5><input onChange={nameChange} type="text"
                                                style={{ marginLeft: "20px" }} name="name" id="name" />
                                        </div>
                                        <div>
                                            <h5 className="float-start">Şifre :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            </h5>
                                            <input onChange={passChange} type="password" style={{ marginLeft: "20px", marginBottom: "20px" }} name="pass" id="pass" />
                                        </div>
                                        <button onClick={handleClickLogIn} className="btn btn-primary" style={{ marginTop: "35px", margin: "0 auto", display: "flex" }}>Giriş
                                    Yap</button>
                                    </div>
                                }         
                                {response == "ok" &&
                                <div className="text-center">
                                    <h4>Giriş Başarılı...</h4>  
                                    <button onClick={handleClickLogOut} className="btn btn-primary" style={{ marginTop: "35px", margin: "0 auto", display: "flex" }}>Çıkış
                                    Yap</button>                                  
                                </div>
                                }                       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "auto", minWidth: "auto", marginBottom: "15px", color: "rgb(181,182,188)" }}>Akıllı Çıktı 2021
                - Made by Emir Bahçeci
            </span>
        </div>
    )
}

function user() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">

                    </Route>
                    <Route path="/dashboard">
                        dashboard
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

