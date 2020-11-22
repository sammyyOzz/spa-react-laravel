import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { useStateValue } from '../../StateProvider'


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
    const [ { user, userId }, dispatch ] = useStateValue();

    return (
        <div className={classes.root}>
            <AppBar color="primary">
                <Toolbar>
                    <Container maxWidth="md">
                        <div className={classes.navContent}>
                            <div>
                                <Button color="inherit" component={Link} to="/">SinglePageApp</Button>
                            </div>
                            <div>
                                <Button
                                    className={ user && classes.hideButton}
                                    color="inherit" component={Link}
                                    to="/signup">
                                        Signup
                                </Button>
                                <Button
                                    className={ user && classes.hideButton}
                                    color="inherit" component={Link}
                                    to="/login">
                                        Login
                                </Button>
                                <Button
                                    className={ ! user && classes.hideButton}
                                    color="inherit" component={Link}
                                    to="/home">
                                        Home
                                </Button>
                                <Button
                                    className={ ! user && classes.hideButton}
                                    color="inherit" component={Link}
                                    to={`/profile/${userId}`}>
                                        Profile
                                </Button>
                                <Button
                                    className={ ! user && classes.hideButton}
                                    color="inherit" component={Link}
                                    to="/logout">
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
