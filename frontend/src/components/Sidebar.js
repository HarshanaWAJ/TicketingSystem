import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';  // Custom CSS for styling and animations

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="text-center text-white mb-4">Dashboard</h3>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/" className="sidebar-link">Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/tickets/1" className="sidebar-link">Tickets</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/login" className="sidebar-link">Login</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/register" className="sidebar-link">Register</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/vendor" className="sidebar-link">Vendor Dashboard</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/customer" className="sidebar-link">Customer Dashboard</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/login" className="sidebar-link">Logout</Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
