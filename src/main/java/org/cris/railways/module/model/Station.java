package org.cris.railways.module.model;

public class Station {
    private String stationName;
    private String stnCode;
    private String oldStationCategory;
    private String newStationCategory;
    private String division;
    private String zone;
    private String district;
    private String state;

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getStnCode() {
        return stnCode;
    }

    public void setStnCode(String stnCode) {
        this.stnCode = stnCode;
    }

    public String getOldStationCategory() {
        return oldStationCategory;
    }

    public void setOldStationCategory(String oldStationCategory) {
        this.oldStationCategory = oldStationCategory;
    }

    public String getNewStationCategory() {
        return newStationCategory;
    }

    public void setNewStationCategory(String newStationCategory) {
        this.newStationCategory = newStationCategory;
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