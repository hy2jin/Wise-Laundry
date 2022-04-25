package com.ssafy.wiselaundry.domain.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ApiModel("UserProfilePostReq")
public class UserProfilePostReq {
    @ApiModelProperty(name = "회원이미지", example = "jpg, png")
    MultipartFile profileImg;

}
