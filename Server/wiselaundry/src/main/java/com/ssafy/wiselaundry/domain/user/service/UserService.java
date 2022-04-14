package com.ssafy.wiselaundry.domain.user.service; //비즈니스 로직 처리를 위한 서비스


import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.request.UserRegisterPostReq;


/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User findByEmail(String userEmail);
	User createUser(UserRegisterPostReq userRegisterInfo);
}
