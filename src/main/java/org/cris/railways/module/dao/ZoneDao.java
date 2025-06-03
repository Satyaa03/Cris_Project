package org.cris.railways.module.dao;

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
        String query = "INSERT INTO zones (railwayZone, code, headquarters, railwayDivisions) VALUES (?, ?, ?, ?)";
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
                zone.setRailwayZone(rs.getString("railwayZone"));
                zone.setCode(rs.getString("code"));
                zone.setHeadquarters(rs.getString("headquarters"));
                zone.setRailwayDivisions(rs.getString("railwayDivisions"));
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
                zone.setRailwayZone(rs.getString("railwayZone"));
                zone.setCode(rs.getString("code"));
                zone.setHeadquarters(rs.getString("headquarters"));
                zone.setRailwayDivisions(rs.getString("railwayDivisions"));
                zones.add(zone);
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving all zones: " + e.getMessage());
        }
        return zones;
    }

    // Update
    public void updateZone(Zone zone) {
        String query = "UPDATE zones SET railwayZone=?, headquarters=?, railwayDivisions=? WHERE code=?";
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
}
