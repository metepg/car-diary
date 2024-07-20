package com.metepg.server.controller

import com.metepg.server.model.Trip
import com.metepg.server.service.DocumentService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/documents")
class DocumentController(private val documentService: DocumentService) {

    @GetMapping("/pdf/{month}")
    fun getTripsByMonth(@PathVariable month: Int): List<Trip> {
        return documentService.getTripsByMonth(month)
    }
}
