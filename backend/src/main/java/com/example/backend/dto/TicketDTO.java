package com.example.backend.dto;

import com.example.backend.Entities.EventEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketDTO {
    private int id;
    private int initCount;
    private int availableCount;
    private String ticketName;
    private double unitPrice;
    private EventEntity event;
}
