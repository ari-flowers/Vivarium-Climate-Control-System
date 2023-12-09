import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider as EnclosuresProvider } from './context/enclosures'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EnclosuresProvider>
      <App />
    </EnclosuresProvider>
  </React.StrictMode>
);

