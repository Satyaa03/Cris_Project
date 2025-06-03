package org.cris.railways.module.dao;

import org.cris.railways.module.model.Train;
import java.sql.*;
import java.util.*;

public class TrainDao {
    private Connection connection;

    public TrainDao(Connection connection) {
        this.connection = connection;
    }

    // Create
    public void addTrain(Train train) {
        String query = "INSERT INTO trains (trainNo, trainName, sequence, stationCode, stationName, arrivalTime, departureTime, distanceKms, sourceStation, sourceStationName, destinationStation, destinationStationName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, train.getTrainNo());
            stmt.setString(2, train.getTrainName());
            stmt.setInt(3, train.getSequence());
            stmt.setString(4, train.getStationCode());
            stmt.setString(5, train.getStationName());
            stmt.setString(6, train.getArrivalTime());
            stmt.setString(7, train.getDepartureTime());
            stmt.setDouble(8, train.getDistanceKms());
            stmt.setString(9, train.getSourceStation());
            stmt.setString(10, train.getSourceStationName());
            stmt.setString(11, train.getDestinationStation());
            stmt.setString(12, train.getDestinationStationName());
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error adding train: " + e.getMessage());
        }
    }

    // Read
    public Train getTrain(String trainNo) {
        String query = "SELECT * FROM trains WHERE trainNo = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, trainNo);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Train train = new Train();
                train.setTrainNo(rs.getString("trainNo"));
                train.setTrainName(rs.getString("trainName"));
                train.setSequence(rs.getInt("sequence"));
                train.setStationCode(rs.getString("stationCode"));
                train.setStationName(rs.getString("stationName"));
                train.setArrivalTime(rs.getString("arrivalTime"));
                train.setDepartureTime(rs.getString("departureTime"));
                train.setDistanceKms(rs.getDouble("distanceKms"));
                train.setSourceStation(rs.getString("sourceStation"));
                train.setSourceStationName(rs.getString("sourceStationName"));
                train.setDestinationStation(rs.getString("destinationStation"));
                train.setDestinationStationName(rs.getString("destinationStationName"));
                return train;
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving train: " + e.getMessage());
        }
        return null; // Return null if no train found
    }

    // Read All
    public List<Train> getAllTrains() {
        List<Train> trains = new ArrayList<>();
        String query = "SELECT * FROM trains";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                Train train = new Train();
                train.setTrainNo(rs.getString("trainNo"));
                train.setTrainName(rs.getString("trainName"));
                train.setSequence(rs.getInt("sequence"));
                train.setStationCode(rs.getString("stationCode"));
                train.setStationName(rs.getString("stationName"));
                train.setArrivalTime(rs.getString("arrivalTime"));
                train.setDepartureTime(rs.getString("departureTime"));
                train.setDistanceKms(rs.getDouble("distanceKms"));
                train.setSourceStation(rs.getString("sourceStation"));
                train.setSourceStationName(rs.getString("sourceStationName"));
                train.setDestinationStation(rs.getString("destinationStation"));
                train.setDestinationStationName(rs.getString("destinationStationName"));
                trains.add(train);
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving all trains: " + e.getMessage());
        }
        return trains;
    }

    // Update
    public void updateTrain(Train train) {
        String query = "UPDATE trains SET trainName=?, sequence=?, stationCode=?, stationName=?, arrivalTime=?, departureTime=?, distanceKms=?, sourceStation=?, sourceStationName=?, destinationStation=?, destinationStationName=? WHERE trainNo=?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, train.getTrainName());
            stmt.setInt(2, train.getSequence());
            stmt.setString(3, train.getStationCode());
            stmt.setString(4, train.getStationName());
            stmt.setString(5, train.getArrivalTime());
            stmt.setString(6, train.getDepartureTime());
            stmt.setDouble(7, train.getDistanceKms());
            stmt.setString(8, train.getSourceStation());
            stmt.setString(9, train.getSourceStationName());
            stmt.setString(10, train.getDestinationStation());
            stmt.setString(11, train.getDestinationStationName());
            stmt.setString(12, train.getTrainNo());
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error updating train: " + e.getMessage());
        }
    }

    // Delete
    public void deleteTrain(String trainNo) {
        String query = "DELETE FROM trains WHERE trainNo = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, trainNo);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error deleting train: " + e.getMessage());
        }
    }
}

