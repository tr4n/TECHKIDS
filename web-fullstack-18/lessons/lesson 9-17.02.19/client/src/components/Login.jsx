

import React, { Component } from 'react';

import { Container, Input, Button, NavbarBrand } from 'reactstrap';
require('./Login.css');



export default class Login extends Component {
    render() {
        return (

            <section className="Login" style={{ position: 'absolute', top: 56, left: 0, bottom: 0, right: 0 }}>
                <div className="overlay"></div>
                <div className="login">
                    <div className="box ">

                        <div className="row">

                            <div className="col-3">
                                <Button color="primary" style={{ width: 200 }}> Login </Button>
                            </div>
                            <div className="col-3"></div>
                            <div className="col-6">
                                <NavbarBrand>Techkids Hotgirl</NavbarBrand>
                            </div>

                            <div className="col-6">
                            </div> <div className="col-6">
                                <h5>Techkids Hotgirl</h5>
                            </div>

                            <div className="col-6">
                            </div> <div className="col-6">
                                <div>Description</div>
                            </div>

                            <div className="col-6 image-banner" align="left">
                                
                            </div>
                            <div className="col-6 row">
                                <div className="col-12"><Button color="primary" block>Login with Facebook</Button></div>
                                <div className="col-12">or</div>
                                <div className="col-12"> <Input type="text" placeholder="username" /></div>
                                <div className="col-12"> <Input type="password" placeholder="password" /></div>
                                <div className="col-12"> <Input type="password" placeholder="password" /></div>
                                <div className="col-12"> <Button color="danger" block>Login </Button></div>
                                <div className="col-12">Type something</div>
                            </div>
                        </div>



                        {/* <img src="https://qph.fs.quoracdn.net/main-qimg-0cf805f3bc1d1a84ac203ff90a10b56b" width="301px" height="371px" alt="hotgirl" /> */}
                    </div>



                </div>

            </section>
        )
    }
}
