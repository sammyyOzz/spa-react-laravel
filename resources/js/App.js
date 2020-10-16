import React from 'react';
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
import Logout from './components/auth/Logout';
import Profile from './components/profile/Profile';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#115293',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#dc004e',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    }
})


function App() {
    return(
        <MuiThemeProvider theme={theme}>
            <div>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={LandingPage} />
                            <Route exact path="/signup" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/logout" component={Logout} />
                            <Route exact path="/profile/:id" component={Profile} />
                        </Switch>
                    </div>
                </Router>
            </div>
        </MuiThemeProvider>
    )
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
