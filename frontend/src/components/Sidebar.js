import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';

class Sidebar extends Component{
    constructor() {
        super();

    }


    render(){
        // if(!localStorage.getItem('name')){
        //     return( <Redirect to={'/login'} /> )
        // }

        return (
                <div id="sidebar-nav" className="sidebar">
                    <div className="sidebar-scroll">
                        <nav>
                            <ul className="nav">
                                <li><NavLink to="/dashboard" ><i className="lnr lnr-home"></i> <span>Dashboard</span></NavLink></li>
                                <li><NavLink to="/myExpenses" ><i className="lnr lnr-dice"></i> <span>My Expense</span></NavLink></li>
                                <li><NavLink to="/addExpenses" ><i className="lnr lnr-dice"></i> <span>Add Expenses</span></NavLink></li>
                                {/* <li><NavLink to="/profile" ><i className="lnr lnr-dice"></i> <span>Profile</span></NavLink></li>
                                <li><NavLink to="/logout" ><i className="lnr lnr-code"></i> <span>Logout</span></NavLink></li> */}
                            </ul>
                        </nav>
                    </div>
                </div>                 
        )
    }
}


export default Sidebar;
