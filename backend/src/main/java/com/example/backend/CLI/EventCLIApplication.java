package com.example.backend.CLI;

import com.example.backend.Entities.EventEntity;
import com.example.backend.Services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

@Component
public class EventCLIApplication {

    @Autowired
    private EventService eventService;

    public void run() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter event name:");
        String eventName = scanner.nextLine();

        System.out.println("Enter event venue:");
        String eventVenue = scanner.nextLine();

        System.out.println("Enter event date (yyyy-MM-dd):");
        String eventDateInput = scanner.nextLine();

        System.out.println("Enter event start time (HH:mm):");
        String startTime = scanner.nextLine();

        System.out.println("Enter event end time (HH:mm):");
        String endTime = scanner.nextLine();

        // Parse eventDate from String to Date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date eventDate = null;
        try {
            eventDate = dateFormat.parse(eventDateInput);
        } catch (Exception e) {
            System.out.println("Invalid date format. Please use yyyy-MM-dd.");
            return; // Exit the method if the date is invalid
        }

        // Check if the date was parsed successfully
        if (eventDate == null) {
            System.out.println("Error parsing the date.");
            return;
        }

        // Create a new EventEntity object
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
}
