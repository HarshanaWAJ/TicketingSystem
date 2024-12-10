import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Container, Spinner, Alert, Button, Form, Modal } from 'react-bootstrap';

const Tickets = () => {
  const { id } = useParams();  // Get the event ID from the URL using useParams hook
  const [tickets, setTickets] = useState([]);  // State to store ticket data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [newTicket, setNewTicket] = useState({
    ticketName: '',
    totalTicket: '',
    availableCount: '',
    unitPrice: '',
    soldCount: '',
    ticketReleaseRate: '',
    ticketRetrievalRate: '',
  });  // State to store new ticket form data
  const [formError, setFormError] = useState(''); // Form error state
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isUpdate, setIsUpdate] = useState(false);  // Flag to determine if we're adding or updating a ticket
  const [currentTicketId, setCurrentTicketId] = useState(null);  // Store the ID of the ticket being edited

  // Fetch ticket data when the component is mounted or when the ID changes
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // API call to fetch tickets for the event ID
        const response = await axios.get(`http://localhost:8088/api/tickets/${id}`);
        setTickets(response.data);  // Store the fetched ticket data in state
      } catch (err) {
        setError('Failed to fetch ticket data');  // Handle errors in case of failure
      } finally {
        setLoading(false);  // Stop the loading spinner once data is fetched or an error occurs
      }
    };

    fetchTickets();  // Call the function to fetch tickets
  }, [id]);  // Dependency array includes 'id', so the effect will run every time the ID changes

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit the form to add or update a ticket
const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation for empty fields
  if (!newTicket.ticketName || !newTicket.totalTicket || !newTicket.unitPrice) {
    setFormError('Please fill in all the required fields.');
    return;
  }

  // If it's a new ticket, set availableCount to totalTicket and soldCount to 0
  if (!isUpdate) {
    setNewTicket((prevState) => ({
      ...prevState,
      availableCount: prevState.totalTicket, // Set availableCount to totalTicket
      soldCount: 0, // Set soldCount to 0
    }));
  }

  try {
    if (isUpdate) {
      // API call to update the ticket
      await axios.put(`http://localhost:8088/api/tickets/update/${currentTicketId}`, {
        ...newTicket,
        event: {id: id},  // Add eventId to the ticket data
      });
    } else {
      // API call to create a new ticket
      await axios.post('http://localhost:8088/api/tickets/create-ticket', {
        ...newTicket,
        event: {id: id},  // Add eventId to the ticket data
      });
    }

    // Reset form and fetch the new ticket list
    setNewTicket({
      ticketName: '',
      totalTicket: '',
      availableCount: '',
      unitPrice: '',
      soldCount: '',
      ticketReleaseRate: '',
      ticketRetrievalRate: '',
    });
    setFormError('');  // Clear any previous form errors

    // Fetch updated ticket data
    const response = await axios.get(`http://localhost:8088/api/tickets/${id}`);
    setTickets(response.data);

    // Close the modal after submitting
    setShowModal(false);
    setIsUpdate(false);  // Reset to add new ticket after submission
    setCurrentTicketId(null);
  } catch (err) {
    setFormError('Failed to add or update ticket');
  }
};

  

  // Show modal for creating or updating ticket
  const handleShowModal = (ticket = null) => {
    if (ticket) {
      setNewTicket({
        ticketName: ticket.ticketName,
        totalTicket: ticket.totalTicket,
        availableCount: ticket.availableCount,
        unitPrice: ticket.unitPrice,
        soldCount: ticket.soldCount,
        ticketReleaseRate: ticket.ticketReleaseRate,
        ticketRetrievalRate: ticket.ticketRetrievalRate,
      });
      setCurrentTicketId(ticket.id);  // Set the current ticket ID for updating
      setIsUpdate(true);  // Set the flag to indicate update
    } else {
      setIsUpdate(false);  // Set the flag to indicate adding new ticket
    }
    setShowModal(true);  // Show the modal
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setIsUpdate(false);  // Reset the update flag
    setCurrentTicketId(null);  // Reset the current ticket ID
  };

  // Delete ticket
  const handleDelete = async (ticketId) => {
    try {
      console.log(`Deleting ticket with ID: ${ticketId}`); // Debugging line
      const response = await axios.delete(`http://localhost:8088/api/tickets/${ticketId}`);
      console.log('Delete Response:', response);  // Debugging line
      
      // Fetch updated ticket data after deletion
      const updatedTickets = await axios.get(`http://localhost:8088/api/tickets/${id}`);
      setTickets(updatedTickets.data);
    } catch (err) {
      console.error('Error deleting ticket:', err);  // Log the error in the console
      setError('Failed to delete ticket');
    }
  };
  
  
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h3 className="text-center my-4">Tickets for Event {id}</h3>

      {/* Button to open the modal */}
      <Button variant="primary" onClick={() => handleShowModal()} className="mb-3">
        Add New Ticket
      </Button>

      {/* Ticket Add/Update Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isUpdate ? 'Update Ticket' : 'Add New Ticket'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {formError && <Alert variant="danger">{formError}</Alert>}
            <Form.Group controlId="ticketName">
              <Form.Label>Ticket Name</Form.Label>
              <Form.Control
                type="text"
                name="ticketName"
                value={newTicket.ticketName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="totalTicket">
              <Form.Label>Total Tickets</Form.Label>
              <Form.Control
                type="number"
                name="totalTicket"
                value={newTicket.totalTicket}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="availableCount">
              <Form.Label>Available Tickets</Form.Label>
              <Form.Control
                type="number"
                name="availableCount"
                value={newTicket.availableCount}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="unitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                name="unitPrice"
                value={newTicket.unitPrice}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="soldCount">
              <Form.Label>Sold Count</Form.Label>
              <Form.Control
                type="number"
                name="soldCount"
                value={newTicket.soldCount}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="ticketReleaseRate">
              <Form.Label>Release Rate</Form.Label>
              <Form.Control
                type="number"
                name="ticketReleaseRate"
                value={newTicket.ticketReleaseRate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="ticketRetrievalRate">
              <Form.Label>Retrieval Rate</Form.Label>
              <Form.Control
                type="number"
                name="ticketRetrievalRate"
                value={newTicket.ticketRetrievalRate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              {isUpdate ? 'Update Ticket' : 'Add Ticket'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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
                  {/* Update button */}
                  <Button variant="warning" onClick={() => handleShowModal(ticket)} className="mr-2  ms-2">
                    Edit
                  </Button>
                  {/* Delete button */}
                  <Button variant="danger" onClick={() => handleDelete(ticket.id)} className=' ms-2'>
                    Delete
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
    </Container>
  );
};

export default Tickets;
