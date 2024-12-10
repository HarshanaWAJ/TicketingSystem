import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Vendor from './pages/vendorDashboard';
import Customer from './pages/customerDashboard';
import Tickets from './pages/tickets';
import Sidebar from './components/Sidebar';  // Import Sidebar component
import BuyTickets from './pages/buyTickets';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <div style={{ width: '250px' }}>
          <Sidebar />
        </div>

        {/* Main content area */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/tickets/:id" element={<Tickets />} />
            <Route path="/buy-tickets/:id" element={<BuyTickets/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
