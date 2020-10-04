import React from 'react'
    // ListItem,
    // IconButton,
    // ListItemText,
    // Avatar,
    // Divider,
    // List,
    // Typography,
    // Box
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// import {
//     ArrowBack,
//     AssignmentInd,
//     Home,
//     Apps,
//     ContactMail
// } from "@material-ui/icons"
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">SinglePageApp</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/home">Home</Button>
                    <Button color="inherit" component={Link} to="/logout">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
