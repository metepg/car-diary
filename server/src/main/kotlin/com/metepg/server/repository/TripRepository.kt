package com.metepg.server.repository
import com.metepg.server.model.Trip
import org.springframework.data.jpa.repository.JpaRepository

interface TripRepository : JpaRepository<Trip, Long>