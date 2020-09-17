import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return(
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
