package com.metepg.server.model

import jakarta.persistence.*
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
    @Temporal(TemporalType.TIMESTAMP)
    val date: Date,

    @Column(name = "start_time")
    @Temporal(TemporalType.TIMESTAMP)
    val startTime: Date,

    @Column(name = "end_time")
    @Temporal(TemporalType.TIMESTAMP)
    val endTime: Date,

    @Column(name = "route")
    val route: String
)