package org.cris.railways.module.service;

import org.cris.railways.module.model.Station;

import java.sql.SQLException;
import java.util.List;

public interface StationService {
    void addStation(Station station) throws SQLException;
    Station getStation(String stnCode) throws SQLException;
    List<Station> getAllStations() throws SQLException;
    void updateStation(Station station) throws SQLException;
    void deleteStation(String stnCode) throws SQLException;
}
