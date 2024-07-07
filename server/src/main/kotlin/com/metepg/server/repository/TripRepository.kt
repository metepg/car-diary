package com.metepg.server.repository
import com.metepg.server.model.Trip
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface TripRepository : JpaRepository<Trip, Long> {
    fun findAllByOrderByDate(): List<Trip>

    @Query("SELECT COALESCE((SELECT total_amount FROM car.total_amount_view), 0)", nativeQuery = true)
    fun findTotalAmount(): Int
}