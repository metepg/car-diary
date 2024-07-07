package com.metepg.server.model

import jakarta.persistence.*
import java.util.Date

@Entity
@Table(name = "trips", schema = "car")
data class Trip(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 1,

    val startKilometers: Int,
    val endKilometers: Int,
    val date: Date,
    val startTime: Date,
    val endTime: Date,
    val areaId: Int
)
