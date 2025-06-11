package org.cris.railways.module.controller;

import org.cris.railways.module.model.Train;
import org.cris.railways.module.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trains")
public class TrainController {

    @Autowired
    private TrainService trainService;

    // Constructor-based dependency injection
    @Autowired
    public TrainController(TrainService trainService) {
        this.trainService = trainService;
    }

    @PostMapping
    public void addTrain(@RequestBody Train train) {
        try {
            trainService.addTrain(train);
        } catch (SQLException e) {
            System.err.println("Error adding train: " + e.getMessage());
        }
    }

    @GetMapping("/{trainNo}/{sequence}")
    public Train getTrain(@PathVariable String trainNo, @PathVariable int sequence) {
        try {
        return trainService.getTrainById(trainNo, sequence);
        } catch (SQLException e) {
        System.err.println("Error retrieving train: " + e.getMessage());
        return null;
        }
    }

    @GetMapping
    public List<Train> getAllTrains() {
        try {
            return trainService.getAllTrains();
        } catch (SQLException e) {
            System.err.println("Error retrieving all trains: " + e.getMessage());
            return List.of(); // Return an empty list on error
        }
    }

    @PutMapping
    public void updateTrain(@RequestBody Train train) {
        try {
            trainService.updateTrain(train);
        } catch (SQLException e) {
            System.err.println("Error updating train: " + e.getMessage());
        }
    }

    @DeleteMapping("/{trainNo}")
    public void deleteTrain(@PathVariable String trainNo) {
        try {
            trainService.deleteTrainById(trainNo);
        } catch (SQLException e) {
            System.err.println("Error deleting train: " + e.getMessage());
        }
    }

    @GetMapping("/number/{trainNo}")
    public List<Train> getTrainsByNumber(@PathVariable String trainNo) {
        try {
            return trainService.getTrainsByTrainNo(trainNo);
        } catch (SQLException e) {
            System.err.println("Error retrieving trains: " + e.getMessage());
            return List.of(); // Return empty list on error
        }
    }

     @GetMapping("/{code}/timeline")
    public List<Map<String, Object>> getTrainTimeline(
            @PathVariable String code,
            @RequestParam(required = false) String trainNo) throws SQLException {

        return trainService.getTrainTimelineThroughZone(code, trainNo);
    }

    @GetMapping("/{zoneFrom}/trains/{zoneTo}")
    public List<Train> getInterZoneTrains(@PathVariable String zoneFrom, @PathVariable String zoneTo) {
        return trainService.getInterZoneTrains(zoneFrom, zoneTo);
    }
}
