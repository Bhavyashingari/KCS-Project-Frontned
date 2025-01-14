import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MsalProvider } from '@azure/msal-react';
import msalInstance from './msalconfig';  
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MsalProvider>,
  document.getElementById('root')
);

reportWebVitals();
