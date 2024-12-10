import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function BuyTickets() {
  const { id } = useParams(); // Get the id from the URL parameters
  const [tickets, setTickets] = useState([]); // State to store ticket data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [cart, setCart] = useState([]); // State to store the items in the cart
  const [showCart, setShowCart] = useState(false); // State to control modal visibility

  // Fetch ticket data by ID using the id from the URL
  const fetchTickets = async () => {
    try {
      const response = await axios.get(`http://localhost:8088/api/tickets/${id}`);
      setTickets(response.data);  // Store the fetched ticket data in state
    } catch (err) {
      setError('Failed to fetch ticket data');  // Handle errors in case of failure
    } finally {
      setLoading(false);  // Stop the loading spinner once data is fetched or an error occurs
    }
  };

  useEffect(() => {
    fetchTickets();  // Call the function to fetch tickets
  }, [id]);  // Dependency array includes 'id', so the effect will run every time the ID changes

  // Handle quantity change for a specific ticket
  const handleQuantityChange = (ticketId, event) => {
    const newQuantity = parseInt(event.target.value);
    setCart(prevCart => {
      // Check if the ticket already exists in the cart
      const existingTicketIndex = prevCart.findIndex(item => item.ticketId === ticketId);
      if (existingTicketIndex !== -1) {
        // Update quantity for the existing ticket
        const updatedCart = [...prevCart];
        updatedCart[existingTicketIndex].quantity = newQuantity;
        return updatedCart;
      } else {
        // If ticket isn't in the cart, add it with the new quantity
        return [...prevCart, { ticketId, quantity: newQuantity }];
      }
    });
  };

  // Handle adding a ticket to the cart
  const handleAddToCart = (ticketId, ticketName) => {
    setCart(prevCart => {
      const existingTicket = prevCart.find(item => item.ticketId === ticketId);
      if (existingTicket) {
        // If ticket already in cart, just return
        return prevCart;
      } else {
        // Add new ticket to the cart with the ticketName and default quantity of 1
        return [...prevCart, { ticketId, ticketName, quantity: 1 }];
      }
    });
  };

  // Handle removing a ticket from the cart
  const handleRemoveFromCart = (ticketId) => {
    setCart(cart.filter(item => item.ticketId !== ticketId)); // Remove ticket from cart
  };

  // Handle purchasing tickets from the cart
  const handleBuyFromCart = async () => {
    try {
      const promises = cart.map(item =>
        axios.post('http://localhost:8088/api/tickets/buy', {
          ticketId: item.ticketId,
          quantity: item.quantity,
        })
      );

      // Wait for all purchases to be completed
      await Promise.all(promises);

      // After purchase, clear the cart and reload ticket data
      alert('Tickets purchased successfully!');
      setCart([]); // Clear the cart after successful purchase
      setShowCart(false); // Close the cart modal
      fetchTickets(); // Re-fetch tickets to update available count
    } catch (err) {
      alert('Error purchasing tickets. Please try again later.');
    }
  };

  // Show loading message or error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render ticket data in table
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h3 className="text-center">Ticket Details</h3>
          {/* Ticket Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Ticket Name</th>
                <th>Total Tickets</th>
                <th>Available Tickets</th>
                <th>Unit Price</th>
                <th>Sold Count</th>
                <th>Release Rate</th>
                <th>Retrieval Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map(ticket => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.ticketName}</td>
                    <td>{ticket.totalTicket}</td>
                    <td>{ticket.availableCount}</td>
                    <td>{ticket.unitPrice}</td>
                    <td>{ticket.soldCount}</td>
                    <td>{ticket.ticketReleaseRate}</td>
                    <td>{ticket.ticketRetrievalRate}</td>
                    <td>
                      {/* Quantity input and Add to Cart button */}
                      <Form.Control
                        type="number"
                        min="1"
                        max={ticket.availableCount}
                        value={
                          cart.find(item => item.ticketId === ticket.id)
                            ? cart.find(item => item.ticketId === ticket.id).quantity
                            : 1
                        }
                        onChange={(e) => handleQuantityChange(ticket.id, e)}
                        className="w-auto ms-2"
                        style={{ width: '80px' }}
                      />
                      <Button
                        variant="info"
                        onClick={() => handleAddToCart(ticket.id, ticket.ticketName)}
                        className="ms-2">
                        Add to Cart
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">No tickets available for this event.</td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Cart Button */}
          <Button variant="primary" onClick={() => setShowCart(true)}>
            View Cart ({cart.length})
          </Button>
        </Col>
      </Row>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={() => setShowCart(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Ticket Name</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.ticketId}>
                    <td>{item.ticketName}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFromCart(item.ticketId)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCart(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleBuyFromCart}>
            Buy Tickets
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default BuyTickets;
