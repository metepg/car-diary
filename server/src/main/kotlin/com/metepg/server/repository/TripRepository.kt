package com.metepg.server.repository
import com.metepg.server.model.Trip
import org.springframework.data.domain.Sort
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.time.LocalDate

interface TripRepository : JpaRepository<Trip, Int> {
    fun findAllByOrderByDateDesc(): List<Trip>

    fun findAllByDateBetweenOrderByDateDesc(startDate: LocalDate, endDate: LocalDate): List<Trip>

    @Query("SELECT t FROM Trip t WHERE EXTRACT(YEAR FROM t.date) = :year AND EXTRACT(MONTH FROM t.date) = :month")
    fun findAllByYearAndMonth(@Param("year") year: Int, @Param("month") month: Int, sort: Sort): List<Trip>

}