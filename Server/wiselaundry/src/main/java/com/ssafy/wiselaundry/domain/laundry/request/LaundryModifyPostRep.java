package com.ssafy.wiselaundry.domain.laundry.request;

import com.ssafy.wiselaundry.domain.laundry.db.entity.CareLabels;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("LaundryModifyPostRep")
public class LaundryModifyPostRep {
    @ApiModelProperty(value = "옷 Id", example = "1")
    int laundryId;

    @ApiModelProperty(name = "케어라벨")
    List<CareLabels> careLabels;

    @ApiModelProperty(name = "옷 정보")
    String[] laundryInfo;

    @ApiModelProperty(value = "옷 메모", example = "memo")
    String laundryMemo;


}
