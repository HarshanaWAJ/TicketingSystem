package com.example.backend.Services;

import com.example.backend.Entities.EventEntity;
import com.example.backend.Repositories.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepo eventRepo;

    public EventEntity saveEvent(EventEntity event) {
        try {
            return eventRepo.save(event);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<EventEntity> getAllEvents() {
        try {
            return eventRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Get event by id
    public Optional<EventEntity> getEventById(int id) {
        try {
            return eventRepo.findById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Delete an event
    public boolean deleteEvent(int id) {
        try {
            eventRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public EventEntity updateEvent(int id, EventEntity eventEntity) {
        if (eventRepo.existsById(id)) {
            eventEntity.setId(id);
            return eventRepo.save(eventEntity);
        }
        return null;  // Or throw an exception if not found
    }
}
