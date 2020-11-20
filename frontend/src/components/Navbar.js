import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';

class Navbar extends Component{
    constructor() {
        super();
        this.state = {
            name: localStorage.getItem('name')
        };
        
    }


    render(){
        // if(!localStorage.getItem('name')){
        //     return( <Redirect to={'/login'} /> )
        // }

        return (
                <div className="container-fluid">
                    <nav className="navbar navbar-default navbar-fixed-top">
                        <div className="brand">
                            <a href="/dashboard">
                                
                                <img src="assets/img/nav.png" alt="Klorofil Logo" className="img-responsive logo" />
                            </a>
                        </div>
                        <div className="container-fluid">
                            {/* <div className="navbar-btn">
                                <button type="button" className="btn-toggle-fullwidth"><i className="lnr lnr-arrow-left-circle"></i></button>
                            </div> */}
                            <form className="navbar-form navbar-left">
                                {/* <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search dashboard..."/>
                                    <span className="input-group-btn"><button type="button" className="btn btn-primary">Go</button></span>
                                </div> */}
                            </form>

                            <div id="navbar-menu">
                                <ul className="nav navbar-nav navbar-right">

                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><img src="assets/img/user.png" className="img-circle" alt="Avatar"/> <span>{ this.state.name}</span> <i className="icon-submenu lnr lnr-chevron-down"></i></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="/profile"><i className="lnr lnr-user"></i> <span>My Profile</span></a></li>
                                            <li><NavLink to="/logout" ><i className="lnr lnr-exit"></i> <span>Logout</span></NavLink></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>   
                </div>           
            )
    }
}


export default Navbar;
