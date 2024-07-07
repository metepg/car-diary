package com.metepg.server.service

import com.metepg.server.model.Route
import com.metepg.server.repository.RouteRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class RouteService(@Autowired val routeRepository: RouteRepository) {


    fun findAll(): List<Route> {
        return routeRepository.findAllByOrderByIndexAsc()
    }

}