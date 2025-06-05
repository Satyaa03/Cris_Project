package org.cris.railways.module.model;

public class Station {
    private String station_name;
    private String stn_code;
    private String old_station_category;
    private String new_station_category;
    private String division;
    private String zone;
    private String district;
    private String state;

    public String getStationName() {
        return station_name;
    }

    public void setStationName(String station_name) {
        this.station_name = station_name;
    }

    public String getStnCode() {
        return stn_code;
    }

    public void setStnCode(String stn_code) {
        this.stn_code = stn_code;
    }

    public String getOldStationCategory() {
        return old_station_category;
    }

    public void setOldStationCategory(String old_station_category) {
        this.old_station_category = old_station_category;
    }

    public String getNewStationCategory() {
        return new_station_category;
    }

    public void setNewStationCategory(String new_station_category) {
        this.new_station_category = new_station_category;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}