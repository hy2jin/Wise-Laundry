package com.ssafy.wiselaundry.domain.user.request;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 정보수정 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserUpdatePostReq")
public class UserUpdatePostReq{
    @ApiModelProperty(name = "회원 이메일", example = "ssafy@ssafy.com")
    String userEmail;
    @ApiModelProperty(name = "회원 Nickname", example = "James")
    String userNick;
    @ApiModelProperty(name = "회원 Img", example = "new_profile_img.jpg")
    String userImg;
    @ApiModelProperty(name = "회원 Password", example = "1234")
    String password;

    public User toEntity(UserRegisterPostReq body){
        return User.builder()
                .userEmail(body.getUserEmail())
                .userNick(body.getUserNick())
                .password(body.getPassword())
                .build();
    }
}
