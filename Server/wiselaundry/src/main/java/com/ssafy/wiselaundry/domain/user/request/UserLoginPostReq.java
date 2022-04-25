package com.ssafy.wiselaundry.domain.user.request;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLoginPostReq")
public class UserLoginPostReq {
    @ApiModelProperty(name = "회원 Email", example = "ssafy@ssafy.com")
    String userEmail;
    @ApiModelProperty(name = "회원 Password", example = "1234")
    String userPassword;

}
