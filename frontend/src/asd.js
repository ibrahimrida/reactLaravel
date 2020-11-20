import React, { Component } from 'react';
import axios from 'axios';


class LoginForm extends Component{
    constructor() {
        super();
        this.state = {
                        email: '',
                        password:'',
                        emialErr: '',
                        passwordErr: '',
                        status: ''
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
            var payload={
                "email":this.state.email,
                "password":this.state.password
                }

            axios
            .post('/api/verifyUser', payload)
            .then(response => {
                this.setState({
                    status: response.data.message,//response.data,
                });
                console.log(response.data);
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        status: '',
                    });
                    console.log(error.response);
                  }
            });
             
        }

    }
    
    render(){
        return (
            <div>
                <p>
                    <b>Email:</b> raj@gmail.com <br/>
                    <b>Password:</b> 12345
                </p>
                <form action="" method="post" onSubmit={this.handleSubmit}>
                    <input type="text" name="email" placeholder="enter email here.." onChange={this.handlechangeall}/>
                    <br/> <span>{ this.state.emialErr }</span> 
                    <br/><br/>
                    <input type="password" name="password" placeholder="enter password here.." onChange={this.handlechangeall}/>
                    <br/> <span>{ this.state.passwordErr }</span>  <br/><br/>

                    <input type="submit"></input>
                    <br/><br/>
                    <span>{ this.state.status }</span>
                </form>
            </div>
        )
    }
}


export default LoginForm;


