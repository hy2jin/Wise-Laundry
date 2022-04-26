package com.ssafy.wiselaundry.domain.user.service;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.db.repository.UserRepository;
import com.ssafy.wiselaundry.domain.user.db.repository.UserRepositorySpp;
import com.ssafy.wiselaundry.domain.user.request.UserRegisterPostReq;
import com.ssafy.wiselaundry.domain.user.request.UserUpdatePostReq;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.UUID;


@Service("userService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRepositorySpp userRepositorySpp;

    @Lazy
    @Autowired
    PasswordEncoder passwordEncoder;

    @Value("${app.fileupload.uploadDir}")
    private String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    private String uploadPath;

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
    public User updateUser(UserUpdatePostReq userUpdateInfo, MultipartHttpServletRequest img){
        //변경할 유저 가져옴
        User user = userRepository.findByUserEmail(userUpdateInfo.getUserEmail());
        if(user==null){
            return null;
        }else{
            user.setUserNick(userUpdateInfo.getUserNick());
            if(!userUpdateInfo.getPassword().equals("")){
                user.setPassword(passwordEncoder.encode(userUpdateInfo.getPassword()));
            }
            //profile 수정만 추가.....
            if(img!=null){
                MultipartFile file = img.getFile("file");
                File uploadDir = new File(uploadPath + File.separator + uploadFolder + "/user");

                if(!uploadDir.exists()) uploadDir.mkdir();
                String recordFileUrl = "";
                String fileName = file.getOriginalFilename();

                UUID uuid = UUID.randomUUID();

                String extension = FilenameUtils.getExtension(fileName);

                String savingFileName = uuid+ "."+extension;

                File destFile = new File(uploadPath + File.separator, uploadFolder + File.separator + "/user/" + savingFileName);


                try {
                    file.transferTo(destFile);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                recordFileUrl = "user/" + uploadFolder + "/" + savingFileName;
                user.setUserImg(recordFileUrl);
            }

            userRepository.flush();
            return user;
        }

    }

    @Override
    public User findByUserId(int userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public User findByUserEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }

    @Override
    public boolean emailCheck(String userEmail) {
        return userRepository.findByUserEmail(userEmail)==null? true:false;
    }

    @Override
    public boolean nickCheck(String userNick) {
        return userRepository.findByUserNick(userNick)==null? true:false;
    }
}
