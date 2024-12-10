package com.example.backend.Services;

import com.example.backend.Entities.TicketEntity;
import com.example.backend.Repositories.TicketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private Long rate = 10L;

    @Autowired
    private TicketRepo ticketRepo;

    public TicketEntity saveTicket(TicketEntity ticket) {
        try {
            // Introduce a delay of 10ms to simulate some time for the operation
            Thread.sleep(rate);

            synchronized (this) {
                // Ensure availableCount is properly set
                ticket.setAvailableCount(ticket.getTotalTicket());
                // Save the ticket to the repository
                return ticketRepo.save(ticket);
            }
        } catch (InterruptedException e) {
            // Handle the interruption exception
            Thread.currentThread().interrupt(); // Set the interrupt flag again
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<TicketEntity> getAllTickets() {
        try {
            return ticketRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Optional<TicketEntity> getTicketById(int id) {
        try {
            return ticketRepo.findById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean deleteTicket(int id) {
        try {
            ticketRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public TicketEntity updateTicket(int id, TicketEntity ticketEntity) {
        if (ticketRepo.existsById(id)) {
            ticketEntity.setId(id);
            return ticketRepo.save(ticketEntity);
        }
        return null;  // Or throw an exception if not found
    }

    @Transactional
    public synchronized String buyTickets(int ticketId, int quantity) {
        if (quantity <= 0) {
            return "Invalid quantity! Quantity must be greater than 0.";
        }

        try {
            // Introduce a delay of 10ms to simulate some time for the operation
            Thread.sleep(rate);  // You might want to adjust or remove this in production

            // Log the ticketId and quantity for debugging
            System.out.println("Received ticketId: " + ticketId + ", quantity: " + quantity);

            // Retrieve the ticket from the database
            TicketEntity ticket = ticketRepo.findById(ticketId).orElse(null);

            if (ticket == null) {
                return "Ticket not found!";
            }

            // Log the ticket data for debugging
            System.out.println("Ticket found: " + ticket);

            // Check if enough tickets are available
            if (ticket.getAvailableCount() < quantity) {
                return "Not enough tickets available!";
            }

            // Update the available count and sold count
            ticket.setAvailableCount(ticket.getAvailableCount() - quantity);
            ticket.setSoldCount(ticket.getSoldCount() + quantity);

            // Save the updated ticket entity back to the database
            ticketRepo.save(ticket);

            return "Tickets purchased successfully!";
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            e.printStackTrace();
            return "An error occurred while processing your request.";
        } catch (Exception e) {
            // Handle any other exceptions
            e.printStackTrace();
            return "An error occurred while processing your request.";
        }
    }

    // Method to fetch tickets by event ID
    public List<TicketEntity> getTicketsByEventId(int eventId) {
        return ticketRepo.findTicketByEventId(eventId);  // Call the repository method
    }
}
