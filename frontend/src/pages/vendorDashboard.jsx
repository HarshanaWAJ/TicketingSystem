import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import { Card, Table, Container, Spinner, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Use useNavigate from react-router-dom

function VendorDashboard() {
  const [events, setEvents] = useState([]);  // State to store events
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState(null);  // State to handle errors
  const [showAddModal, setShowAddModal] = useState(false);  // State to show/hide Add Event modal
  const [newEvent, setNewEvent] = useState({ eventName: '', eventVenue: '', eventDate: '', startTime: '', endTime: '' }); // State for new event
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event for update
  const navigate = useNavigate();  // Use useNavigate hook

  // Fetch event data from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8088/api/events/get-all'); // Update with the correct backend URL
        setEvents(response.data);  // Store the fetched event data in the state
      } catch (err) {
        setError('Failed to fetch events');  // Set error message if request fails
      } finally {
        setLoading(false);  // Set loading to false once data is fetched or error occurs
      }
    };

    fetchEvents();  // Call the fetch function
  }, []);  // Empty dependency array to run only once on component mount

  // Format the date to a more readable format (optional)
  const formatDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString();  // Formats the date as mm/dd/yyyy
  };

  // Handle adding a new event
  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:8088/api/events/create-event', newEvent);
      setEvents([...events, response.data]);  // Add the new event to the state
      setNewEvent({ eventName: '', eventVenue: '', eventDate: '', startTime: '', endTime: '' });  // Clear form after adding event
      setShowAddModal(false);  // Close the modal
    } catch (err) {
      console.error('Error adding event', err);
      setError('Failed to add event');
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8088/api/events/delete/${eventId}`); // Update with the correct backend URL
      setEvents(events.filter(event => event.id !== eventId));  // Remove the deleted event from the state
    } catch (err) {
      console.error('Error deleting event', err);
      setError('Failed to delete event');
    }
  };

  // Handle updating an event
  const handleUpdateEvent = async () => {
    try {
      const response = await axios.put(`http://localhost:8088/api/events/update/${selectedEvent.id}`, selectedEvent); // Update with the correct backend URL
      setEvents(events.map(event => event.id === selectedEvent.id ? response.data : event)); // Update the event in the state
      setSelectedEvent(null);  // Clear selected event after update
    } catch (err) {
      console.error('Error updating event', err);
      setError('Failed to update event');
    }
  };

    // Handle view Tickets
    const handleViewTicket = (eventId) => {
        // Navigate to /tickets route with eventId as a parameter
        navigate(`/tickets/${eventId}`);
      };
      
  // Handle opening the Add Event modal
  const handleShowAddModal = () => setShowAddModal(true);

  // Handle closing the Add Event modal
  const handleCloseAddModal = () => setShowAddModal(false);

  // Handle opening the Update Event modal
  const handleShowUpdateModal = (event) => setSelectedEvent(event);

  // Handle closing the Update Event modal
  const handleCloseUpdateModal = () => setSelectedEvent(null);

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />  {/* Display loading spinner */}
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center text-danger">{error}</div>  {/* Display error message */}
      </Container>
    );
  }

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow-lg p-4 w-75 rounded-lg">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Event Details
            <Button variant="success" className="ml-auto d-block" onClick={handleShowAddModal}>Add Event</Button> {/* Right-aligned button */}
          </Card.Title>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th>Event Name</th>
                <th>Event Venue</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.eventName}</td>
                  <td>{event.eventVenue}</td>
                  <td>{formatDate(event.eventDate)}</td>
                  <td>{event.startTime}</td>
                  <td>{event.endTime}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleShowUpdateModal(event)} className="mb-2 ms-2">
                      Update
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteEvent(event.id)} className="mb-2 ms-2">
                      Delete
                    </Button>
                    <Button variant="info" onClick={() => handleViewTicket(event.id)} className="mb-2 ms-2">
                      View Tickets
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Event Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter event name" 
                value={newEvent.eventName} 
                onChange={(e) => setNewEvent({...newEvent, eventName: e.target.value})} 
              />
            </Form.Group>
            <Form.Group controlId="eventVenue">
              <Form.Label>Event Venue</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter event venue" 
                value={newEvent.eventVenue} 
                onChange={(e) => setNewEvent({...newEvent, eventVenue: e.target.value})} 
              />
            </Form.Group>
            <Form.Group controlId="eventDate">
              <Form.Label>Event Date</Form.Label>
              <Form.Control 
                type="date" 
                value={newEvent.eventDate} 
                onChange={(e) => setNewEvent({...newEvent, eventDate: e.target.value})} 
              />
            </Form.Group>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control 
                type="time" 
                value={newEvent.startTime} 
                onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})} 
              />
            </Form.Group>
            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control 
                type="time" 
                value={newEvent.endTime} 
                onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Event Modal */}
      {selectedEvent && (
        <Modal show={selectedEvent !== null} onHide={handleCloseUpdateModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="updateEventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter event name" 
                  value={selectedEvent.eventName} 
                  onChange={(e) => setSelectedEvent({...selectedEvent, eventName: e.target.value})} 
                />
              </Form.Group>
              <Form.Group controlId="updateEventVenue">
                <Form.Label>Event Venue</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter event venue" 
                  value={selectedEvent.eventVenue} 
                  onChange={(e) => setSelectedEvent({...selectedEvent, eventVenue: e.target.value})} 
                />
              </Form.Group>
              <Form.Group controlId="updateEventDate">
                <Form.Label>Event Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={selectedEvent.eventDate} 
                  onChange={(e) => setSelectedEvent({...selectedEvent, eventDate: e.target.value})} 
                />
              </Form.Group>
              <Form.Group controlId="updateStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control 
                  type="time" 
                  value={selectedEvent.startTime} 
                  onChange={(e) => setSelectedEvent({...selectedEvent, startTime: e.target.value})} 
                />
              </Form.Group>
              <Form.Group controlId="updateEndTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control 
                  type="time" 
                  value={selectedEvent.endTime} 
                  onChange={(e) => setSelectedEvent({...selectedEvent, endTime: e.target.value})} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateEvent}>
              Update Event
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default VendorDashboard;
