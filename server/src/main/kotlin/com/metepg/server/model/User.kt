package com.metepg.server.model

import java.io.Serializable
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name = "users", schema = "car")
data class User (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int? = null,

    @JsonIgnore
    var password: String? = null,

    @JsonIgnore
    var role: String? = null,

    var name: String? = null
) : Serializable {
    companion object {
        private const val serialVersionUID = 1L
    }
}
