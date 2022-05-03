package com.ssafy.wiselaundry.domain.user.response;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserInfoGetRes")
public class UserInfoGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "회원 번호", example = "486")
    int userId;

    @ApiModelProperty(name = "회원 이메일", example = "ssafy@ssafy.com")
    String userEmail;

    @ApiModelProperty(name = "회원 닉네임", example = "PrinceOfSsafy")
    String userNick;

    @ApiModelProperty(name = "회원 프로필 이미지", example = "user/exampleserverimgaddress.jpg")
    String userImg;

    @ApiModelProperty(name = "회원 카카오 프로필 이미지", example = "www.com/xampleserverimgaddress.jpg")
    String kakaoImg;


    public static UserInfoGetRes of(Integer statusCode, String message, User user) {
        UserInfoGetRes res = new UserInfoGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        // 유저정보
        res.setUserId(user.getUserId());
        res.setUserEmail(user.getUserEmail());
        res.setUserNick(user.getUserNick());
        res.setUserImg(user.getUserImg());
        res.setKakaoImg(user.getKakaoImg());
        return res;
    }
}
