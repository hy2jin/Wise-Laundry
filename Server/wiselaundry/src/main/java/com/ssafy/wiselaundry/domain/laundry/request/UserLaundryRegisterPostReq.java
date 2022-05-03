package com.ssafy.wiselaundry.domain.laundry.request;

import com.ssafy.wiselaundry.domain.laundry.db.entity.CareLabels;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@ApiModel("UserLaundryRegisterPostReq")
public class UserLaundryRegisterPostReq {
    @ApiModelProperty(name = "회원번호", example = "1")
    int userId;

    @ApiModelProperty(name = "케어라벨")
    List<CareLabels> careLabels;

    @ApiModelProperty(name = "옷 정보")
    String[] laundryInfo;

    @ApiModelProperty(value = "옷 메모", example = "memo")
    String laundryMemo;


}
