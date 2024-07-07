package com.metepg.server.controller

import com.metepg.server.model.Trip
import com.metepg.server.service.TripService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/trips")
class TripController(@Autowired val tripService: TripService) {

    @GetMapping
    fun getAllTrips(): ResponseEntity<List<Trip>> {
        return ResponseEntity.ok(null)
    }

    @PostMapping("/create")
    fun createTrip(@RequestBody trip: Trip): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(tripService.createTrip(trip))
        } catch (e: DataIntegrityViolationException) {
            ResponseEntity("Invalid Data", HttpStatus.BAD_REQUEST)
        }
    }
}
