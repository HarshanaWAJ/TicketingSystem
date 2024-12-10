import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Table, Container, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CustomerDashboard() {
  const [events, setEvents] = useState([]);  // State to store events
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState(null);  // State to handle errors
  const navigate = useNavigate();  // Use useNavigate hook

  // Fetch event data from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8088/api/events/get-all'); // Backend API to fetch events
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

  // Handle view Tickets
  const handleViewTicket = (eventId) => {
    // Navigate to /tickets route with eventId as a parameter
    navigate(`/buy-tickets/${eventId}`);
  };

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
    </Container>
  );
}

export default CustomerDashboard;
