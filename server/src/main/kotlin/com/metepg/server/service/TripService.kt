package com.metepg.server.service
import com.metepg.server.model.Trip
import com.metepg.server.repository.TripRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class TripService(@Autowired val tripRepository: TripRepository) {

    fun createTrip(trip: Trip): Trip {
        return tripRepository.save(trip)
    }

    fun findAllTrips(): List<Trip> {
        return tripRepository.findAllByOrderByDateDesc()
    }

    fun findTripById(id: Int): Trip? {
        return tripRepository.findById(id).orElse(null)
    }

    fun updateTrip(updatedTrip: Trip): Trip {
        return tripRepository.save(updatedTrip)
    }

    fun findAllByDateBetween(startDate: Date, endDate: Date): List<Trip> {
        val calendar = Calendar.getInstance()
        calendar.time = endDate
        calendar.add(Calendar.DAY_OF_YEAR, 1)
        val inclusiveEndDate = calendar.time
        return tripRepository.findAllByDateBetweenOrderByDateDesc(startDate, inclusiveEndDate)
    }

    fun deleteTripById(tripId: Int) {
        return tripRepository.deleteById(tripId);
    }

}