import React, { useState } from 'react';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';  // Import the Axios instance

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // State to manage the loading indicator
  const [error, setError] = useState('');  // State to manage error messages
  const navigate = useNavigate();  // Hook to programmatically navigate to other routes

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    console.log('Attempting to login with:', email, password);  // Log input values

    try {
      const response = await axiosInstance.post('/api/users/login', {
        userEmail: email,  // Matching backend field names
        userPassword: password,  // Matching backend field names
      });
  
      console.log('Login successful:', response.data);  // Log the response if successful
  
      // If login is successful, check user role and redirect accordingly
      const { role } = response.data;
      if (role === 'Vendor') {
        navigate('/vendor');  // Redirect to vendor dashboard
      } else if (role === 'Customer') {
        navigate('/customer');  // Redirect to customer dashboard
      } else {
        alert('Invalid role');
      }
    } catch (error) {
      console.error('Login failed:', error);  // Log error if request fails
      setError('Invalid credentials or server error');  // Display error message

      if (error.response) {
        console.error('Response error:', error.response);  // Log server response error
        // If there's a specific error message from the server, show it
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        console.error('Request error:', error.request);  // Log request error if no response
        setError('No response received from the server');
      } else {
        console.error('Request setup error:', error.message);  // Log request setup error
        setError('Error in sending the request');
      }
    } finally {
      setLoading(false);  // End loading
    }
  };
  

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }} // Ensures full height of the viewport
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto"> {/* Ensures the column is centered */}
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>

                {/* Password Input */}
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>

                {/* Error Message */}
                {error && <div className="text-danger mb-3">{error}</div>}

                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3 py-3"
                  disabled={loading}  // Disable button during loading
                >
                  {loading ? 'Logging in...' : 'Login'}  {/* Button text changes during loading */}
                </Button>
              </Form>

              {/* Switch to Register */}
              <p className="text-center mt-3">
                Don't have an account?{' '}
                <Link to="/register" className="p-0 text-decoration-none">
                  Register here
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
