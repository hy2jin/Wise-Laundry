package com.ssafy.wiselaundry.domain.board.request;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.BoardImg;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardUpdateReq {
    @ApiModelProperty(value = "게시판 ID", required = true, example = "123123123123")
    private int boardId;

    @ApiModelProperty(value = "게시판 ID", required = true)
    private String boardName;

    @ApiModelProperty(value = "게시판 이미지")
    private List<String> boardImgs;

    @ApiModelProperty(value = "게시판 내용")
    private String boardContent;

    /**
     * Todo
     * Req : 확인해야됨 String 으로 받아야되니까
     * Res : 객체로 보내주는게 맞음
     * 4/25 확인해야됨.
     */

    public Board toEntity(BoardUpdateReq body, List<BoardImg> boardImgs) {

        return Board.builder()
                .boardId(body.getBoardId())
                .boardName(body.getBoardName())
                .boardContent(body.getBoardContent())
                .boardImgs(boardImgs)
                .build();
    }
}
