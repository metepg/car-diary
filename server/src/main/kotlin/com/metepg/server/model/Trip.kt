package com.metepg.server.model

import jakarta.persistence.*
import java.time.LocalDate
import java.util.Date

@Entity
@Table(name = "trips", schema = "car")
data class Trip(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @Column(name = "start_kilometers")
    val startKilometers: Int,

    @Column(name = "end_kilometers")
    val endKilometers: Int,

    @Column(name = "date")
    val date: LocalDate,

    @Column(name = "start_time")
    val startTime: Date,

    @Column(name = "end_time")
    val endTime: Date,

    @Column(name = "route")
    val route: String
)