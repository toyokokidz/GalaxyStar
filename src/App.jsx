import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Navigation from './components/Navigation/Navigation';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navigation />
          <AppRoutes />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App; 