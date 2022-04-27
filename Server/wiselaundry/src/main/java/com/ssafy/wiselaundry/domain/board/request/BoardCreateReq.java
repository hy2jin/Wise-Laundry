package com.ssafy.wiselaundry.domain.board.request;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class BoardCreateReq {
    @ApiModelProperty(value = "유저 ID", required = true, example = "유저 ID")
    private int userId;

    @ApiModelProperty(value = "유저 ID", required = true, example = "유저 ID")
    private int boardId;

    @ApiModelProperty(value = "게시글 제목", required = true, example = "게시글 제목")
    private String boardName;

    @ApiModelProperty(value = "게시글 내용", required = true, example = "게시글 내용")
    private String boardContent;

    public Board toEntity(BoardCreateReq body, User user) {
        return Board.builder()
                .user(user)
                .boardName(body.getBoardName())
                .boardContent(body.getBoardContent())
                .build();
    }
}
