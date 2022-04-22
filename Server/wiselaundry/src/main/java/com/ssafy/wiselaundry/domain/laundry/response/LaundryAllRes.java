package com.ssafy.wiselaundry.domain.laundry.response;

import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryAll;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel(value = "UserLaundryAllRes", description = "전체 옷 조회")
public class LaundryAllRes extends BaseResponseBody {
    @ApiModelProperty(value = "옷 전체 조회")
    List<LaundryAll> list = null;

    public static LaundryAllRes of (Integer statusCode, String message, List<LaundryAll>list){
        LaundryAllRes res = new LaundryAllRes();
        res.setList(list);
        res.setMessage(message);
        res.setStatusCode(statusCode);
        return res;
    }
}
