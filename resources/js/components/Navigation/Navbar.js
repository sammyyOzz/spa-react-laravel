import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { useStateValue } from '../../StateProvider'
import axios from 'axios'


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    navContent: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30
    },
    hideButton: {
        display: 'none'
    }

  }));


const Navbar = () => {
    const classes = useStyles();
    const [ { user }, dispatch ] = useStateValue();
    const userId = localStorage.getItem('userId')
    const history = useHistory()

    const logout = () => {
        if(localStorage.usertoken) {
            axios.get('http://127.0.0.1:8000/api/auth/logout', {
                headers: { 'Authorization': `Bearer ${localStorage.usertoken}` }
            })
            .then(() => {
                dispatch({
                    type: 'SET_USER',
                    user: false
                })
                dispatch({
                    type: 'SET_USER_ID',
                    userId: null
                })
                localStorage.removeItem('usertoken')
                history.push('/')
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className={classes.root}>
            <AppBar color="primary">
                <Toolbar>
                    <Container maxWidth="md">
                        <div className={classes.navContent}>
                            <div>
                                <Button color="inherit" component={Link} to="/">SinglePageApp</Button>
                                <Link to="/profile/1"><span style={{paddingLeft: 30}}>1</span></Link>
                                <Link to="/profile/2"><span style={{paddingLeft: 30}}>2</span></Link>
                                <Link to="/profile/3"><span style={{paddingLeft: 30}}>3</span></Link>
                            </div>
                            <div>
                                <Button
                                    className={ user ? classes.hideButton : ""}
                                    color="inherit" component={Link}
                                    to="/signup">
                                        Signup
                                </Button>
                                <Button
                                    className={ user ? classes.hideButton : ""}
                                    color="inherit" component={Link}
                                    to="/login">
                                        Login
                                </Button>
                                <Button
                                    className={ ! user ? classes.hideButton : ""}
                                    color="inherit" component={Link}
                                    to="/home">
                                        Home
                                </Button>
                                <Button
                                    className={ ! user ? classes.hideButton : ""}
                                    color="inherit" component={Link}
                                    to={`/profile/${userId}`}>
                                        Profile
                                </Button>
                                <Button
                                    className={ ! user ? classes.hideButton : ""}
                                    color="inherit"
                                    onClick={logout}>
                                        Logout
                                </Button>
                            </div>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
