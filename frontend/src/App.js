import React from 'react';
import logo from './logo.svg';
//import './App.css';
import LoginForm from './components/LoginForm';
import AddExpenses from './components/AddExpenses';
import EditExpense from './components/EditExpense';
import Dashboard from './components/Dashboard';
import UserExpenses from './components/UserExpenses';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Register from './components/Register';


import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>      
        <Route exact path="/" component={LoginForm} />
        <Route path="/login" component={LoginForm} /> 
        <Route path="/myExpenses" component={UserExpenses} />
        <Route path="/addExpenses" component={AddExpenses} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <Route path="/editExpense/:id" component={EditExpense} />
      </Router> 
    </div>
  );
}

export default App;
