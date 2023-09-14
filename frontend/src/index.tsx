import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


/* creating root element using `ReactDOM.createRoot()` and rendering the `<App />` component inside it. 
Root element is obtained by calling `document.getElementById('root')`, finding HTML element with the id "root". 
`ReactDOM.createRoot()` function is used to create a root for the React tree. 
`root.render()` method is then called to render the `<App />` component inside the root element. 
The `<React.StrictMode>` component is used to enable strict mode, which performs additional checks 
and warnings for potential issues in the application. */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
