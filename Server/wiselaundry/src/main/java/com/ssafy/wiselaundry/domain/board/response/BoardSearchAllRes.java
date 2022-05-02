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

    @ApiModelProperty(value = "유저 이미지", required = true, example = "")
    private String userImg;

    @ApiModelProperty(value = "kakao 이미지", required = true, example = "")
    private String kakaoImg;

    @ApiModelProperty(value = "게시글 ID", required = true, example = "게시글 ID")
    private int boardId;

    @ApiModelProperty(value = "게시글 제목", required = true, example = "게시글 제목입니다.")
    private String boardName;

    @ApiModelProperty(value = "게시글 날짜", required = true, example = "2020-01-23 13:33:33")
    private LocalDateTime boardDate;

    @ApiModelProperty(value = "댓글 갯수", required = true, example = "3")
    private int commentCnt;

    @Builder
    public BoardSearchAllRes(int userId, String userNick, int boardId, String boardName, LocalDateTime boardDate, String userImg, int commentCnt, String kakaoImg, String message, Integer statusCode) {
        this.userId = userId;
        this.userNick = userNick;
        this.userImg = userImg;
        this.boardId =  boardId;
        this.boardName = boardName;
        this.boardDate = boardDate;
        this.commentCnt = commentCnt;
        this.kakaoImg = kakaoImg;
    }

    public static BoardSearchAllRes boardToBoardSearchAllRes(Board board){

        return BoardSearchAllRes.builder()
                .userId(board.getUser().getUserId())
                .userNick(board.getUser().getUserNick())
                .userImg(board.getUser().getUserImg())
                .kakaoImg(board.getUser().getKakaoImg())
                .boardId(board.getBoardId())
                .boardName(board.getBoardName())
                .boardDate(board.getBoardDate())
                .commentCnt(board.getComments().size())
                .build();
    }
}
