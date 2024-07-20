// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   ReactDOM.render(<App />, rootElement);
// }
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);