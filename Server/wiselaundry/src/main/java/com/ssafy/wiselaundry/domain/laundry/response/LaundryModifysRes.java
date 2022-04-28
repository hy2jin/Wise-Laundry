package com.ssafy.wiselaundry.domain.laundry.response;

import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryModifys;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "LaundryModifysRes", description = "옷 수정 조회")
public class LaundryModifysRes extends BaseResponseBody {
    @ApiModelProperty(value = "옷 수정 조회")
    LaundryModifys list = null;

    public static LaundryModifysRes of (Integer statusCode, String message, LaundryModifys list){
        LaundryModifysRes res = new LaundryModifysRes();
        res.setList(list);
        res.setMessage(message);
        res.setStatusCode(statusCode);
        return res;
    }
}
