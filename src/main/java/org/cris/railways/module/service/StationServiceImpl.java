package org.cris.railways.module.service;

import org.cris.railways.module.dao.StationDao;
import org.cris.railways.module.model.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.List;

@Service
public class StationServiceImpl implements StationService {

    private final StationDao stationDao;

    @Autowired
    public StationServiceImpl(DataSource dataSource) throws SQLException {
        // Initialize StationDao with a connection
        this.stationDao = new StationDao(dataSource.getConnection());
    }

    @Override
    public void addStation(Station station) throws SQLException {
        stationDao.addStation(station);
    }

    @Override
    public Station getStation(String stnCode) throws SQLException {
        return stationDao.getStation(stnCode);
    }

    @Override
    public List<Station> getAllStations() throws SQLException {
        return stationDao.getAllStations();
    }

    @Override
    public void updateStation(Station station) throws SQLException {
        stationDao.updateStation(station);
    }

    @Override
    public void deleteStation(String stnCode) throws SQLException {
        stationDao.deleteStation(stnCode);
    }
}

