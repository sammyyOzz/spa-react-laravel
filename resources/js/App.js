import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import
    {   BrowserRouter as Router,
        Switch,
        Route
    } from 'react-router-dom';
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/profile/Home';
import Navbar from './components/Navigation/Navbar';
import LandingPage from './components/Landing/LandingPage';
import Profile from './components/profile/Profile';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'
import CreatePost from './components/post/CreatePost';
import { StateProvider, useStateValue } from './StateProvider';
import reducer, { initialState } from './reducer';
import Chat from './components/chat/Chat';
import { headers } from './components/Utilities/constants';
import Axios from 'axios';
import Comment from './components/post/Comment';


function App() {
    const [ { }, dispatch ] = useStateValue();
    const url = "http://127.0.0.1:8000/api/auth/user"

    useEffect(() => {
        const loadUserState = () => {
            if (localStorage.usertoken) {
                dispatch({
                    type: 'SET_USER',
                    user: true
                })
            }
        }

        loadUserState();
    }, [])

    useEffect(() => {
        const dispatchUserData = () => {
            Axios.get(url, headers)
                .then(res => {
                    dispatch({
                        type: 'SET_USER_DATA',
                        userData: res.data.data
                    })
                })
                .catch(err => console.log(err))
        }

        dispatchUserData()
    }, [])

    return(
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/signup" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/profile/:id" component={Profile} />
                        <Route exact path="/post" component={CreatePost} />
                        <Route exact path="/chat" component={Chat} />
                        <Route exact path="/post/:id" component={Comment} />
                    </Switch>
            </Router>
        </ThemeProvider>
    )
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>,
        document.getElementById('root'));
}
