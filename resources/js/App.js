import React from 'react';
import ReactDOM from 'react-dom';
import Register from './components/auth/Register'
import Login from './components/auth/Login'


function App() {
    return(
        <div>
            <h1>Hello</h1>
            <Login />
        </div>
    )
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
