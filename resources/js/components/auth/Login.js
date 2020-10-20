import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
        display: 'flex',
        justifyContent: 'center'
      },
    },
    button: {
        width: '46ch',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
        minHeight: 450
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
            <Paper className={classes.paper}>
                <Grid container spacing={10}>
                    <Grid item xs />
                    <Grid item xs>
                        <Typography variant="h4">Login</Typography>
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

                            <Button className={classes.button} fullWidth type="submit" variant="contained" color="primary">Login</Button>
                        </form>
                    </Grid>
                    <Grid item xs />
                </Grid>
            </Paper>
        </div>
    )
}

export default Login;
