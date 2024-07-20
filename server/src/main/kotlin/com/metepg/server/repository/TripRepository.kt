package com.metepg.server.repository
import com.metepg.server.model.Trip
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.Date

interface TripRepository : JpaRepository<Trip, Int> {
    fun findAllByOrderByDateDesc(): List<Trip>

    fun findAllByDateBetweenOrderByDateDesc(startDate: Date, endDate: Date): List<Trip>

    @Query("SELECT t FROM Trip t WHERE EXTRACT(YEAR FROM t.date) = :year AND EXTRACT(MONTH FROM t.date) = :month ORDER BY t.date DESC")
    fun findAllByYearAndMonth(@Param("year") year: Int, @Param("month") month: Int): List<Trip>

}