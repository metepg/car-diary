package com.metepg.server.model

import jakarta.persistence.*

@Entity
@Table(name = "routes", schema = "car")
class Route(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @Column(unique = true, nullable = false)
    val description: String,

    @Column(name = "index", nullable = false)
    val index: Short
)
