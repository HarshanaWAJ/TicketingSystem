package com.example.backend.Controllers;

import com.example.backend.Entities.EventEntity;
import com.example.backend.Services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    // Endpoint to create a new event
    @PostMapping("/create-event")
    public ResponseEntity<EventEntity> createEvent(@RequestBody EventEntity eventEntity) {
        EventEntity savedEvent = eventService.saveEvent(eventEntity);
        if (savedEvent != null) {
            return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<EventEntity>> getAllEvents() {
        List<EventEntity> events = eventService.getAllEvents();
        if (events != null && !events.isEmpty()) {
            return new ResponseEntity<>(events, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-event/{id}")
    public ResponseEntity<EventEntity> getEventById(@PathVariable int id) {
        Optional<EventEntity> event = eventService.getEventById(id);
        if (event.isPresent()) {
            return new ResponseEntity<>(event.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EventEntity> updateEvent(@PathVariable int id, @RequestBody EventEntity eventEntity) {
        EventEntity updatedEvent = eventService.updateEvent(id, eventEntity);
        if (updatedEvent != null) {
            return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable int id) {
        boolean isDeleted = eventService.deleteEvent(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
