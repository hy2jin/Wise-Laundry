package com.ssafy.wiselaundry.domain.user.service;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.db.repository.UserRepository;
import com.ssafy.wiselaundry.domain.user.db.repository.UserRepositorySpp;
import com.ssafy.wiselaundry.domain.user.request.UserRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service("userService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRepositorySpp userRepositorySpp;

    @Lazy
    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    @Cacheable(value = "findByEmail", key="#userEmail")
    public User findByEmail(String userEmail) {
        User user = userRepositorySpp.findByEmail(userEmail);
        return user;
    }

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        if(findByEmail(userRegisterInfo.getUserEmail())==null){
            user.setUserEmail(userRegisterInfo.getUserEmail());
            user.setUserName(userRegisterInfo.getUserName());
            user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword()));
            return userRepository.save(user);
        }else {
            return null;
        }
    }

}
