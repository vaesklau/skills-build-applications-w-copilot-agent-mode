import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const protocol = codespaceName ? 'https' : 'http';
const host = codespaceName
  ? `${codespaceName}-8000.app.github.dev`
  : 'localhost:8000';
const apiBaseUrl = `${protocol}://${host}/api`;

console.log('[App] REST API base URL:', apiBaseUrl);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
