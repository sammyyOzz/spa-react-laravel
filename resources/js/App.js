import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import Register from './components/Register'


function App() {
    return(
        <div>
            <h1>Hello</h1>
            <Register />
        </div>
    )
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
