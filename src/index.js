import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import 'animate.css';
import ReactModal from 'react-modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactModal.setAppElement(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);


