package com.example.backend.Repositories;

import com.example.backend.Entities.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TicketRepo extends JpaRepository<TicketEntity, Integer> {

    @Query(value = "SELECT t.* FROM tickets t WHERE t.event_id = ?1", nativeQuery = true)
    List<TicketEntity> findTicketByEventId(int id);

}
