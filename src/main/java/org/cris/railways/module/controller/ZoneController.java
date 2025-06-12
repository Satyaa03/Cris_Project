package org.cris.railways.module.controller;

import org.cris.railways.module.model.Zone;
import org.cris.railways.module.service.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/zones")
public class ZoneController {

    @Autowired
    private ZoneService zoneService;

    // Constructor-based dependency injection
    @Autowired
    public ZoneController(ZoneService zoneService) {
        this.zoneService = zoneService;
    }

    @PostMapping
    public void addZone(@RequestBody Zone zone) {
        try {
            zoneService.addZone(zone);
        } catch (SQLException e) {
            System.err.println("Error adding zone: " + e.getMessage());
        }
    }

    @GetMapping("/{code}")
    public Zone getZone(@PathVariable String code) {
        try {
            return zoneService.getZone(code);
        } catch (SQLException e) {
            System.err.println("Error retrieving zone: " + e.getMessage());
            return null; // Handle error appropriately
        }
    }

    @GetMapping
    public List<Zone> getAllZones() {
        try {
            return zoneService.getAllZones();
        } catch (SQLException e) {
            System.err.println("Error retrieving all zones: " + e.getMessage());
            return List.of(); // Return an empty list on error
        }
    }

    @PutMapping
    public void updateZone(@RequestBody Zone zone) {
        try {
            zoneService.updateZone(zone);
        } catch (SQLException e) {
            System.err.println("Error updating zone: " + e.getMessage());
        }
    }

    @DeleteMapping("/{code}")
    public void deleteZone(@PathVariable String code) {
        try {
            zoneService.deleteZone(code);
        } catch (SQLException e) {
            System.err.println("Error deleting zone: " + e.getMessage());
        }
    }

    @GetMapping("/{zoneFrom}/distance/{zoneTo}")
    public ResponseEntity<Map<String, Double>> getAvgDistanceBetweenZones(
        @PathVariable String zoneFrom,
        @PathVariable String zoneTo) {
    try {
        double avgDistance = zoneService.getAvgDistanceBetweenZones(zoneFrom, zoneTo);
        return ResponseEntity.ok(Map.of("average_distance", avgDistance));
    } catch (SQLException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    }

    @GetMapping("/overview/{zoneCode}")
    public List<Map<String, Object>> getZoneOverview(@PathVariable String zoneCode) {
        try {
            return zoneService.getZoneOverview(zoneCode);
        } catch (SQLException e) {
            System.err.println("Error in zone_overview: " + e.getMessage());
            return List.of();
        }
    }

    @GetMapping("/train-zone-hops/{trainNo}")
    public List<Map<String, Object>> getTrainZoneHops(@PathVariable String trainNo) throws SQLException {
        return zoneService.getTrainZoneHops(trainNo);
    }

}




