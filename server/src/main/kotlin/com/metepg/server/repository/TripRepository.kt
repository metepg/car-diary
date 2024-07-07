package com.metepg.server.repository
import com.metepg.server.model.Trip
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface TripRepository : JpaRepository<Trip, Int> {
    fun findAllByOrderByDate(): List<Trip>

    fun findAllByDateBetween(startDate: Date, endDate: Date): List<Trip>

}