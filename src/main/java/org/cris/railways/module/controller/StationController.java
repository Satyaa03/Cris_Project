package org.cris.railways.module.controller;

import org.cris.railways.module.model.Station;
import org.cris.railways.module.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/stations")
public class StationController {

    @Autowired
    private StationService stationService;

    // Constructor-based dependency injection
    @Autowired
    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    @PostMapping
    public void addStation(@RequestBody Station station) {
        try {
            stationService.addStation(station);
        } catch (SQLException e) {
            System.err.println("Error adding station: " + e.getMessage());
        }
    }

    @GetMapping("/{stn_code}")
    public Station getStation(@PathVariable String stn_code) {
        try {
            return stationService.getStation(stn_code);
        } catch (SQLException e) {
            System.err.println("Error retrieving station: " + e.getMessage());
            return null; // Handle error appropriately
        }
    }

    @GetMapping
    public List<Station> getAllStations() {
        try {
            return stationService.getAllStations();
        } catch (SQLException e) {
            System.err.println("Error retrieving all stations: " + e.getMessage());
            return List.of(); // Return an empty list on error
        }
    }

    @PutMapping
    public void updateStation(@RequestBody Station station) {
        try {
            stationService.updateStation(station);
        } catch (SQLException e) {
            System.err.println("Error updating station: " + e.getMessage());
        }
    }

    @DeleteMapping("/{stn_code}")
    public void deleteStation(@PathVariable String stn_code) {
        try {
            stationService.deleteStation(stn_code);
        } catch (SQLException e) {
            System.err.println("Error deleting station: " + e.getMessage());
        }
    }
}

