package com.ssafy.wiselaundry.domain.user.response;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserResponse")
public class UserFindEmail {
    @ApiModelProperty(name = "회원 Name", example = "김싸피")
    String userEmail;
    @ApiModelProperty(name = "회원 ID", example = "1")
    int userId;
    @ApiModelProperty(name = "회원 TourId", example = "1")
    int tourTestId;

    public static UserFindEmail of(User user){
        UserFindEmail res = new UserFindEmail();
        res.setUserEmail(user.getUserEmail());
        res.setUserId(user.getUserId());
        return res;
    }
}
