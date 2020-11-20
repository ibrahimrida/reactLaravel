import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

import {Redirect} from 'react-router-dom';

class Profile extends Component{
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            city: "",
            age: ""
        };
    }

    componentDidMount() {
		this.getUsers();
		//this.getCategories();
    }



    getUsers() {
        // const headers = {
        //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
        //     'Content-Type': 'application/json'
        //     }
        axios
        .get('http://localhost/jobs/ReactJS/ReactLaravel/backend/public/api/viewUser', {
            headers: { Authorization: `Bearer ${localStorage.token}` }
        })
        .then(response => {
            console.log(response);
            this.setState({
                name: response.data.userdata.name,
                email: response.data.userdata.email,
                city: response.data.userdata.city,
                age: response.data.userdata.age,
            });
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response);
              }
        });
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
					<div className="panel panel-profile">
						<div className="clearfix">
							<div className="profile-left">
								<div className="profile-header">
									<div className="overlay"></div>
									<div className="profile-main">
										<img src="assets/img/user-medium.png" className="img-circle" alt="Avatar"/>
										<h3 className="name">{ this.state.name }</h3>
										<span className="online-status status-available">Available</span>
									</div>
									{/* <div className="profile-stat">
										<div className="row">
											<div className="col-md-4 stat-item">
												45 <span>Projects</span>
											</div>
											<div className="col-md-4 stat-item">
												15 <span>Awards</span>
											</div>
											<div className="col-md-4 stat-item">
												2174 <span>Points</span>
											</div>
										</div>
									</div> */}
								</div>
								<div className="profile-detail">
									<div className="profile-info">
										<h4 className="heading">Basic Info</h4>
										<ul className="list-unstyled list-justify">
											<li>Age <span>{ this.state.age }</span></li>
											<li>Email <span>{ this.state.email }</span></li>
											<li>City <span>{ this.state.city }</span></li>
										</ul>
									</div>
									{/* <div className="profile-info">
										<h4 className="heading">Social</h4>
										<ul className="list-inline social-icons">
											<li><a href="#" className="facebook-bg"><i className="fa fa-facebook"></i></a></li>
											<li><a href="#" className="twitter-bg"><i className="fa fa-twitter"></i></a></li>
											<li><a href="#" className="google-plus-bg"><i className="fa fa-google-plus"></i></a></li>
											<li><a href="#" className="github-bg"><i className="fa fa-github"></i></a></li>
										</ul>
									</div> */}
									<div className="profile-info">
										<h4 className="heading">About</h4>
										<p>Interactively fashion excellent information after distinctive outsourcing.</p>
									</div>
									<div className="text-center"><a href="#" className="btn btn-primary">Edit Profile</a></div>
								</div>
							</div>
							<div className="profile-right">
								<h4 className="heading">{this.state.name}'s Detail</h4>
								<div className="awards">
									<div className="row">
										<div className="col-md-3 col-sm-6">
											<div className="award-item">
												<div className="hexagon">
													<span className="lnr lnr-sun award-icon"></span>
												</div>
												<span>Most Bright Idea</span>
											</div>
										</div>
										<div className="col-md-3 col-sm-6">
											<div className="award-item">
												<div className="hexagon">
													<span className="lnr lnr-clock award-icon"></span>
												</div>
												<span>Most On-Time</span>
											</div>
										</div>
										<div className="col-md-3 col-sm-6">
											<div className="award-item">
												<div className="hexagon">
													<span className="lnr lnr-magic-wand award-icon"></span>
												</div>
												<span>Problem Solver</span>
											</div>
										</div>
										<div className="col-md-3 col-sm-6">
											<div className="award-item">
												<div className="hexagon">
													<span className="lnr lnr-heart award-icon"></span>
												</div>
												<span>Most Loved</span>
											</div>
										</div>
									</div>
									{/* <div className="text-center"><a href="#" className="btn btn-default">See all awards</a></div> */}
								</div>
								<div className="custom-tabs-line tabs-line-bottom left-aligned">
									<ul className="nav" role="tablist">
										<li className="active"><a href="#tab-bottom-left1" role="tab" data-toggle="tab">Recent Added Expenses</a></li>
										
									</ul>
								</div>
								<div className="tab-content">
									<div className="tab-pane fade in active" id="tab-bottom-left1">
										<ul className="list-unstyled activity-timeline">
											<li>
												<i className="fa fa-comment activity-icon"></i>
												<p>Commented on post <a href="#">Prototyping</a> <span className="timestamp">2 minutes ago</span></p>
											</li>
											<li>
												<i className="fa fa-cloud-upload activity-icon"></i>
												<p>Uploaded new file <a href="#">Proposal.docx</a> to project <a href="#">New Year Campaign</a> <span className="timestamp">7 hours ago</span></p>
											</li>
											<li>
												<i className="fa fa-plus activity-icon"></i>
												<p>Added <a href="#">Martin</a> and <a href="#">3 others colleagues</a> to project repository <span className="timestamp">Yesterday</span></p>
											</li>
											<li>
												<i className="fa fa-check activity-icon"></i>
												<p>Finished 80% of all <a href="#">assigned tasks</a> <span className="timestamp">1 day ago</span></p>
											</li>
										</ul>
									</div>
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


export default Profile;
