import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import './index.css';

// Specific imports to help Vite find the exports
import { ApolloProvider } from '@apollo/client/react/index.js'; 
import { client } from './lib/apollo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CartProvider> {/* Wrap it here */}
        <App />
      </CartProvider>
    </ApolloProvider>
  </React.StrictMode>,
);