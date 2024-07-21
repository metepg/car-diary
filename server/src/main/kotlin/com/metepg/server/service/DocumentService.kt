package com.metepg.server.service

import com.lowagie.text.*
import com.lowagie.text.pdf.PdfPCell
import com.lowagie.text.pdf.PdfPTable
import com.lowagie.text.pdf.PdfWriter
import com.metepg.server.model.Trip
import com.metepg.server.util.CalculationUtils
import org.springframework.stereotype.Service
import java.io.ByteArrayOutputStream
import java.text.DateFormatSymbols
import java.text.NumberFormat
import java.text.SimpleDateFormat
import java.time.format.DateTimeFormatter
import java.util.*

@Service
class DocumentService(private val tripService: TripService) {

    companion object {
        val dateFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy")
        val timeFormatter = SimpleDateFormat("HH:mm", Locale("fi"))
    }

    fun generatePDF(year: Int, month: Int): ByteArray {
        val trips = this.tripService.findTripsByDateAsc(year, month)
        val document = Document(PageSize.A4)
        val outputStream = ByteArrayOutputStream()
        PdfWriter.getInstance(document, outputStream)

        document.open()

        addMonthNameParagraph(document, year, month)
        addTotalKilometersParagraph(document, trips)
        addTable(document, trips)

        document.close()
        return outputStream.toByteArray()
    }

    private fun addMonthNameParagraph(document: Document, year: Int, month: Int) {
        val finnishMonthNames = DateFormatSymbols(Locale("fi")).months

        // Capitalize name
        var monthName = finnishMonthNames[month - 1].replaceFirstChar { if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString() }

        // Month name is e.g. 'Heinäkuuta' so remove last 2 letters (ta) and add year to end
        monthName = monthName.substring(0, monthName.length - 2) + " $year"

        val monthNameParagraph = Paragraph(monthName, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14f)).apply {
            spacingAfter = 10f
        }

        document.add(monthNameParagraph)
    }

    private fun addTotalKilometersParagraph(document: Document, trips: List<Trip>) {
        val totalKilometers = CalculationUtils.calculateTotalKilometers(trips)
        val totalKilometersText = "Yhteensä: $totalKilometers kilometriä"

        val headerParagraph = Paragraph(totalKilometersText, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14f)).apply {
            spacingAfter = 10f
        }
        document.add(headerParagraph)
    }

    private fun addTable(document: Document, trips: List<Trip>) {
        val boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12f)
        val numberFormat = NumberFormat.getInstance(Locale("fi")).apply {
            maximumFractionDigits = 0
        }

        val columnWidths = floatArrayOf(1.6f, 1.2f, 1.2f, 2f, 2f, 2f)
        val table = PdfPTable(columnWidths)
        table.widthPercentage = 100f

        val headers = listOf("Päivämäärä", "Alkanut", "Päättynyt", "Alkukilometrit", "Loppukilometrit", "Matkan pituus")
        addTableHeaders(table, headers, boldFont)

        addTableRows(table, trips, numberFormat)

        document.add(table)
    }

    private fun addTableHeaders(table: PdfPTable, headers: List<String>, boldFont: Font) {
        headers.forEach { header ->
            val cell = PdfPCell(Phrase(header, boldFont)).apply {
                horizontalAlignment = Element.ALIGN_CENTER
                paddingTop = 5f
                paddingBottom = 5f
            }
            table.addCell(cell)
        }
    }

    private fun addTableRows(
        table: PdfPTable,
        trips: List<Trip>,
        numberFormat: NumberFormat
    ) {
        trips.forEach { trip ->
            table.addCell(PdfPCell(Phrase(dateFormatter.format(trip.date))).apply {
                horizontalAlignment = Element.ALIGN_CENTER
                paddingTop = 5f
                paddingBottom = 5f
            })
            table.addCell(PdfPCell(Phrase(timeFormatter.format(trip.startTime))).apply {
                horizontalAlignment = Element.ALIGN_CENTER
                paddingTop = 5f
                paddingBottom = 5f
            })
            table.addCell(PdfPCell(Phrase(timeFormatter.format(trip.endTime))).apply {
                horizontalAlignment = Element.ALIGN_CENTER
                paddingTop = 5f
                paddingBottom = 5f
            })
            table.addCell(PdfPCell(Phrase("${numberFormat.format(trip.startKilometers)} km")).apply {
                horizontalAlignment = Element.ALIGN_CENTER
                paddingTop = 5f
                paddingBottom = 5f
            })
            table.addCell(PdfPCell(Phrase("${numberFormat.format(trip.endKilometers)} km")).apply {
                horizontalAlignment = Element.ALIGN_CENTER
                paddingTop = 5f
                paddingBottom = 5f
            })
            table.addCell(PdfPCell(Phrase("${numberFormat.format(trip.endKilometers - trip.startKilometers)} km")).apply {
                horizontalAlignment = Element.ALIGN_CENTER
                paddingTop = 5f
                paddingBottom = 5f
            })
        }
    }
}