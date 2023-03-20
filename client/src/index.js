import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { BrowserRouter } from "react-router-dom";
import styles from './index.module.css'

export const INCREMENT_API_PROMISE_LOADING = 250

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

