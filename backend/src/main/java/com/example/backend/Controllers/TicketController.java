package com.example.backend.Controllers;

import com.example.backend.Entities.TicketEntity;
import com.example.backend.Services.TicketService;
import com.example.backend.dto.TicketPurchaseRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;


    @PostMapping("/create-ticket")
    public ResponseEntity<TicketEntity> createEvent(@RequestBody TicketEntity ticket) {
        TicketEntity saveTicket = ticketService.saveTicket(ticket);
        if (saveTicket != null) {
            return new ResponseEntity<>(saveTicket, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<TicketEntity>> getAllEvents() {
        List<TicketEntity> tickets = ticketService.getAllTickets();
        if (tickets != null && !tickets.isEmpty()) {
            return new ResponseEntity<>(tickets, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/get-event/{id}")
    public ResponseEntity<TicketEntity> getEventById(@PathVariable int id) {
        Optional<TicketEntity> ticket = ticketService.getTicketById(id);
        if (ticket.isPresent()) {
            return new ResponseEntity<>(ticket.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TicketEntity> updateEvent(@PathVariable int id, @RequestBody TicketEntity ticketEntity) {
        TicketEntity updatedTicket = ticketService.updateTicket(id, ticketEntity);
        if (updatedTicket != null) {
            return new ResponseEntity<>(updatedTicket, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable int id) {
        boolean isDeleted = ticketService.deleteTicket(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/buy")
    public ResponseEntity<String> buyTickets(@RequestBody TicketPurchaseRequest request) {
        int ticketId = request.getTicketId();
        int quantity = request.getQuantity();

        // Your logic for buying tickets...
        String response = ticketService.buyTickets(ticketId, quantity);
        if (response.equals("Tickets purchased successfully!")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }


    // Endpoint to fetch tickets by event ID
    @GetMapping("/{eventId}")
    public ResponseEntity<List<TicketEntity>> getTicketsByEventId(@PathVariable("eventId") int eventId) {
        List<TicketEntity> tickets = ticketService.getTicketsByEventId(eventId);
        return ResponseEntity.ok(tickets);  // Return the list of tickets with a 200 OK status
    }
}
