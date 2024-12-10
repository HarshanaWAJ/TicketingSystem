package com.example.backend.Repositories;

import com.example.backend.Entities.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepo extends JpaRepository<EventEntity, Integer> {
}
