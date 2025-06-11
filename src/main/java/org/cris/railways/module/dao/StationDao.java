package org.cris.railways.module.dao;

import org.cris.railways.module.model.Station;
import java.sql.*;
import java.util.*;

public class StationDao {
    private Connection connection;

    public StationDao(Connection connection) {
        this.connection = connection;
    }

    // Create
    public void addStation(Station station) {
        String query = "INSERT INTO stations (station_name, stn_code, old_station_category, new_station_category, division, zone, district, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
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
        } catch (SQLException e) {
            System.err.println("Error adding station: " + e.getMessage());
        }
    }

    // Read
    public Station getStation(String stn_code) {
        String query = "SELECT * FROM stations WHERE stn_code = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, stn_code);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Station station = new Station();
                station.setStationName(rs.getString("station_name"));
                station.setStnCode(rs.getString("stn_code"));
                station.setOldStationCategory(rs.getString("old_station_category"));
                station.setNewStationCategory(rs.getString("new_station_category"));
                station.setDivision(rs.getString("division"));
                station.setZone(rs.getString("zone"));
                station.setDistrict(rs.getString("district"));
                station.setState(rs.getString("state"));
                return station;
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving station: " + e.getMessage());
        }
        return null; // Return null if no station found
    }

    // Read All
    public List<Station> getAllStations() {
        List<Station> stations = new ArrayList<>();
        String query = "SELECT * FROM stations";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                Station station = new Station();
                station.setStationName(rs.getString("station_name"));
                station.setStnCode(rs.getString("stn_code"));
                station.setOldStationCategory(rs.getString("old_station_category"));
                station.setNewStationCategory(rs.getString("new_station_category"));
                station.setDivision(rs.getString("division"));
                station.setZone(rs.getString("zone"));
                station.setDistrict(rs.getString("district"));
                station.setState(rs.getString("state"));
                stations.add(station);
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving all stations: " + e.getMessage());
        }
        return stations;
    }

    // Update
    public void updateStation(Station station) {
        String query = "UPDATE stations SET station_name=?, old_station_category=?, new_station_category=?, division=?, zone=?, district=?, state=? WHERE stn_code=?";
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
        } catch (SQLException e) {
            System.err.println("Error updating station: " + e.getMessage());
        }
    }

    // Delete
    public void deleteStation(String stnCode) {
        String query = "DELETE FROM stations WHERE stn_code = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, stnCode);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error deleting station: " + e.getMessage());
        }
    }

    public List<Map<String, Object>> getCommonStationsBetweenDivisions(String divisionA, String divisionB) throws SQLException {
        List<Map<String, Object>> result = new ArrayList<>();

        String sql = "SELECT * FROM get_common_stations_between_divisions(?, ?)";
        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, divisionA);
            ps.setString(2, divisionB);

            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> row = new HashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        row.put(metaData.getColumnLabel(i), rs.getObject(i));
                    }
                    result.add(row);
                }
            }
        }

        return result;
    }

    public List<Map<String, Object>> getSharedStationsForZoneTrains(String zone1, String zone2) throws SQLException {
    List<Map<String, Object>> result = new ArrayList<>();

    String sql = "SELECT * FROM get_shared_stations_for_zone_trains(?, ?)";
    try (PreparedStatement ps = connection.prepareStatement(sql)) {
        ps.setString(1, zone1);
        ps.setString(2, zone2);

        try (ResultSet rs = ps.executeQuery()) {
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(metaData.getColumnLabel(i), rs.getObject(i));
                }
                result.add(row);
            }
        }
    }

        return result;
    }
}
