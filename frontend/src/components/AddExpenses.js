import React, { Component } from 'react';
import axios from 'axios';
import loader from '../assets/loader.gif';
import {Redirect} from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

class AddExpenses extends Component{
    constructor() {
        super();
        var today = new Date();
        //var input = '01/01/1997';
        //var datePlce = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var datePlce =today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        
        this.state = {
                        categories: [],
                        expenseTitle: '',
                        titleErr: '',
                        expenseDescription:'',
                        descriptionErr: '',
                        cost: '',
                        costErr: '',
                        date: '',
                        dateErr: '',
                        category: '',
                        categoryErr: '',
                        status: '',
                        loader: 'none',
                        date_placeholder: datePlce,
                        redirect:false,
                    };


   
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
		this.getCategories();
    }

	getCategories(){
		axios
        .get('/api/getCategories')
        .then(response => {
            if(response.data.status == 'success'){
                this.setState({
                    categories: response.data.categoryList,
                });
            }
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response);
              }
        });
	}

    handlechangeall = (event) =>{
        this.setState ( { [event.target.name] :event.target.value  } )
    }

    countDecimals = (value) =>{
        if((value % 1 === 0) == false){
            if(Math.floor(value) === value) return 0;
            return value.toString().split(".")[1].length || 0;
        }        
    }

    handleSubmit(event) {
        event.preventDefault();
        var error = [];
        if(this.state.expenseTitle == ''){
            this.setState({
                titleErr: 'Title can not be empty.',
            });
            error.push("Title error");
        }else{
            this.setState({
                titleErr: '',
            });
        }

        if(this.state.description == ''){
            this.setState({
                descriptionErr: 'Description can not be empty.',
            });
            error.push("Description error");
        }else{
            this.setState({
                descriptionErr: '',
            });
        }

        if(this.state.amount == ''){
            this.setState({
                costErr: 'Expense amount can not be empty.',
            });
            error.push("Expense error");
        }else{

            if(!isNaN(this.state.amount)){
                if(this.countDecimals(this.state.amount) == 0){
                    this.state.amount = this.state.amount + '00';
                }
                this.setState({
                    costErr: '',
                });            
            }else{
                this.setState({
                    costErr: 'Invalid amount entered.',
                });
                error.push("Expense error");
            }
        }

        if(this.state.date == ''){
            this.setState({
                dateErr: 'Date of expense can not be empty.',
            });
            error.push("Date error");
        }
        if(this.state.category == ''){
            this.setState({
                categoryErr: 'Please select a category',
            });
            error.push("Category error");
        }else{
            this.setState({
                categoryErr: '',
            });
        }

        if(error.length > 0){
            return;
        }else{
            this.setState({
                status: '',
                loader: 'show' //loader
            });
           
            // var payload={
            //             "expenseTitle":this.state.expenseTitle,
            //             "expenseDescription":this.state.expenseDescription,
            //             "cost":this.state.cost,
            //             "date":this.state.date,
            //             "category":this.state.category,
            //     }
            
            const headers = {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'crossOrigin': true,
                    'Access-Control-Allow-Origin' : '*'
                    }
                }
            const form = document.getElementById('form_add_expense');

            const formData = new FormData(form);
            formData.append('userId',localStorage.getItem('userId'))
            // var headers = {
            //     headers: {'Authorization': "bearer " + localStorage.getItem('token')}
            // };

            axios
            .post('/api/addExpense', formData, headers)
            .then(response => {
                this.setState({
                    loader: '',
                    status: response.data.message,//response.data,
                });
                if(response.data.status == "success"){
                    localStorage.setItem('token', response.data.token);
                    this.setState({
                        redirect:true
                    });
                }            })
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
        if(!localStorage.getItem('name')){
            return( <Redirect to={'/login'} /> )
        }
        if(this.state.redirect==true){
            return( <Redirect to={'/myExpenses'} /> )
        }

        return (
            <div id="wrapper">
            <Navbar/>
            <Sidebar/> 


            <div className="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h3 className="page-title">Add your expense here.</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel">
                                    {/* <div className="panel-heading">
                                        <h3 className="panel-title">Inputs</h3>
                                    </div> */}
                                    <div className="panel-body">
                                        <form id="form_add_expense" action="" method="post" onSubmit={this.handleSubmit}>
                                            <input type="text" className="form-control input-lg" name="expenseTitle" placeholder="Title" onChange={this.handlechangeall} />
                                            <span>{ this.state.titleErr }</span>
                                            
                                            <br/>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">₹ Amount</span>
                                                        <input className="form-control input-lg" min="0.00"
                                                          step="0.01" name="amount"  type="number"  onChange={this.handlechangeall}/>
                                                    </div>
                                                    <span>{ this.state.costErr }</span>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">Date</span>
                                                        <input className="form-control input-lg" name="date" type="date" onChange={this.handlechangeall} placeholder={this.state.date_placeholder}/>
                                                    </div>
                                                    <span>{ this.state.dateErr }</span>
                                                </div>
                                                <div className="col-sm-4">
                                                <select className="form-control input-lg" name="category" onChange={this.handlechangeall}>
                                                    <option value="">Category</option>
                                                    {
                                                        this.state.categories.map(function(item, i){
                                                            return <option key={i} value={item.name}>{item.name}</option>
                                                        })
                                                    }
                                                    </select>
                                                    <span>{ this.state.categoryErr }</span>
                                                </div>
                                            </div>
                                            <br/>
                                            <textarea className="form-control input-lg" name="description" placeholder="Description" rows="8" onChange={this.handlechangeall}></textarea>
                                            <span>{ this.state.descriptionErr }</span>
                                            <br/>
                                            <br/>
                                            <button type="submit" className="btn btn-success btn-lg">Save</button>
                                        </form>
                                        <br/>

                                        <span>
                                            <img src={loader} alt="loading..." style={{display: this.state.loader == 'show' ? 'block' : 'none' }}  />{this.state.status}
                                        </span>


                                       
                                        
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
            
        )
    }
}


export default AddExpenses;
