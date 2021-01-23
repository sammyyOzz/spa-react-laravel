import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStateValue } from '../../StateProvider';
import Footer from '../Landing/Footer';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        marginBottom: '25px'
    },
    paper: {
        width: '100%',
        paddingTop: '40px',
        paddingBottom: '60px'
    },
    form: {
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '10px'
    },
    input: {
        width: '100%',
        marginBottom: '25px'
    },
    signup: {
        marginLeft: '20px',
        color: 'white',
    },
    error: {
        marginLeft: '30px',
        color: 'red'
    }
  }));

function Login() {
    const history = useHistory();
    const classes = useStyles();
    const [ {}, dispatch ] = useStateValue();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState("")

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
            dispatch({
                type: 'SET_USER',
                user: true
            })
        })
        .catch(error => {
            if (error.response.status === 401) {
                setError("Wrong email or password!")
            }
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
        <div className={classes.root}>
            <Grid container>
                <Grid item sm={1} md={3} lg={4} />

                <Grid item xs={12} sm={10} md={6} lg={4}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.title} variant="h4">Login</Typography>
                            <p className={classes.error}>{error}</p>
                            <form onSubmit={handleSubmit} className={classes.form} >
                                <TextField
                                required
                                label="email"
                                type="email"
                                placeholder="enter your email address"
                                variant="outlined"
                                onChange={handleEmail}
                                className={classes.input}
                                />

                                <TextField
                                required
                                label="Password"
                                type="password"
                                variant="outlined"
                                onChange={handlePassword}
                                className={classes.input}
                                />

                                <Button fullWidth type="submit" variant="contained" color="primary">
                                    Login
                                </Button>
                            </form>
                            <Link to='/signup' className={classes.signup}>
                                Sign Up!
                            </Link>
                        </Paper>
                </Grid>

                <Grid item sm={1} md={3} lg={4} />
            </Grid>
            {/* <Footer /> */}
        </div>
    )
}

export default Login;
