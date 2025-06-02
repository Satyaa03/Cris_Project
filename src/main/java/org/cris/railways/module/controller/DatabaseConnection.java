package org.cris.railways.module.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.cris.railways.module.model.Station;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DatabaseConnection {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/IndianRailways";
        String user = "postgres";
        String password = "crisrailways";
        PreparedStatement pstmt=null;
        ResultSet rs= null;
        String stn= null;//new Station();

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            pstmt=conn.prepareStatement("Select station_name from railwaystations where stn_code='BFJ'");
            rs=pstmt.executeQuery();
            if(rs.next()){
                stn=rs.getString("station_name");
            }
            System.out.println("Connected to PostgreSQL successfully! and Station name is "+ stn);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}