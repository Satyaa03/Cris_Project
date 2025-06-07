package org.cris.railways.module.service;

import org.cris.railways.module.dao.UserDao;
import org.cris.railways.module.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    // Register new user
    public boolean registerUser(User user) {
        return userDao.saveUser(user);
    }

    // Validate user login
    public boolean authenticateUser(String username, String password) {
        return userDao.validateUser(username, password);
    }
}

