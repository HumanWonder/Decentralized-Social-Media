import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/css/index.css';
import App from './componante/App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './componante/authState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
