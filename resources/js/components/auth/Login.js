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
        width: '40ch',
        display: 'flex',
        justifyContent: 'center'
      },
    },
  }));

function Login() {
    const history = useHistory();
    const classes = useStyles();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const header = { headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }}

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("/api/auth/login", user, header)
        .then(res => {
            localStorage.setItem('usertoken', res.data.access_token)
            history.push('/home');
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleEmail = e => {
        let value = e.target.value;
        setUser({...user, email: value});
    }

    function handlePassword(e) {
        let value = e.target.value;
        setUser({...user, password: value});
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" >
                <TextField
                required
                label="email"
                type="email"
                placeholder="enter your email address"
                variant="outlined"
                onChange={handleEmail}
                /> <br/>

                <TextField
                label="Password"
                type="password"
                variant="outlined"
                onChange={handlePassword}
                /> <br/>

                <Button type = "submit" variant="contained" color="primary">Login</Button>
            </form>
        </div>
    )
}

export default Login;
