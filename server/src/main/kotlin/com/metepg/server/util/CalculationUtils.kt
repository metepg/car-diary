package com.metepg.server.util

import com.metepg.server.model.Trip

class CalculationUtils {

    companion object {
        fun calculateTotalKilometers(trips: List<Trip>): Int {
            return trips.sumOf { it.endKilometers - it.startKilometers }
        }
    }
}