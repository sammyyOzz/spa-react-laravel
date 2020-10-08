import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function Register() {
    const history = useHistory()
    const classes = useStyles();
    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("/api/auth/signup", user)
        .then(() => {
            history.push('/login')
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

    function handleUsername(e) {
        let value = e.target.value;
        setUser({...user, username: value});
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
                variant="outlined"
                style={{ margin: 8 }}
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
                variant="outlined"
                onChange={handleEmail}
                /> <br/>

                <TextField
                required
                name="username"
                label="username"
                type="text"
                variant="outlined"
                onChange={handleUsername}
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
