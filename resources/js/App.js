import React, { useEffect } from 'react';
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


function App() {
    const [ {}, dispatch ] = useStateValue();

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

    return(
        <ThemeProvider theme={theme}>
            <div>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={LandingPage} />
                            <Route exact path="/signup" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/profile/:id" component={Profile} />
                            <Route exact path="/post" component={CreatePost} />
                        </Switch>
                    </div>
                </Router>
            </div>
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
