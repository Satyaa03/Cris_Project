package org.cris.railways.module.model;

public class Zone {
    private String railway_zone;
    private String code;
    private String headquarters;
    private String railway_divisions;

    public String getRailwayZone() {
        return railway_zone;
    }

    public void setRailwayZone(String railway_zone) {
        this.railway_zone = railway_zone;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getHeadquarters() {
        return headquarters;
    }

    public void setHeadquarters(String headquarters) {
        this.headquarters = headquarters;
    }

    public String getRailwayDivisions() {
        return railway_divisions;
    }

    public void setRailwayDivisions(String railway_divisions) {
        this.railway_divisions = railway_divisions;
    }
}

