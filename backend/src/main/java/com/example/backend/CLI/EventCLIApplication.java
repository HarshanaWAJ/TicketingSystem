package com.example.backend.CLI;

import com.example.backend.Entities.EventEntity;
import com.example.backend.Services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

@Component
public class EventCLIApplication {

    @Autowired
    private EventService eventService;

    private static final Scanner scanner = new Scanner(System.in);

    public void run() {
        // Collect event name
        System.out.println("Enter event name:");
        String eventName = getValidInput("Event name");

        // Collect event venue
        System.out.println("Enter event venue:");
        String eventVenue = getValidInput("Event venue");

        // Collect and validate event date
        Date eventDate = getValidDate("Enter event date (yyyy-MM-dd):");

        // Collect and validate event start time
        String startTime = getValidTime("Enter event start time (HH:mm):");

        // Collect and validate event end time
        String endTime = getValidTime("Enter event end time (HH:mm):");

        // Create event entity
        EventEntity event = new EventEntity();
        event.setEventName(eventName);
        event.setEventVenue(eventVenue);
        event.setEventDate(eventDate);
        event.setStartTime(startTime);
        event.setEndTime(endTime);

        // Save the event using the EventService
        EventEntity savedEvent = eventService.saveEvent(event);
        if (savedEvent != null) {
            System.out.println("Event saved successfully: " + savedEvent.getEventName());
        } else {
            System.out.println("Error saving the event.");
        }
    }

    // Method to handle user input for a valid string
    private String getValidInput(String prompt) {
        String input;
        while (true) {
            System.out.println(prompt + ":");
            input = scanner.nextLine().trim();
            if (!input.isEmpty()) {
                break; // Valid input
            } else {
                System.out.println("Invalid input. Please enter a valid " + prompt + ".");
            }
        }
        return input;
    }

    // Method to get and validate a date input
    private Date getValidDate(String prompt) {
        Date date = null;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        while (date == null) {
            System.out.println(prompt);
            String dateInput = scanner.nextLine().trim();
            try {
                date = dateFormat.parse(dateInput);
            } catch (ParseException e) {
                System.out.println("Invalid date format. Please use yyyy-MM-dd.");
            }
        }
        return date;
    }

    // Method to handle user input for a valid time in HH:mm format
    public String getValidTime(String prompt) {
        String time = null;
        while (time == null) {
            System.out.println(prompt);
            String timeInput = scanner.nextLine().trim();
            System.out.println("Input: '" + timeInput + "'"); // Debugging line

            // Check if time matches HH:mm format
            if (timeInput.matches("([01]\\d|2[0-3]):([0-5]\\d)")) {
                time = timeInput;
            } else {
                System.out.println("Invalid time format. Please use HH:mm (24-hour format).");
            }
        }
        return time;
    }
}
