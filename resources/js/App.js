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


function App() {
    return(
        <div>
            <h1>Hello</h1>
            <Router>
                <Switch>
                    <Route exact path="/signup">
                        <Register />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/home">
                        <Home />
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
