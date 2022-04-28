package com.ssafy.wiselaundry.domain.board.request;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.BoardImg;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardUpdateReq {
    @ApiModelProperty(value = "게시판 ID", required = true)
    private int boardId;

    @ApiModelProperty(value = "게시판 이름", required = true)
    private String boardName;

    @ApiModelProperty(value = "삭제할 이미지")
    private List<String> deleteImgs;

    @ApiModelProperty(value = "게시판 내용", required = true)
    private String boardContent;

    public Board toEntity(BoardUpdateReq body, List<BoardImg> boardImgs) {

        return Board.builder()
                .boardId(body.getBoardId())
                .boardName(body.getBoardName())
                .boardContent(body.getBoardContent())
                .boardImgs(boardImgs)
                .build();
    }
}
