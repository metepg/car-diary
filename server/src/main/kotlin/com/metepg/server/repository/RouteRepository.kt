package com.metepg.server.repository

import com.metepg.server.model.Route
import org.springframework.data.jpa.repository.JpaRepository

interface RouteRepository : JpaRepository<Route, Int>{
    fun findAllByOrderByIndexAsc(): List<Route>
}
