package com.metepg.server.controller

import com.metepg.server.service.DocumentService
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/documents")
class DocumentController(private val documentService: DocumentService) {

    @GetMapping("/pdf")
    fun generatePDF(@RequestParam year: Int, @RequestParam month: Int): ResponseEntity<ByteArray> {
        val pdfBytes = documentService.generatePDF(year, month)
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Kilometrit-$year-$month.pdf")
            .body(pdfBytes)
    }
}
