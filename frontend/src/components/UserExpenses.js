import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import $ from 'jquery';


class UserExpenses extends Component{
    constructor() {
        super();
        this.state = {
            list: [],
            redirect:null,
            total_cost:0.0,
            count:0,
            
        };
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        window.page=this;
    }

    componentDidMount() {
		this.getExpenseList();
        $('table tbody')
        .on('click',".btn-delete",function(){
            const btn=$(this);
            var tr = btn.parents('tr');
            const id=btn.val();
            console.log(id);
            btn.prop('disabled', true);
            $.ajax({
                type: "POST",
                url: '/api/deleteExpense',
                dataType: 'json',
                CrossDomain:true,
                data: {
                    id: parseInt(btn.val()),
                    userId:localStorage.getItem('userId')
                },
                success: function (response) {
                    if(response==="success"){
                        btn.prop('disabled', false);
                        tr.remove();
                    }else{
                        // console.log("removed");
                        alert(response);
                    }
                },
                fail: function (response) {
                    btn.prop('disabled', false);
                    alert('failed to delete')
                }
            })
        })
        .on('click',".btn-update",function(){
            
            const btn=$(this);
            window.page.setState({
                redirect:'/editExpense/'+btn.val()
            })
        });
    }
    delete(event) {
        event.preventDefault();
        // console.log("Ibrahim");
        // console.log(event.target.id);
        const headers = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'crossOrigin': true,
                'Access-Control-Allow-Origin' : '*'
                }
            }
           
        axios
        .post('/api/deleteExpense', {params:{'itemId':event.target.id,'userId':localStorage.getItem('userId')}}, headers)
        .then(response => {
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
    update(event) {
        event.preventDefault();
        const headers = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'crossOrigin': true,
                'Access-Control-Allow-Origin' : '*'
                }
            }
           
        axios
        .post('/api/editExpense', {params:{'itemId':event.target.id}}, headers)
        .then(response => {
            // console.log(response.data);
            this.setState({
                loader: '',
                status: response.data.message,
            });

            if(response.data.status == "success"){
                // console.log("Ibrahim");
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.userinfo.name);
                // console.log(response.data.userinfo.id);
                localStorage.setItem('userId',response.data.userinfo.id);
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
        .get('/api/getExpenseList',{params:{'userId':localStorage.getItem('userId')}},headers)
        .then(response => {

            if(response.data.status == 'success'){
                this.setState({
                    total_cost:0.0,
                    count:response.data.count,
                    total_cost:response.data.total_cost,
                    list: response.data.list,
                });
                console.log(response);

            }
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
        if(this.state.redirect){
            return( <Redirect to={this.state.redirect} /> )
        }

        return ( 
                <div id="wrapper">
                    <Navbar/>
                    <Sidebar/> 

                    <div className="main">
                        <div className="main-content">
                            <div className="container-fluid">
                                <h3 className="page-title">My expense list</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel">
                                            <div className="panel-body">
                                            {/* <form id='form_up_del' method="post"  action=""> */}

                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>#Nb</th>
                                                            <th>#Title</th>
                                                            <th>#Amount</th>
                                                            <th>#Category</th>
                                                            <th>#Description</th>
                                                            <th>#Expense/Due date</th>
                                                            <th>#Total</th>
                                                            {/* <th>#Added on</th> */}
                                                            <th>#Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        
                                                        {
                                                            this.state.list.map(function(item, i){
                                                                return <React.Fragment>
                                                                            <tr>
                                                                                    <td   name='item_id'>{(i+1)}</td>
                                                                                    <td   name='item_title'>{item.title}</td>
                                                                                    <td   name='item_amount'>{item.amount}</td>
                                                                                    <td   name='item_category'>{item.category}</td>
                                                                                    <td   name='item_description'>{item.description}</td>
                                                                                    <td   name='item_date'>{item.date}</td>
                                                                                    <td   name='item_cost'>{item.cost}</td>
                                                                                    {/* <td  key={i}>{item.added_on}</td> */}
                                                                                    <td>
                                                                                        <button value={item.id} className="btn btn-warning btn-sm btn-update" >Update</button>
                                                                                        | 
                                                                                        <button value={item.id} className="btn btn-danger btn-sm btn-delete" >Remove</button>
                                                                                    </td>
                                                                            </tr>
                                                                        </React.Fragment>  
                                                                        

                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                {/* </form> */}
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


export default UserExpenses;
