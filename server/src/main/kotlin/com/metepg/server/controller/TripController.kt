package com.metepg.server.controller

import com.metepg.server.model.Trip
import com.metepg.server.service.TripService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/trips")
class TripController(@Autowired val tripService: TripService) {

    @GetMapping
    fun getAllTrips(): ResponseEntity<List<Trip>> {
        return try {
            ResponseEntity.ok(tripService.findAllTrips())
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList())
        }
    }

    @PostMapping("/create")
    fun createTrip(@RequestBody trip: Trip): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(tripService.createTrip(trip))
        } catch (e: DataIntegrityViolationException) {
            ResponseEntity("Invalid Data", HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Int): ResponseEntity<Trip> {
        val trip = tripService.findTripById(id)
        return if (trip != null) {
            ResponseEntity.ok(trip)
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
        }
    }

    @PutMapping
    fun updateTrip(@RequestBody updatedTrip: Trip): ResponseEntity<Trip> {
        val trip = tripService.updateTrip(updatedTrip)
        return ResponseEntity.ok(trip)
    }

    @GetMapping("/range")
    fun getTripsWithinDateRange(
        @RequestParam("start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) startDate: Date,
        @RequestParam("end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) endDate: Date
    ): ResponseEntity<List<Trip>> {
        val trips = tripService.findAllByDateBetween(startDate, endDate)
        return ResponseEntity.ok(trips)
    }

    @DeleteMapping("/{tripId}")
    fun deleteTripById(@PathVariable tripId: Int): ResponseEntity<Void> {
        tripService.deleteTripById(tripId)
        return ResponseEntity.ok().build()
    }

}