import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

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
        marginBottom: '10px'
    },
    link: {
        marginLeft: '20px',
        color: 'white',
    }
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
    const [error, setError] = useState([])

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("/api/auth/signup", user)
        .then(() => {
            history.push('/login')
        })
        .catch(errors => {
            if (errors.response.status === 422) {
                alert(errors)
            }
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
        <div className={classes.root}>
            <Grid container>
                <Grid item sm={1} md={3} lg={4} />

                <Grid item xs={12} sm={10} md={6} lg={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">Sign Up!</Typography>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                            required
                            name="name"
                            label="name"
                            type="text"
                            variant="outlined"
                            onChange={handleName}
                            className={classes.input}
                            />

                            <TextField
                            required
                            name="email"
                            label="email"
                            type="email"
                            variant="outlined"
                            onChange={handleEmail}
                            className={classes.input}
                            />

                            <TextField
                            required
                            name="username"
                            label="username"
                            type="text"
                            variant="outlined"
                            onChange={handleUsername}
                            className={classes.input}
                            />

                            <TextField
                            required
                            name="password"
                            label="Password"
                            type="password"
                            // autoComplete="current-password"    set this up later on!!!
                            variant="outlined"
                            onChange={handlePassword}
                            className={classes.input}
                            />

                            <TextField
                            required
                            name="password_confirmation"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            onChange={handlePasswordConfirm}
                            className={classes.input}
                            />

                            <Button fullWidth type="submit" variant="contained" color="primary">
                                Sign Up
                            </Button>
                        </form>
                        <Link to='/login' className={classes.link}>
                            Already have an account?, log in
                        </Link>
                    </Paper>
                </Grid>

                <Grid item sm={1} md={3} lg={4} />
            </Grid>
        </div>
    )
}

export default Register;
