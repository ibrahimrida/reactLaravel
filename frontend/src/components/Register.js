import React, { Component } from 'react';
import axios from 'axios';
import loader from '../assets/loader.gif';
import {Redirect} from 'react-router-dom';

class LoginForm extends Component{
    constructor() {
        super();
        this.state = {
                        email: '',
                        password:'',
                        emialErr: '',
                        passwordErr: '',
                        status: '',
                        loader: 'none',
                        redirect:false,
                    };
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
    }

    handleSubmit(event) {
        event.preventDefault();
        var error = [];
        if(this.state.email == ''){
            this.setState({
                emialErr: 'Email can not be empty.',
            });
            error.push("Email error");
        }else{
            this.setState({
                emialErr: '',
            });
        }

        if(document.getElementById("signup-password-confirm").value == '' || document.getElementById("signup-password").value==''){
            this.setState({
                passwordErr: 'Password can not be empty.',
            });
            error.push("Password error");
            document.getElementById("signup-password-confirm").value="";
            document.getElementById("signup-password").value="";
        }else{
            this.setState({
                passwordErr: '',
            });
        }
        if(document.getElementById("signup-password-confirm").value != document.getElementById("signup-password").value){
            this.setState({
                passwordErr: 'Passwords do not match',
            });
            error.push("Password error");
            document.getElementById("signup-password-confirm").value="";
            document.getElementById("signup-password").value="";
        }else{
            this.setState({
                passwordErr: '',
            });
        }

        if(error.length > 0){
            return;
        }else{
            this.setState({
                status: '',
                loader: 'show'
            });
            //loader
            // var payload={
            //     data:{
            //     "email":this.state.email,
            //     "password":this.state.password,
            //     "name":this.state.name
            //     }
            // } 
            const form = document.getElementById('form_register');

            const formData = new FormData(form);
            const headers = {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'crossOrigin': true,
                    'Access-Control-Allow-Origin' : '*'
                    }
                }
                
            axios
            .post('/api/addUser', formData, headers)
            .then(response => {
                this.setState({
                    loader: '',
                    status: response.data.message,
                });
                if(response.data.status == "success"){
                    this.setState({
                        redirect:true
                    });
                }
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        loader: '',
                        status: '',
                    });
                    console.log(error.response);
                  }
            });
             
        }
    }
    
    render(){

        if(this.state.redirect == true  || localStorage.getItem('name')){
            return( <Redirect to={'/login'} /> )
        }

        if(localStorage.getItem('name')){
            return( <Redirect to={'/login'} /> )
        }

        return (
            
            <div id="wrapper">
                <div className="vertical-align-wrap">
                    <div className="vertical-align-middle">
                        <div className="auth-box ">
                            <div className="left">
                                <div className="content">
                                    <div className="header">
                                        <div className="logo text-center">
                                            <img src="assets/img/logo-dark.png" alt="Klorofil Logo" />
                                        </div>
                                        <p className="lead">Register new account</p>
                                    </div>
                                    
                                    <form id="form_register" className="form-auth-small" action="" method="post" onSubmit={this.handleSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="signup-name" className="control-label sr-only">Name</label>
                                            <input type="text" className="form-control" id="signup-name" name="name" placeholder="enter name here.." onChange={this.handlechangeall} />
                                            <span>{ this.state.emialErr }</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="signup-email" className="control-label sr-only">Email</label>
                                            <input type="email" className="form-control" id="signup-email" name="email" placeholder="enter email here.." onChange={this.handlechangeall} />
                                            <span>{ this.state.emialErr }</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="signup-password" className="control-label sr-only">Password</label>
                                            <input type="password" className="form-control" id="signup-password" name="password" placeholder="enter password" onChange={this.handlechangeall}  />
                                            <span>{ this.state.passwordErr }</span> 
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="signup-password" className="control-label sr-only">Password</label>
                                            <input type="password" className="form-control" id="signup-password-confirm" name="password_confirmation" placeholder="Confirm Your Password" onChange={this.handlechangeall}  />
                                            <span>{ this.state.passwordErr }</span> 
                                        </div>

                                        <div className="form-group clearfix">
                                            {/* <label className="fancy-checkbox element-left">
                                                <input type="checkbox"  />
                                                <span>Remember me</span>
                                            </label> */}
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>

                                        <div className="bottom">
                                        <span className="helper-text"><i className="fa fa-lock"></i> Already have an account? <a href="login">Sign in.</a></span>
                                            {/* <span className="helper-text"><i className="fa fa-lock"></i> <a href="#">Forgot password?</a></span> */}
                                        </div>

                                        <span>
                                            <img src={loader} alt="loading..." style={{display: this.state.loader == 'show' ? 'block' : 'none' }}  />{this.state.status}
                                        </span>

                                    </form>
                                </div>
                            </div>

                            <div className="right">
                                <div className="overlay"></div>
                                <div className="content text">
                                    <h1 className="heading">Expense tracking system</h1>
                                    <p>by Ibrahim Rida</p>
                                </div>
                            </div>

                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default LoginForm;













