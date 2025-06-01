package org.cris.railways.module.controller;

import jakarta.annotation.PostConstruct;
import org.cris.railways.module.dao.ZoneDao;
import org.cris.railways.module.model.Zone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/zones")
public class ZoneController {

    @Autowired
    private DataSource dataSource;
    private ZoneDao zoneDao;

    @PostConstruct
    public void init() throws SQLException {
        zoneDao = new ZoneDao(dataSource.getConnection());
    }

    @PostMapping
    public void addZone(@RequestBody Zone zone) throws SQLException {
        zoneDao.addZone(zone);
    }

    @GetMapping("/{code}")
    public Zone getZone(@PathVariable String code) throws SQLException {
        return zoneDao.getZone(code);
    }

    @GetMapping
    public List<Zone> getAllZones() throws SQLException {
        return zoneDao.getAllZones();
    }

    @PutMapping
    public void updateZone(@RequestBody Zone zone) throws SQLException {
        zoneDao.updateZone(zone);
    }

    @DeleteMapping("/{code}")
    public void deleteZone(@PathVariable String code) throws SQLException {
        zoneDao.deleteZone(code);
    }
}

