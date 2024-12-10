package com.example.backend.CLI;

import com.example.backend.Entities.EventEntity;
import com.example.backend.Entities.TicketEntity;
import com.example.backend.Services.EventService;
import com.example.backend.Services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Scanner;

@Component
public class TicketCLIApplication {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private EventService eventService;

    private static final Scanner scanner = new Scanner(System.in);

    public void run() {
        // Getting ticket details from the user
        System.out.println("Enter ticket name:");
        String ticketName = getValidInput("Ticket name");

        // Getting initial count
        int initCount = getValidIntInput("Enter initial count:");

        // Getting unit price
        double unitPrice = getValidDoubleInput("Enter unit price:");

        // Getting sold count
        int soldCount = getValidIntInput("Enter sold count:");

        // Getting event ID to associate the ticket with
        int eventId = getValidIntInput("Enter the event ID for this ticket:");

        // Fetching the EventEntity by eventId from the database
        Optional<EventEntity> event = eventService.getEventById(eventId);
        if (event == null) {
            System.out.println("Event with ID " + eventId + " does not exist.");
            return; // Exit if the event is not found
        }

        // Getting ticket release rate from the user (percentage)
        int ticketReleaseRate = getValidIntInput("Enter ticket release rate (percentage):");

        // Getting ticket retrieval rate from the user (percentage)
        int ticketRetrievalRate = getValidIntInput("Enter ticket retrieval rate (percentage):");

        // Creating TicketEntity instance and setting values
        TicketEntity ticket = new TicketEntity();
        ticket.setTicketName(ticketName);
        ticket.setTotalTicket(initCount);
        ticket.setAvailableCount(initCount); // Initially available count is set to initCount
        ticket.setUnitPrice(unitPrice);
        ticket.setSoldCount(soldCount);
        ticket.setTicketReleaseRate(ticketReleaseRate); // Setting the ticket release rate
        ticket.setTicketRetrievalRate(ticketRetrievalRate); // Setting the ticket retrieval rate

        // Save ticket
        TicketEntity savedTicket = ticketService.saveTicket(ticket);
        if (savedTicket != null) {
            System.out.println("Ticket saved successfully: " + savedTicket.getTicketName());
        } else {
            System.out.println("Error saving the ticket.");
        }
    }

    // Method to handle user input for valid strings (non-empty)
    private String getValidInput(String prompt) {
        String input;
        while (true) {
            System.out.println(prompt);
            input = scanner.nextLine().trim();
            if (!input.isEmpty()) {
                break; // Valid input
            } else {
                System.out.println("Invalid input. Please enter a valid " + prompt + ".");
            }
        }
        return input;
    }

    // Method to get valid integer input
    private int getValidIntInput(String prompt) {
        int input = -1;
        while (input < 0) {
            System.out.println(prompt);
            try {
                input = Integer.parseInt(scanner.nextLine().trim());
                if (input < 0) {
                    System.out.println("Input must be a positive integer.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid integer.");
            }
        }
        return input;
    }

    // Method to get valid double input (e.g., for price)
    private double getValidDoubleInput(String prompt) {
        double input = -1.0;
        while (input < 0.0) {
            System.out.println(prompt);
            try {
                input = Double.parseDouble(scanner.nextLine().trim());
                if (input < 0.0) {
                    System.out.println("Input must be a positive value.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid decimal number.");
            }
        }
        return input;
    }
}
