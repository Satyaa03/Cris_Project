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
        String query = "INSERT INTO trains (train_no, train_name, sequence, station_code, station_name, arrival_time, departure_time, distance_kms, source_station, source_station_name, destination_station, destination_station_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
    public Train getTrain(String train_no, int sequence) {
    String query = "SELECT * FROM trains WHERE train_no = ? AND sequence = ?";
    try (PreparedStatement stmt = connection.prepareStatement(query)) {
        stmt.setString(1, train_no);
        stmt.setInt(2, sequence);
        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            Train train = new Train();
            train.setTrainNo(rs.getString("train_no"));
            train.setTrainName(rs.getString("train_name"));
            train.setSequence(rs.getInt("sequence"));
            train.setStationCode(rs.getString("station_code"));
            train.setStationName(rs.getString("station_name"));
            train.setArrivalTime(rs.getString("arrival_time"));
            train.setDepartureTime(rs.getString("departure_time"));
            train.setDistanceKms(rs.getDouble("distance_kms"));
            train.setSourceStation(rs.getString("source_station"));
            train.setSourceStationName(rs.getString("source_station_name"));
            train.setDestinationStation(rs.getString("destination_station"));
            train.setDestinationStationName(rs.getString("destination_station_name"));
            return train;
        }
    } catch (SQLException e) {
        System.err.println("Error retrieving train: " + e.getMessage());
    }
    return null;
}

    // Read All
    public List<Train> getAllTrains() {
        List<Train> trains = new ArrayList<>();
        String query = "SELECT * FROM trains";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                Train train = new Train();
                train.setTrainNo(rs.getString("train_no"));
                train.setTrainName(rs.getString("train_name"));
                train.setSequence(rs.getInt("sequence"));
                train.setStationCode(rs.getString("station_code"));
                train.setStationName(rs.getString("station_name"));
                train.setArrivalTime(rs.getString("arrival_time"));
                train.setDepartureTime(rs.getString("departure_time"));
                train.setDistanceKms(rs.getDouble("distance_kms"));
                train.setSourceStation(rs.getString("source_station"));
                train.setSourceStationName(rs.getString("source_station_name"));
                train.setDestinationStation(rs.getString("destination_station"));
                train.setDestinationStationName(rs.getString("destination_station_name"));
                trains.add(train);
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving all trains: " + e.getMessage());
        }
        return trains;
    }

    // Update
    public void updateTrain(Train train) {
        String query = "UPDATE trains SET train_name=?, sequence=?, station_code=?, station_name=?, arrival_time=?, departure_time=?, distance_kms=?, source_station=?, source_station_name=?, destination_station=?, destination_station_name=? WHERE train_no=?";
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
    public void deleteTrain(String train_no) {
        String query = "DELETE FROM trains WHERE train_no = ?";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, train_no);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error deleting train: " + e.getMessage());
        }
    }

    //Read by Train Number
    public List<Train> getTrainsByTrainNo(String trainNo) {
        List<Train> trains = new ArrayList<>();
        String query = "SELECT * FROM trains WHERE train_no = coalesce( ? , train_no) ORDER BY sequence";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
        stmt.setString(1, trainNo);
        ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Train train = new Train();
                train.setTrainNo(rs.getString("train_no"));
                train.setTrainName(rs.getString("train_name"));
                train.setSequence(rs.getInt("sequence"));
                train.setStationCode(rs.getString("station_code"));
                train.setStationName(rs.getString("station_name"));
                train.setArrivalTime(rs.getString("arrival_time"));
                train.setDepartureTime(rs.getString("departure_time"));
                train.setDistanceKms(rs.getDouble("distance_kms"));
                train.setSourceStation(rs.getString("source_station"));
                train.setSourceStationName(rs.getString("source_station_name"));
                train.setDestinationStation(rs.getString("destination_station"));
                train.setDestinationStationName(rs.getString("destination_station_name"));
                trains.add(train);
            }
        } catch (SQLException e) {
        System.err.println("Error fetching trains by train_no: " + e.getMessage());
        }
        return trains;
    }

    public List<Map<String, Object>> getTrainTimelineThroughZone(String code, String trainNo) throws SQLException {
    String sql = "SELECT * FROM get_train_timeline_through_zone(?, ?)";
    List<Map<String, Object>> resultList = new ArrayList<>();

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
        stmt.setString(1, code);
        stmt.setString(2, trainNo);

        try (ResultSet rs = stmt.executeQuery()) {
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(metaData.getColumnLabel(i), rs.getObject(i));
                }
                resultList.add(row);
            }
        }
    }

    return resultList;
}

    public List<Train> findInterZoneTrains(String zoneFrom, String zoneTo) throws SQLException {
        String sql = "SELECT * FROM get_trains_by_zones(?, ?)";

        List<Train> trains = new ArrayList<>();

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, zoneFrom);
            stmt.setString(2, zoneTo);
        try (ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Train train = new Train();
                train.setTrainNo(rs.getString("train_no"));
                train.setTrainName(rs.getString("train_name"));
                trains.add(train);
            }
        }
    }

    return trains;
    }  

}

