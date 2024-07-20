package com.metepg.server.service

import com.metepg.server.model.Trip
import org.springframework.stereotype.Service

@Service
class DocumentService(private val tripService: TripService) {

    fun getTripsByMonth(month: Int): List<Trip> {
        return listOf()
    }
}