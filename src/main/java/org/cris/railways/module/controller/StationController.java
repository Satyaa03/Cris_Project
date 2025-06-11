package org.cris.railways.module.controller;

import org.cris.railways.module.model.Station;
import org.cris.railways.module.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/common/{divisionA}/{divisionB}")
    public List<Map<String, Object>> getCommonStations(
            @PathVariable String divisionA,
            @PathVariable String divisionB) throws SQLException {

        return stationService.getCommonStationsBetweenDivisions(divisionA, divisionB);
    }

    @GetMapping("/shared-stations/{zone1}/{zone2}")
    public List<Map<String, Object>> getSharedStationsForZones(
            @PathVariable String zone1,
            @PathVariable String zone2) throws SQLException {

        return stationService.getSharedStationsForZoneTrains(zone1, zone2);
    }

    @GetMapping("/trains-passing/{stationCode}")
    public List<Map<String, Object>> getTrainsPassingStation(@PathVariable String stationCode) throws SQLException {
        return stationService.getTrainsPassingStation(stationCode);
    }
    
     @GetMapping("/traffic-summary/{code}")
    public List<Map<String, Object>> getStationTraffic(@PathVariable String code) throws SQLException {
        return stationService.getStationTrafficSummary(code);
    }
}

