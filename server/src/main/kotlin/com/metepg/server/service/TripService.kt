package com.metepg.server.service
import com.metepg.server.model.Trip
import com.metepg.server.repository.TripRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TripService(@Autowired val tripRepository: TripRepository) {

    fun createTrip(trip: Trip): Trip {
        return tripRepository.save(trip)
    }
}