package com.ssafy.wiselaundry.domain.laundry.response;

import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryAll;
import com.ssafy.wiselaundry.domain.laundry.db.entity.CareLabels;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel(value = "CareLabelsAllRes", description = "전체 케어라벨 조회")
public class CareLabelsAllRes extends BaseResponseBody {
    @ApiModelProperty(value = "케어라벨 전체 조회")
    List<CareLabels> list = null;

    public static CareLabelsAllRes of (Integer statusCode, String message, List<CareLabels>list){
        CareLabelsAllRes res = new CareLabelsAllRes();
        res.setList(list);
        res.setMessage(message);
        res.setStatusCode(statusCode);
        return res;
    }
}
