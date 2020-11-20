import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

import {Redirect} from 'react-router-dom';

class Dashboard extends Component{
    constructor() {
        super();
        this.state = {
            list: [],
            redirect:null,
            total_cost:0.0,
            count:0,
            user:null,
            message:'',
            user:null,
            
        };

    }
    getExpenseList(){
        const headers = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'crossOrigin': true,
                'Access-Control-Allow-Origin' : '*'
                }
            }
        axios
        .get('/api/getExpenseAndUser',{params:{'userId':localStorage.getItem('userId')}},headers)
        .then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    total_cost:0.0,
                    count:response.data.count,
                    total_cost:response.data.total_cost,
                    list: response.data.list,
                    user:response.data.user,
                    message:'Hello '+this.state.user.name+',\nSo glad to use our application.\n'
                    +'You registered to our application at '+this.state.user.created_at
                    +'Your Email is '+this.state.user.email
                    +'You have till now '+this.state.count
                    +' items you bought which are of total cost: '+this.state.total_cost+'$ .',
                });
                console.log(this.state);

            }
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response);
              }
        });
    }

    componentDidMount() {
        this.getExpenseList();
    }
    render(){
        if(!localStorage.getItem('name')){
            return( <Redirect to={'/login'} /> )
        }

        return (
            <div>
                <div id="wrapper">
                    <Navbar/>
                    <Sidebar/> 

                    <div className="main">
                        <div className="main-content">
                            <div className="container-fluid">
                                <div className="panel panel-headline">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Weekly Overview</h3>
                                        <p className="panel-subtitle">Period: Oct 14, 2016 - Oct 21, 2016</p>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>{this.state.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>

                    <Footer/>
                </div>
            </div>
        )
    }
}


export default Dashboard;
