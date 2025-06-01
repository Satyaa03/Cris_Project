package org.cris.railways.module.controller;

import jakarta.annotation.PostConstruct;
import org.cris.railways.module.dao.StationDao;
import org.cris.railways.module.model.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/stations")
public class StationController {

    @Autowired
    private DataSource dataSource;
    private StationDao stationDao;

    @PostConstruct
    public void init() throws SQLException {
        stationDao = new StationDao(dataSource.getConnection());
    }

    @PostMapping
    public void addStation(@RequestBody Station station) throws SQLException {
        stationDao.addStation(station);
    }

    @GetMapping("/{stnCode}")
    public Station getStation(@PathVariable String stnCode) throws SQLException {
        return stationDao.getStation(stnCode);
    }

    @GetMapping
    public List<Station> getAllStations() throws SQLException {
        return stationDao.getAllStations();
    }

    @PutMapping
    public void updateStation(@RequestBody Station station) throws SQLException {
        stationDao.updateStation(station);
    }

    @DeleteMapping("/{stnCode}")
    public void deleteStation(@PathVariable String stnCode) throws SQLException {
        stationDao.deleteStation(stnCode);
    }
}
