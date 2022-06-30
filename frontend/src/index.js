import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/B-NAZANIN.TTF';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);