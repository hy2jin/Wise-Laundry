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

    @ApiModelProperty(name = "회원 Email", example = "ssafy@ssafy.com")
    User user;

    public static UserInfoGetRes of(Integer statusCode, String message, User user) {

        user.setPassword(null);

        UserInfoGetRes res = new UserInfoGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUser(user);
        return res;
    }
}
