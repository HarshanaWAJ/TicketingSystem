import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';
import bgImage from '../images/bg.jpg';
import createEvent from '../images/create_event.jpg';
import realTimeAnlitics from '../images/th.jpeg';
import payment from '../images/R.jpeg';

// Import Axios instance and useNavigate for redirection
import axiosInstance from '../axiosInstance'; 
import { data, useNavigate } from 'react-router-dom';

const Home = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);

  const [showLogin, setShowLogin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate(); // Hook for redirection

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Use POST method to send the login data
      const response = await axiosInstance.post('/api/users/login', {
        userEmail: userEmail,
        userPassword: userPassword,
      });
  
      // Check if response contains user data and role
      const { role } = response.data; 
      if (role === 'vendor') {
        navigate('/vendor-dashboard'); 
      } else if (role === 'customer') {
        navigate('/customer-dashboard'); 
      } else {
        alert('Unknown role');
      }
    } catch (error) {
      console.log("Data",data);
      
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };
  

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#007bff' }}>
        <div className="container">
          <a className="navbar-brand" href="#">TicketX</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pricing">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item">
                <Button variant="outline-light" onClick={handleLoginShow}>Login</Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background: `url(${bgImage}) no-repeat center center`,
          backgroundSize: 'cover',
          color: 'black',
          padding: '100px 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h1>Welcome to the Future of Event Ticketing</h1>
          <p>Fast, Easy, Secure – Everything you need to manage and buy event tickets in one place.</p>
          <Button href="#features" variant="primary" size="lg">Explore Features</Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container>
          <h2 className="text-center mb-4">Our Features</h2>
          <Row>
            <Col lg={4} md={6} sm={12} data-aos="fade-up">
              <Card>
                <Card.Img variant="top" src={createEvent} />
                <Card.Body>
                  <Card.Title>Easy Event Creation</Card.Title>
                  <Card.Text>Create and manage your events with ease and start selling tickets instantly.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} sm={12} data-aos="fade-up" data-aos-delay="200">
              <Card>
                <Card.Img variant="top" src={realTimeAnlitics} />
                <Card.Body>
                  <Card.Title>Real-Time Analytics</Card.Title>
                  <Card.Text>Track ticket sales and attendee statistics in real-time for your events.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} sm={12} data-aos="fade-up" data-aos-delay="400">
              <Card>
                <Card.Img variant="top" src={payment} />
                <Card.Body>
                  <Card.Title>Secure Payment Options</Card.Title>
                  <Card.Text>Offer secure and flexible payment methods for your customers.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-5 bg-light">
        <Container className="text-center">
          <h2 className="mb-4">Choose the Plan That Suits You</h2>
          <Row>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Basic Plan</Card.Title>
                  <Card.Text>$19/month</Card.Text>
                  <ul>
                    <li>1 Event</li>
                    <li>Basic Analytics</li>
                    <li>Standard Support</li>
                  </ul>
                  <Button variant="primary">Get Started</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Pro Plan</Card.Title>
                  <Card.Text>$49/month</Card.Text>
                  <ul>
                    <li>Up to 10 Events</li>
                    <li>Advanced Analytics</li>
                    <li>24/7 Support</li>
                  </ul>
                  <Button variant="primary">Get Started</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Enterprise Plan</Card.Title>
                  <Card.Text>$99/month</Card.Text>
                  <ul>
                    <li>Unlimited Events</li>
                    <li>Custom Analytics</li>
                    <li>Dedicated Support</li>
                  </ul>
                  <Button variant="primary">Get Started</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Section */}
      <section id="contact" className="footer" style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'center', padding: '20px 0' }}>
        <p>Contact Us: support@ticketx.com | Follow Us: 
          <a href="#" className="text-white"><FaFacebookF /></a>
          <a href="#" className="text-white"><FaTwitter /></a>
          <a href="#" className="text-white"><FaInstagram /></a>
        </p>
      </section>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login to Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
