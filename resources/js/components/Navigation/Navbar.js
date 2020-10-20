import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(() => ({
    navStyle: {
        flex:0.65
    }
  }));


const Navbar = () => {
    const classes = useStyles();

    return (
        <AppBar color="primary">
            <Toolbar>
                <Button className={classes.navStyle} color="inherit" component={Link} to="/">SinglePageApp</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/home">Home</Button>
                <Button color="inherit" component={Link} to="/logout">Logout</Button>
                <Button color="inherit" component={Link} to="/profile/1">Profile</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
