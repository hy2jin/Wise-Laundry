package com.ssafy.wiselaundry.domain.board.response;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardSearchAllRes {
    @ApiModelProperty(value = "유저 ID", required = true, example = "122333")
    private int userId;

    @ApiModelProperty(value = "유저 닉네임", required = true, example = "게시글 작성자 닉네임입니다.")
    private String userNick;

    @ApiModelProperty(value = "게시글 ID", required = true, example = "게시글 ID")
    private int boardId;

    @ApiModelProperty(value = "게시글 제목", required = true, example = "게시글 제목입니다.")
    private String boardName;

    @ApiModelProperty(value = "게시글 내용", required = true, example = "게시글 내용입니다")
    private String boardContent;

    @ApiModelProperty(value = "게시글 날짜", required = true, example = "2020-01-23 13:33:33")
    private LocalDateTime boardDate;

    @Builder
    public BoardSearchAllRes(int userId, String userNick, int boardId, String boardName, String boardContent, LocalDateTime boardDate, String message, Integer statusCode) {
        this.userId = userId;
        this.userNick = userNick;
        this.boardId =  boardId;
        this.boardName = boardName;
        this.boardContent = boardContent;
        this.boardDate = boardDate;
    }

    public static BoardSearchAllRes boardToBoardSearchAllRes(Board board){
        return BoardSearchAllRes.builder()
                .userId(board.getUser().getUserId())
                .userNick(board.getUser().getUserNick())
                .boardId(board.getBoardId())
                .boardName(board.getBoardName())
                .boardContent(board.getBoardContent())
                .boardDate(board.getBoardDate())
                .build();
    }
}
