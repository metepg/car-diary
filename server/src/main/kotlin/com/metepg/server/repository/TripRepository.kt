package com.metepg.server.repository
import com.metepg.server.model.Trip
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Date

interface TripRepository : JpaRepository<Trip, Int> {
    fun findAllByOrderByDateDesc(): List<Trip>

    fun findAllByDateBetweenOrderByDateDesc(startDate: Date, endDate: Date): List<Trip>

}