package com.ssafy.wiselaundry.domain.laundry.response;

import com.ssafy.wiselaundry.domain.laundry.db.bean.LaundryDetails;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "LaundryDetailsRes", description = "옷 상세 조회")
public class LaundryDetailsRes extends BaseResponseBody {
    @ApiModelProperty(value = "옷 상세 조회")
    LaundryDetails list = null;

    public static LaundryDetailsRes of (Integer statusCode, String message, LaundryDetails list){
        LaundryDetailsRes res = new LaundryDetailsRes();
        res.setList(list);
        res.setMessage(message);
        res.setStatusCode(statusCode);
        return res;
    }
}
