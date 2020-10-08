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


function App() {
    return(
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    <Route exact path="/signup">
                        <Register />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path="/logout">
                        <Logout />
                    </Route>
                    <Route exact path="/profile/:id">
                        <Profile />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
