package com.ssafy.wiselaundry.domain.user.service; //비즈니스 로직 처리를 위한 서비스


import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.request.UserRegisterPostReq;
import com.ssafy.wiselaundry.domain.user.request.UserUpdatePostReq;


/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User updateUser(UserUpdatePostReq userUpdatePostReq);
	User findByUserId(int userId);
}
