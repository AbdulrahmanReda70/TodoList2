import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContext from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContext>
    <App />
  </UserContext>
);

