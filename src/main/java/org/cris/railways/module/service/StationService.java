package org.cris.railways.module.service;

import org.cris.railways.module.dao.StationDao;
import org.cris.railways.module.model.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class StationService {

    private final StationDao stationDao;

    @Autowired
    public StationService(DataSource dataSource) throws SQLException {
        // Initialize StationDao with a DB connection
        this.stationDao = new StationDao(dataSource.getConnection());
    }

    public void addStation(Station station) throws SQLException {
        stationDao.addStation(station);
    }

    public Station getStation(String stn_code) throws SQLException {
        return stationDao.getStation(stn_code);
    }

    public List<Station> getAllStations() throws SQLException {
        return stationDao.getAllStations();
    }

    public void updateStation(Station station) throws SQLException {
        stationDao.updateStation(station);
    }

    public void deleteStation(String stn_code) throws SQLException {
        stationDao.deleteStation(stn_code);
    }

    public List<Map<String, Object>> getCommonStationsBetweenDivisions(String divisionA, String divisionB) throws SQLException {
        return stationDao.getCommonStationsBetweenDivisions(divisionA, divisionB);
    }

    public List<Map<String, Object>> getSharedStationsForZoneTrains(String zone1, String zone2) throws SQLException {
    return stationDao.getSharedStationsForZoneTrains(zone1, zone2);
}
}

