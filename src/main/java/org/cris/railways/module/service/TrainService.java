package org.cris.railways.module.service;

import org.cris.railways.module.dao.TrainDao;
import org.cris.railways.module.model.Train;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.List;

@Service
public class TrainService {

    private final TrainDao trainDao;

    @Autowired
    public TrainService(DataSource dataSource) throws SQLException {
        // Initialize TrainDao with a DB connection
        this.trainDao = new TrainDao(dataSource.getConnection());
    }

    public void addTrain(Train train) throws SQLException {
        trainDao.addTrain(train);
    }

    public Train getTrainById(String trainNo, int sequence) throws SQLException {
    return trainDao.getTrain(trainNo, sequence);
    }

    public List<Train> getAllTrains() throws SQLException {
        return trainDao.getAllTrains();
    }

    public void updateTrain(Train train) throws SQLException {
        trainDao.updateTrain(train);
    }

    public void deleteTrainById(String trainNo) throws SQLException {
        trainDao.deleteTrain(trainNo);
    }

    public List<Train> getTrainsByTrainNo(String trainNo) throws SQLException {
    return trainDao.getTrainsByTrainNo(trainNo);
    }

}
