package com.metepg.server.util

import com.metepg.server.model.Trip
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.Month

class CalculationUtilsTest {

    @Test
    fun `calculateTotalKilometers should return zero for empty list`() {
        val trips = emptyList<Trip>()
        val result = CalculationUtils.calculateTotalKilometers(trips)
        assertEquals(0, result)
    }

    @Test
    fun `calculateTotalKilometers should return correct total kilometers`() {
        val trips = listOf(
            Trip(
                id = 1,
                date = LocalDate.of(2023, Month.JULY, 10),
                startTime = LocalDateTime.of(2023, Month.JULY, 10, 10, 0),
                endTime = LocalDateTime.of(2023, Month.JULY, 10, 11, 0),
                startKilometers = 100,
                endKilometers = 150,
                route = "Route 1"
            ),
            Trip(
                id = 2,
                date = LocalDate.of(2023, Month.JULY, 11),
                startTime = LocalDateTime.of(2023, Month.JULY, 11, 12, 0),
                endTime = LocalDateTime.of(2023, Month.JULY, 11, 13, 0),
                startKilometers = 150,
                endKilometers = 200,
                route = "Route 2"
            ),
            Trip(
                id = 3,
                date = LocalDate.of(2023, Month.JULY, 12),
                startTime = LocalDateTime.of(2023, Month.JULY, 12, 14, 0),
                endTime = LocalDateTime.of(2023, Month.JULY, 12, 15, 0),
                startKilometers = 200,
                endKilometers = 250,
                route = "Route 3"
            )
        )
        val result = CalculationUtils.calculateTotalKilometers(trips)
        assertEquals(150, result)
    }

    @Test
    fun `calculateTotalKilometers should handle negative kilometer values`() {
        val trips = listOf(
            Trip(
                id = 1,
                date = LocalDate.of(2023, Month.JULY, 10),
                startTime = LocalDateTime.of(2023, Month.JULY, 10, 10, 0),
                endTime = LocalDateTime.of(2023, Month.JULY, 10, 11, 0),
                startKilometers = 100,
                endKilometers = 150,
                route = "Route 1"
            ),
            Trip(
                id = 2,
                date = LocalDate.of(2023, Month.JULY, 11),
                startTime = LocalDateTime.of(2023, Month.JULY, 11, 12, 0),
                endTime = LocalDateTime.of(2023, Month.JULY, 11, 13, 0),
                startKilometers = 150,
                endKilometers = 100,
                route = "Route 2"
            ),
            Trip(
                id = 3,
                date = LocalDate.of(2023, Month.JULY, 12),
                startTime = LocalDateTime.of(2023, Month.JULY, 12, 14, 0),
                endTime = LocalDateTime.of(2023, Month.JULY, 12, 15, 0),
                startKilometers = 200,
                endKilometers = 250,
                route = "Route 3"
            )
        )
        val result = CalculationUtils.calculateTotalKilometers(trips)
        assertEquals(50, result)
    }

    @Test
    fun `calculateTotalKilometers should handle trips with same start and end kilometers`() {
        val trips = listOf(
            Trip(
                id = 1,
                date = LocalDate.of(2023, Month.JULY, 10),
                startTime = LocalDateTime.of(2023, Month.JULY, 10, 10, 0),
                endTime = LocalDateTime.of(2023, Month.JULY, 10, 11, 0),
                startKilometers = 100,
                endKilometers = 100,
                route = "Route 1"
            ),
            Trip(
                id = 2,
                date = LocalDate.of(2023, Month.JULY, 11),
                startTime = LocalDateTime.of(2023, Month.JULY, 11, 12, 0),
                endTime = LocalDateTime.of(2023, Month.JULY, 11, 13, 0),
                startKilometers = 150,
                endKilometers = 150,
                route = "Route 2"
            ),
            Trip(
                id = 3,
                date = LocalDate.of(2023, Month.JULY, 12),
                startTime = LocalDateTime.of(2023, Month.JULY, 12, 14, 0),
                endTime = LocalDateTime.of(2023, Month.JULY, 12, 15, 0),
                startKilometers = 200,
                endKilometers = 250,
                route = "Route 3"
            )
        )
        val result = CalculationUtils.calculateTotalKilometers(trips)
        assertEquals(50, result)
    }
}