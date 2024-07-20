package com.metepg.server.service
import com.metepg.server.model.Trip
import com.metepg.server.repository.TripRepository
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class TripService(private val tripRepository: TripRepository) {

    companion object {
        val SORT_BY_DATE_DESC: Sort = Sort.by(Sort.Direction.DESC, "date")
        val SORT_BY_DATE_ASC: Sort = Sort.by(Sort.Direction.ASC, "date")
    }

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

    fun findAllByDateBetween(startDate: LocalDate, endDate: LocalDate): List<Trip> {
        return tripRepository.findAllByDateBetweenOrderByDateDesc(startDate, endDate)
    }

    fun deleteTripById(tripId: Int) {
        return tripRepository.deleteById(tripId)
    }

    fun findTripsByDateDesc(year: Int, month: Int): List<Trip> {
        return tripRepository.findAllByYearAndMonth(year, month, SORT_BY_DATE_DESC)
    }

    fun findTripsByDateAsc(year: Int, month: Int): List<Trip> {
        return tripRepository.findAllByYearAndMonth(year, month, SORT_BY_DATE_ASC)
    }
}