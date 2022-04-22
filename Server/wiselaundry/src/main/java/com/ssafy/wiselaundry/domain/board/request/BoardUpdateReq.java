package com.ssafy.wiselaundry.domain.board.request;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class BoardUpdateReq {
    @ApiModelProperty(value = "게시판 ID", required = true, example = "123123123123")
    private int boardId;

    @ApiModelProperty(value = "게시판 ID", required = true)
    private String boardName;

    @ApiModelProperty(value = "게시판 이미지")
    private String boardImg;

    @ApiModelProperty(value = "게시판 내용")
    private String boardContent;

    public Board toEntity(BoardUpdateReq body) {
        return Board.builder()
                .boardId(body.getBoardId())
                .boardName(body.getBoardName())
                .boardContent(body.getBoardContent())
                .boardImg(body.getBoardImg())
                .build();
    }
}
