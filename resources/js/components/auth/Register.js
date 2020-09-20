import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function Register() {
    const classes = useStyles();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("/api/auth/signup", user)
        .then(() => {
            alert(`congratulations ${user.name} for registering with us`)
        })
        .catch(() => {
            alert("sorry, your details are invalid")
        })
    }

    function handleName(e) {
        let value = e.target.value;
        setUser({...user, name: value});
    }

    function handleEmail(e) {
        let value = e.target.value;
        setUser({...user, email: value});
    }

    function handlePassword(e) {
        let value = e.target.value;
        setUser({...user, password: value});
    }

    function handlePasswordConfirm(e) {
        let value = e.target.value;
        setUser({...user, password_confirmation: value});
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" >
                <TextField
                required
                fullWidth
                name="name"
                label="name"
                type="text"
                placeholder="enter your name"
                variant="outlined"
                style={{ margin: 8 }}
                helperText="Name is required"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleName}
                /> <br/>

                <TextField
                required
                name="email"
                label="email"
                type="email"
                placeholder="enter your email address"
                variant="outlined"
                onChange={handleEmail}
                /> <br/>

                <TextField
                name="password"
                label="Password"
                type="password"
                // autoComplete="current-password"    set this up later on!!!
                variant="outlined"
                onChange={handlePassword}
                /> <br/>

                <TextField
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                variant="outlined"
                onChange={handlePasswordConfirm}
                /> <br/>

                <Button type = "submit" variant="contained" color="primary">Sign Up</Button>
            </form>
        </div>
    )
}

export default Register;
