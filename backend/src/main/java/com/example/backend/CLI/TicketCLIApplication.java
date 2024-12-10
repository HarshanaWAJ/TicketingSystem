package com.example.backend.CLI;

import com.example.backend.Entities.TicketEntity;
import com.example.backend.Services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Scanner;

@Component
public class TicketCLIApplication {

    @Autowired
    private TicketService ticketService;

    public void run() {
        Scanner scanner = new Scanner(System.in);

        // Getting ticket details from the user
        System.out.println("Enter ticket name:");
        String ticketName = scanner.nextLine();

        System.out.println("Enter initial count:");
        int initCount = scanner.nextInt();
        scanner.nextLine(); // To consume the newline character after integer input

        System.out.println("Enter unit price:");
        double unitPrice = scanner.nextDouble();
        scanner.nextLine(); // To consume the newline character after double input

        System.out.println("Enter sold count:");
        int soldCount = scanner.nextInt();
        scanner.nextLine(); // To consume the newline character after integer input

        // Ask the user for the event ID to associate the ticket with
        System.out.println("Enter the event ID for this ticket:");
        int eventId = scanner.nextInt();
        scanner.nextLine(); // To consume the newline character after integer input

        // Creating TicketEntity instance and setting values
        TicketEntity ticket = new TicketEntity();
        ticket.setTicketName(ticketName);
        ticket.setTotalTicket(initCount);
        ticket.setAvailableCount(initCount); // Initially available count is set to initCount
        ticket.setUnitPrice(unitPrice);
        ticket.setSoldCount(soldCount);

        // Here you would typically fetch the EventEntity from the DB using eventId (for simplicity, assuming it exists)
        // You might need to call a service or repository method to get EventEntity by ID
        // Example:
        // EventEntity event = eventService.getEventById(eventId);
        // ticket.setEvent(event);

        // Save ticket
        TicketEntity savedTicket = ticketService.saveTicket(ticket);
        if (savedTicket != null) {
            System.out.println("Ticket saved successfully: " + savedTicket.getTicketName());
        } else {
            System.out.println("Error saving the ticket.");
        }
    }
}
