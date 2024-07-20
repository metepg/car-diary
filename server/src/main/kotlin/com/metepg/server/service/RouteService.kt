package com.metepg.server.service

import com.metepg.server.model.Route
import com.metepg.server.repository.RouteRepository
import org.springframework.stereotype.Service

@Service
class RouteService(private val routeRepository: RouteRepository) {

    fun findAll(): List<Route> {
        return routeRepository.findAllByOrderByIndexAsc()
    }

}