package com.ssafy.wiselaundry.domain.user.service;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.db.repository.UserRepository;
import com.ssafy.wiselaundry.domain.user.db.repository.UserRepositorySpp;
import com.ssafy.wiselaundry.domain.user.request.UserRegisterPostReq;
import com.ssafy.wiselaundry.domain.user.request.UserUpdatePostReq;
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
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        if(userRepository.findByUserEmail(userRegisterInfo.getUserEmail())==null){
            user.setUserEmail((userRegisterInfo.getUserEmail()));
            user.setUserNick((userRegisterInfo.getUserNick()));
            user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
            return userRepository.save(user);
        }else {
            return null;
        }
    }

    @Override
    public User updateUser(UserUpdatePostReq userUpdateInfo){
        User user = userRepository.findByUserEmail(userUpdateInfo.getUserEmail());
        if(user==null){
            return null;
        }else{
            user.setUserNick(userUpdateInfo.getUserNick());
            if(!userUpdateInfo.getPassword().equals("")){
                user.setPassword(userUpdateInfo.getPassword());
            }
            //profile 수정만 추가.....
            userRepository.flush();
            return user;
        }

    }

    @Override
    public User findByUserId(int userId) {
        return userRepository.findByUserId(userId);
    }
}
