package org.cris.railways.module.controller;

import jakarta.annotation.PostConstruct;
import org.cris.railways.module.dao.TrainDao;
import org.cris.railways.module.model.Train;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/trains")
public class TrainController {

    @Autowired
    private DataSource dataSource;
    private TrainDao trainDao;

    @PostConstruct
    public void init() throws SQLException {
        trainDao = new TrainDao(dataSource.getConnection());
    }

    @PostMapping
    public void addTrain(@RequestBody Train train) throws SQLException {
        trainDao.addTrain(train);
    }

    @GetMapping("/{trainNo}")
    public Train getTrain(@PathVariable String trainNo) throws SQLException {
        return trainDao.getTrain(trainNo);
    }

    @GetMapping
    public List<Train> getAllTrains() throws SQLException {
        return trainDao.getAllTrains();
    }

    @PutMapping
    public void updateTrain(@RequestBody Train train) throws SQLException {
        trainDao.updateTrain(train);
    }

    @DeleteMapping("/{trainNo}")
    public void deleteTrain(@PathVariable String trainNo) throws SQLException {
        trainDao.deleteTrain(trainNo);
    }
}
