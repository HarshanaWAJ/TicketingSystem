package com.example.backend.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tickets")
public class TicketEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int totalTicket;
    private int availableCount;
    private String ticketName;
    private double unitPrice;
    private int soldCount;
    private int ticketReleaseRate;
    private int ticketRetrievalRate;

    // One to many
    @ManyToOne
    @JoinColumn(name = "event_id")
    private EventEntity event;
}
