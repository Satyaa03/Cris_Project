package org.cris.railways.module.dao;

import org.cris.railways.module.model.Station;
import java.sql.*;
import java.util.*;

public class StationDao {
    private Connection connection;

    public StationDao(Connection connection) {
        this.connection = connection;
    }

    public void addStation(Station station) throws SQLException {
        String query = "INSERT INTO stations (stationName, stnCode, oldStationCategory, newStationCategory, division, zone, district, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, station.getStationName());
            stmt.setString(2, station.getStnCode());
            stmt.setString(3, station.getOldStationCategory());
            stmt.setString(4, station.getNewStationCategory());
            stmt.setString(5, station.getDivision());
            stmt.setString(6, station.getZone());
            stmt.setString(7, station.getDistrict());
            stmt.setString(8, station.getState());
            stmt.executeUpdate();
        }
    }

    public Station getStation(String stnCode) throws SQLException {
        String query = "SELECT * FROM stations WHERE stnCode = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, stnCode);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Station station = new Station();
                station.setStationName(rs.getString("stationName"));
                station.setStnCode(rs.getString("stnCode"));
                station.setOldStationCategory(rs.getString("oldStationCategory"));
                station.setNewStationCategory(rs.getString("newStationCategory"));
                station.setDivision(rs.getString("division"));
                station.setZone(rs.getString("zone"));
                station.setDistrict(rs.getString("district"));
                station.setState(rs.getString("state"));
                return station;
            }
        }
        return null;
    }

    public List<Station> getAllStations() throws SQLException {
        List<Station> stations = new ArrayList<>();
        String query = "SELECT * FROM stations";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                Station station = new Station();
                station.setStationName(rs.getString("stationName"));
                station.setStnCode(rs.getString("stnCode"));
                station.setOldStationCategory(rs.getString("oldStationCategory"));
                station.setNewStationCategory(rs.getString("newStationCategory"));
                station.setDivision(rs.getString("division"));
                station.setZone(rs.getString("zone"));
                station.setDistrict(rs.getString("district"));
                station.setState(rs.getString("state"));
                stations.add(station);
            }
        }
        return stations;
    }

    public void updateStation(Station station) throws SQLException {
        String query = "UPDATE stations SET stationName=?, oldStationCategory=?, newStationCategory=?, division=?, zone=?, district=?, state=? WHERE stnCode=?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, station.getStationName());
            stmt.setString(2, station.getOldStationCategory());
            stmt.setString(3, station.getNewStationCategory());
            stmt.setString(4, station.getDivision());
            stmt.setString(5, station.getZone());
            stmt.setString(6, station.getDistrict());
            stmt.setString(7, station.getState());
            stmt.setString(8, station.getStnCode());
            stmt.executeUpdate();
        }
    }

    public void deleteStation(String stnCode) throws SQLException {
        String query = "DELETE FROM stations WHERE stnCode = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, stnCode);
            stmt.executeUpdate();
        }
    }
}
