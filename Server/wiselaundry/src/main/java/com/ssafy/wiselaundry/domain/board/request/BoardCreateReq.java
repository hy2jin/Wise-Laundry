package com.ssafy.wiselaundry.domain.board.request;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.BoardImg;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardCreateReq {
    @ApiModelProperty(value = "유저 ID", required = true, example = "유저 ID")
    private int userId;

    @ApiModelProperty(value = "게시글 제목", required = true, example = "게시글 제목")
    private String boardName;

    @ApiModelProperty(value = "게시글 이미지", required = true)
    private List<String> boardImgs;

    @ApiModelProperty(value = "게시글 내용", required = true, example = "게시글 내용")
    private String boardContent;

    public Board toEntity(BoardCreateReq body, User user, List<BoardImg> boardImgs) {
        return Board.builder()
                .user(user)
                .boardName(body.getBoardName())
                .boardImgs(boardImgs)
                .boardContent(body.getBoardContent())
                .build();
    }

}
