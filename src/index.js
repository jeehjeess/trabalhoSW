import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-d600gry0by2gvod0.us.auth0.com'
      clientId='VNpaGzAsKj9Z9kUC43k65wayiVmV7NwR'
      redirectUri={window.location.origin}
      audience='identificador unico da api'
      scope='openid profile email'
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

