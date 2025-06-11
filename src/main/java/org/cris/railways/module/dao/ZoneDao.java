package org.cris.railways.module.dao;

import org.cris.railways.module.model.Train;
import org.cris.railways.module.model.Zone;
import java.sql.*;
import java.util.*;

public class ZoneDao {
    private Connection connection;

    public ZoneDao(Connection connection) {
        this.connection = connection;
    }

    // Create
    public void addZone(Zone zone) {
        String query = "INSERT INTO zones (railway_zone, code, headquarters, railway_divisions) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, zone.getRailwayZone());
            stmt.setString(2, zone.getCode());
            stmt.setString(3, zone.getHeadquarters());
            stmt.setString(4, zone.getRailwayDivisions());
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error adding zone: " + e.getMessage());
        }
    }

    // Read
    public Zone getZone(String code) {
        String query = "SELECT * FROM zones WHERE code = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, code);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Zone zone = new Zone();
                zone.setRailwayZone(rs.getString("railway_zone"));
                zone.setCode(rs.getString("code"));
                zone.setHeadquarters(rs.getString("headquarters"));
                zone.setRailwayDivisions(rs.getString("railway_divisions"));
                return zone;
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving zone: " + e.getMessage());
        }
        return null; // Return null if no zone found
    }

    // Read All
    public List<Zone> getAllZones() {
        List<Zone> zones = new ArrayList<>();
        String query = "SELECT * FROM zones";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                Zone zone = new Zone();
                zone.setRailwayZone(rs.getString("railway_zone"));
                zone.setCode(rs.getString("code"));
                zone.setHeadquarters(rs.getString("headquarters"));
                zone.setRailwayDivisions(rs.getString("railway_divisions"));
                zones.add(zone);
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving all zones: " + e.getMessage());
        }
        return zones;
    }

    // Update
    public void updateZone(Zone zone) {
        String query = "UPDATE zones SET railway_zone=?, headquarters=?, railway_divisions=? WHERE code=?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, zone.getRailwayZone());
            stmt.setString(2, zone.getHeadquarters());
            stmt.setString(3, zone.getRailwayDivisions());
            stmt.setString(4, zone.getCode());
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error updating zone: " + e.getMessage());
        }
    }

    // Delete
    public void deleteZone(String code) {
        String query = "DELETE FROM zones WHERE code = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, code);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error deleting zone: " + e.getMessage());
        }
    }

    

    public double findAvgDistanceBetweenZones(String zoneFrom, String zoneTo) throws SQLException {
    String sql = "SELECT avg_distance_between_zones(?, ?)";
    double avgDistance = 0.0;

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
        stmt.setString(1, zoneFrom);
        stmt.setString(2, zoneTo);

        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                avgDistance = rs.getDouble(1); // Since this returns a single scalar value
            }
        }
    }

    return avgDistance;
    }

        public List<Map<String, Object>> getTrainZoneHops(String trainNo) throws SQLException {
        String query = "SELECT * FROM train_zone_hops(?)";
        List<Map<String, Object>> resultList = new ArrayList<>();

        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, trainNo);
            try (ResultSet rs = stmt.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                int colCount = meta.getColumnCount();
                while (rs.next()) {
                    Map<String, Object> row = new HashMap<>();
                    for (int i = 1; i <= colCount; i++) {
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
                    }
                    resultList.add(row);
                }
            }
        }

        return resultList;
    }

        public List<Map<String, Object>> getZoneOverview(String zoneCode) throws SQLException {
        String query = "SELECT * FROM zone_overview(?)";
        List<Map<String, Object>> resultList = new ArrayList<>();

        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, zoneCode);
            try (ResultSet rs = stmt.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                int colCount = meta.getColumnCount();
                while (rs.next()) {
                    Map<String, Object> row = new HashMap<>();
                    for (int i = 1; i <= colCount; i++) {
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
                    }
                    resultList.add(row);
                }
            }
        }

        return resultList;
    }

}
