package com.metepg.server.service

import com.metepg.server.model.Trip
import com.metepg.server.repository.TripRepository
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import org.springframework.data.domain.Sort
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.Month
import java.time.YearMonth

class TripServiceTest {

    companion object {
        val SORT_BY_DATE_DESC: Sort = Sort.by(Sort.Direction.DESC, "date")
        val SORT_BY_DATE_ASC: Sort = Sort.by(Sort.Direction.ASC, "date")
    }

    private val tripRepository: TripRepository = mock(TripRepository::class.java)
    private val tripService = TripService(tripRepository)

    @Test
    fun `test findTripsByDateDesc`() {
        val trip1 = Trip(
            id = 1,
            date = LocalDate.of(2023, Month.JULY, 10),
            startTime = LocalDateTime.of(2023, Month.JULY, 10, 10, 0),
            endTime = LocalDateTime.of(2023, Month.JULY, 10, 11, 0),
            startKilometers = 100,
            endKilometers = 150,
            route = "Route 1"
        )
        val trip2 = Trip(
            id = 2,
            date = LocalDate.of(2023, Month.JULY, 15),
            startTime = LocalDateTime.of(2023, Month.JULY, 15, 12, 0),
            endTime = LocalDateTime.of(2023, Month.JULY, 15, 13, 0),
            startKilometers = 200,
            endKilometers = 250,
            route = "Route 2"
        )
        val trips = listOf(trip1, trip2)
        `when`(tripRepository.findAllByYearAndMonth(2023, 7, SORT_BY_DATE_DESC)).thenReturn(trips)

        val result = tripService.findTripsByDateDesc(2023, 7)

        assertEquals(trips, result)
        assertTrue(result.all { trip ->
            val yearMonth = YearMonth.from(trip.date)
            yearMonth.year == 2023 && yearMonth.monthValue == 7
        })
        verify(tripRepository, times(1)).findAllByYearAndMonth(2023, 7, SORT_BY_DATE_DESC)
    }

    @Test
    fun `test findTripsByDateAsc`() {
        val trip1 = Trip(
            id = 1,
            date = LocalDate.of(2023, Month.JULY, 5),
            startTime = LocalDateTime.of(2023, Month.JULY, 5, 8, 0),
            endTime = LocalDateTime.of(2023, Month.JULY, 5, 9, 0),
            startKilometers = 100,
            endKilometers = 150,
            route = "Route 1"
        )
        val trip2 = Trip(
            id = 2,
            date = LocalDate.of(2023, Month.JULY, 20),
            startTime = LocalDateTime.of(2023, Month.JULY, 20, 14, 0),
            endTime = LocalDateTime.of(2023, Month.JULY, 20, 15, 0),
            startKilometers = 200,
            endKilometers = 250,
            route = "Route 2"
        )
        val trips = listOf(trip1, trip2)
        `when`(tripRepository.findAllByYearAndMonth(2023, 7, SORT_BY_DATE_ASC)).thenReturn(trips)

        val result = tripService.findTripsByDateAsc(2023, 7)

        assertEquals(trips, result)
        assertTrue(result.all { trip ->
            val yearMonth = YearMonth.from(trip.date)
            yearMonth.year == 2023 && yearMonth.monthValue == 7
        })
        verify(tripRepository, times(1)).findAllByYearAndMonth(2023, 7, SORT_BY_DATE_ASC)
    }
}