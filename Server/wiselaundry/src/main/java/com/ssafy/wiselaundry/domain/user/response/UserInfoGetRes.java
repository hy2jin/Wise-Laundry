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


    @ApiModelProperty(name = "회원 이메일", example = "ssafy@ssafy.com")
    String userEmail;
    @ApiModelProperty(name = "회원 닉네임", example = "PrinceOfSsafy")
    String userNick;
    @ApiModelProperty(name = "회원 프로필 이미지", example = "user/exampleserverimgaddress.jpg")
    String userImg;

    public static UserInfoGetRes of(Integer statusCode, String message, User user) {
        UserInfoGetRes res = new UserInfoGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserEmail(user.getUserEmail());
        res.setUserNick(user.getUserNick());
        res.setUserImg(user.getUserImg());
        return res;
    }
}
