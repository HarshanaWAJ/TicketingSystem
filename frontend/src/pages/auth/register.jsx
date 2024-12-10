import React, { useState } from 'react';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');  // To track error messages

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Reset the error message if the form is being submitted again
    setError('');

    // Basic validation for matching passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Additional validation for password length (optional)
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    console.log('Registering with:', name, email, password);

    // Handle registration logic here (e.g., API request)
    // If registration fails, you can set an error message accordingly:
    // setError('Registration failed. Please try again.');
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4">Register</h3>
              <Form onSubmit={handleRegisterSubmit}>
                {/* Name Input */}
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>

                {/* Email Input */}
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
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>

                {/* Confirm Password Input */}
                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>

                {/* Error Message */}
                {error && <div className="text-danger mb-3">{error}</div>}

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100 mt-3 py-3">
                  Register
                </Button>
              </Form>

              {/* Switch to Login */}
              <p className="text-center mt-3">
                Already have an account?{' '}
                <Link to="/login" className="p-0 text-decoration-none">
                  Login here
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
