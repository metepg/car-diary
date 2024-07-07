package com.metepg.server.exception
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import java.util.logging.Logger

@ControllerAdvice
class GlobalExceptionHandler {

    private val logger = Logger.getLogger(GlobalExceptionHandler::class.java.name)

    @ExceptionHandler(Exception::class)
    fun handleAllExceptions(ex: Exception, request: WebRequest): ResponseEntity<Any> {
        logger.severe("Exception: ${ex.message}")
        ex.printStackTrace()
        return ResponseEntity("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
