import React from 'react';

import './Signin.css';


// function Signin ({ onRouteChange }) {
    // --> instead we turn it to Smart component with own state
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail:'',
            signInPassword:''
        }
    }
    
    onEmailChange = (e) => {
        this.setState({signInEmail: e.target.value})
    };
    onPasswordChange = (e) => {
        this.setState({signInPassword: e.target.value})
    }
    onSubmitSignIn = () => {
        // console.log(this.state);
        fetch('http://localhost:3030/signin', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        
        .then(user=>{
            if(user.id){
                console.log(user);
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } 
        })  
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article id="#article" className="br3 ba  b--black-10 mv3 w-100 w-50-m w-25-l mw6 shadow-3 center">
              <main className="pa4 black-80">
                  <div className="measure">
                  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                          onClick={this.onSubmitSignIn}
                          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
                          type="submit" value="Sign in" />
                  </div>
                  <div className="lh-copy mt3">
                      <p 
                          onClick={()=>onRouteChange('register')}
                          className="f4 link dim black db pointer grow">Register
                      </p>
                  </div>
                  </div>
              </main>        
            </article>  
          )
    }
    
}

export default Signin;