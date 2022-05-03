package com.ssafy.wiselaundry.domain.board.response;

import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel(value = "BoardSearchAllListRes", description = "모든 게시판 조회")
public class BoardSearchKeywordListRes extends BaseResponseBody {
    @ApiModelProperty(value = "list 형태로 반환")
    List<BoardSearchAllRes> list;


    public static BoardSearchKeywordListRes of(Integer statusCode, String message, List<BoardSearchAllRes> list){
        BoardSearchKeywordListRes res = new BoardSearchKeywordListRes();
        res.setMessage(message);
        res.setStatusCode(statusCode);
        res.list = list;
        return res;
    }
}
