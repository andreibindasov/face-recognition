import React from 'react';

import './Register.css';


// function Register ({ onRouteChange }) {
class Register extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            registerName:'',
            registerEmail:'',
            registerPassword:''
        }
    }

    onNameChange = (e) => {
        this.setState({registerName: e.target.value})
    }    
    onEmailChange = (e) => {
        this.setState({registerEmail: e.target.value})
    }   
    onPasswordChange = (e) => {
        this.setState({registerPassword: e.target.value})
    }     

    onSubmitRegister = () => {
        // console.log(this.state);
        fetch('http://localhost:3030/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(res => res.json())
        .then(user => {
            if (user) {
                console.log(user);
                this.props.loadUser(user);
                // go to App.js and update user profile addid some props to STATE
                this.props.onRouteChange('home');
            }
            
        })
    }
    
    render () {
        // const { onRouteChange } = this.props;
        return (
            <article className="br3 ba  b--black-10 mv3 w-100 w-50-m w-25-l mw6 shadow-3 center">
              <main className="pa4 black-80">
                  <div className="measure">
                  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="f1 fw6 ph0 mh0">Register</legend>
                      
                      <div className="mt3">
                          <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                          <input 
                              onChange = {this.onNameChange}
                              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                              type="text"
                              name="name"
                              id="name" />
                      </div>
                      
                      <div className="mt3">
                          <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                          <input 
                              onChange = {this.onEmailChange}  
                              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                              type="email"
                              name="email-address"
                              id="email-address" />
                      </div>
                      <div className="mv3">
                          <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                          <input 
                              onChange = {this.onPasswordChange}  
                              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                              type="password"
                              name="password"
                              id="password" />
                      </div>
                  </fieldset>
                  <div className="">
                      <input 
                          onClick={this.onSubmitRegister}
                          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
                          type="submit" value="Register" />
                  </div>
                  
                  </div>
              </main>        
            </article>  
          )
    }
    
}

export default Register;