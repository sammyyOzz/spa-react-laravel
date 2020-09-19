import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            // isRegistered: false,
            // error: '',
            // errorMessage: '',
            // formSubmitting: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let userData = this.state.user;
        axios.post("/api/auth/signup", userData)
    //     .then(response => {
    //         return response;
    //     })
    //     .then(json => {
    //   if (json.data.success) {
    //     let userData = {
    //       id: json.data.id,
    //       name: json.data.name,
    //       email: json.data.email,
    //       activation_token: json.data.activation_token,
    //     };
    }


    handleName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
          user: {
            ...prevState.user, name: value
          }
        }));
      }// 2.5

      handleEmail(e) {
        let value = e.target.value;
        this.setState(prevState => ({
          user: {
            ...prevState.user, email: value
          }
        }));
      }

      handlePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
          user: {
            ...prevState.user, password: value
          }
        }));
      }

      handlePasswordConfirm(e) {
        let value = e.target.value;
        this.setState(prevState => ({
          user: {
            ...prevState.user, password_confirmation: value
          }
        }));
      }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleName} /><br/>
                    <input type="email" name="email" onChange={this.handleEmail} /><br/>
                    <input type="password" name="password" onChange={this.handlePassword} /><br/>
                    <input type="password" name="password_confirmation" onChange={this.handlePasswordConfirm} /><br/>
                    <input type="submit" name="submit" value="submit" style={{color: "blue"}}/>
                </form>
            </div>
        )
    }
}

export default Register;
