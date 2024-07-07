package com.metepg.server.controller

import com.metepg.server.model.Route
import com.metepg.server.service.RouteService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/routes")
class RouteController(@Autowired val routeService: RouteService) {

    @GetMapping
    fun findAllRoutes(): ResponseEntity<List<Route>> {
        return try {
            ResponseEntity.ok(routeService.findAll())
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(emptyList())
        }
    }

}