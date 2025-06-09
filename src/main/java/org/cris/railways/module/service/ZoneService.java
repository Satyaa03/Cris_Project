package org.cris.railways.module.service;

import org.cris.railways.module.dao.ZoneDao;
import org.cris.railways.module.model.Train;
import org.cris.railways.module.model.Zone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.List;

@Service
public class ZoneService {

    private final ZoneDao zoneDao;

    @Autowired
    public ZoneService(DataSource dataSource) throws SQLException {
        // Initialize ZoneDao with a DB connection
        this.zoneDao = new ZoneDao(dataSource.getConnection());
    }

    public void addZone(Zone zone) throws SQLException {
        zoneDao.addZone(zone);
    }

    public Zone getZone(String code) throws SQLException {
        return zoneDao.getZone(code);
    }

    public List<Zone> getAllZones() throws SQLException {
        return zoneDao.getAllZones();
    }

    public void updateZone(Zone zone) throws SQLException {
        zoneDao.updateZone(zone);
    }

    public void deleteZone(String code) throws SQLException {
        zoneDao.deleteZone(code);
    }
     public List<Train> getInterZoneTrains(String zoneFrom, String zoneTo) {
        try {
            return zoneDao.findInterZoneTrains(zoneFrom, zoneTo);
        } catch (SQLException e) {
            throw new RuntimeException("Error fetching trains by zones", e);
        }
    }
}
