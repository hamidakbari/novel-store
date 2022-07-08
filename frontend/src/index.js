import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/B-NAZANIN.TTF';
import './fonts/IranNastaliq.ttf';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Loading from './app/features/books/Loading';
import UserStoreProvider from '../src/app/features/user/userStore';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserStoreProvider>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </PersistGate>
    </Provider>
  </UserStoreProvider>
);
