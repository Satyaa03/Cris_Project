package org.cris.railways.module.model;

public class Train {
    private String train_no;
    private String train_name;
    private int sequence;
    private String station_code;
    private String station_name;
    private String arrival_time;
    private String departure_time;
    private double distance_kms;
    private String source_station;
    private String source_station_name;
    private String destination_station;
    private String destination_station_name;

    public String getTrainNo() {
        return train_no;
    }

    public void setTrainNo(String train_no) {
        this.train_no = train_no;
    }

    public String getTrainName() {
        return train_name;
    }

    public void setTrainName(String train_name) {
        this.train_name = train_name;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public String getStationCode() {
        return station_code;
    }

    public void setStationCode(String station_code) {
        this.station_code = station_code;
    }

    public String getStationName() {
        return station_name;
    }

    public void setStationName(String station_name) {
        this.station_name = station_name;
    }

    public String getArrivalTime() {
        return arrival_time;
    }

    public void setArrivalTime(String arrival_time) {
        this.arrival_time = arrival_time;
    }

    public String getDepartureTime() {
        return departure_time;
    }

    public void setDepartureTime(String departure_time) {
        this.departure_time = departure_time;
    }

    public double getDistanceKms() {
        return distance_kms;
    }

    public void setDistanceKms(double distance_kms) {
        this.distance_kms = distance_kms;
    }

    public String getSourceStation() {
        return source_station;
    }

    public void setSourceStation(String source_station) {
        this.source_station = source_station;
    }

    public String getSourceStationName() {
        return source_station_name;
    }

    public void setSourceStationName(String source_station_name) {
        this.source_station_name = source_station_name;
    }

    public String getDestinationStation() {
        return destination_station;
    }

    public void setDestinationStation(String destination_station) {
        this.destination_station = destination_station;
    }

    public String getDestinationStationName() {
        return destination_station_name;
    }

    public void setDestinationStationName(String destination_station_name) {
        this.destination_station_name = destination_station_name;
    }
}
