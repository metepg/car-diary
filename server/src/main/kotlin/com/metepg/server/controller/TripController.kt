package com.metepg.server.controller

import com.metepg.server.model.Trip
import com.metepg.server.service.TripService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/trips")
class TripController(@Autowired val tripService: TripService) {

    @PostMapping("/create")
    fun createTrip(@RequestBody trip: Trip): ResponseEntity<Trip> {
        return ResponseEntity(null, HttpStatus.BAD_REQUEST)
    }
}
