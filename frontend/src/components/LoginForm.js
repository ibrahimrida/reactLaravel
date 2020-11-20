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

        if(this.state.password == ''){
            this.setState({
                passwordErr: 'Password can not be empty.',
            });
            error.push("Password error");
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
            //     "email":this.state.email,
            //     "password":this.state.password
            //     }
            
            const headers = {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'crossOrigin': true,
                    'Access-Control-Allow-Origin' : '*'
                    }
                }
                
            const form = document.getElementById('form_login');

            const formData = new FormData(form);
               
            axios
            .post('/api/userLogin', formData, headers)
            .then(response => {
                // console.log(response.data);
                this.setState({
                    loader: '',
                    status: response.data.message,
                });

                if(response.data.status == "success"){
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('name', response.data.userinfo.name);
                    localStorage.setItem('userId',response.data.userinfo.id);
                    this.setState({
                        redirect:true
                    });
                }
                else if(response.data.status=="fail"){
                    this.setState({
                        password:'' 
                    })
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
            return( <Redirect to={'/myExpenses'} /> )
        }

        if(localStorage.getItem('name')){
            return( <Redirect to={'/myExpenses'} /> )
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
                                        <p className="lead">Login to your account</p>
                                    </div>
                                    
                                    <form id="form_login" className="form-auth-small" action="" method="post" onSubmit={this.handleSubmit}>
                                        
                                        <div className="form-group">
                                            <label htmlFor="signin-email" className="control-label sr-only">Email</label>
                                            <input type="email" className="form-control" id="signin-email" name="email" placeholder="enter email here.." onChange={this.handlechangeall} />
                                            <span>{ this.state.emialErr }</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="signin-password" className="control-label sr-only">Password</label>
                                            <input type="password" className="form-control" value={this.state.password} id="signin-password" name="password" placeholder="enter password here.." onChange={this.handlechangeall}  />
                                            <span>{ this.state.passwordErr }</span> 
                                        </div>

                                        <div className="form-group clearfix">
                                            {/* <label className="fancy-checkbox element-left">
                                                <input type="checkbox"  />
                                                <span>Remember me</span>
                                            </label> */}
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-lg btn-block">LOGIN</button>

                                        <div className="bottom">
                                        <span className="helper-text"><i className="fa fa-lock"></i> New User? <a href="register">Create account.</a></span>
                                            {/* <span className="helper-text"><i className="fa fa-lock"></i> <a href="#">Forgot password?</a></span> */}
                                        </div>

                                        <span>
                                            <img src={loader} alt="loading..." style={{display: this.state.loader == 'show' ? 'block' : 'none' }}  />
                                            {this.state.status}
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













