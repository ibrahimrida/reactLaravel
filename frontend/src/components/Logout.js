import React, { Component } from 'react';
//import Sidebar from './Sidebar';
import {Redirect} from 'react-router-dom';

class Logout extends Component{
    constructor() {
        super();
        localStorage.removeItem('name');
        localStorage.removeItem('token');
    }


    render(){
        if(!localStorage.getItem('name')){
            return( <Redirect to={'/login'} /> )
        }

        return (
            <div>
                
            </div>
        )
    }
}


export default Logout;
