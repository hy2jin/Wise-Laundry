package com.ssafy.wiselaundry.domain.user.request;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONObject;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostReq")
public class UserRegisterPostReq {
	@ApiModelProperty(name = "회원 이메일", example = "ssafy@ssafy.com")
	String userEmail;

	@ApiModelProperty(name = "회원 비밀번호", example = "1234")
	String password;

	@ApiModelProperty(name = "회원 닉네임", example = "김싸피")
	String userNick;


	public User toEntity(UserRegisterPostReq body){
		return User.builder()
				.userEmail(body.getUserEmail())
				.userNick(body.getUserNick())
				.password(body.getPassword())
				.build();
	}

	public JSONObject toJson(){
		JSONObject ret = new JSONObject();
		ret.put("userEmail",this.userEmail);
		ret.put("password",this.password);
		ret.put("userNick",this.userNick);
		return ret;
	}
}
