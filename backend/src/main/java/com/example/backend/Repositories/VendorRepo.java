package com.example.backend.Repositories;

import com.example.backend.Entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepo extends JpaRepository<Vendor, Integer> {
}
