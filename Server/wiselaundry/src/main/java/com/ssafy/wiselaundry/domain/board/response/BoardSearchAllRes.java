package com.ssafy.wiselaundry.domain.board.response;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@ApiModel("모든 게시판 res")
public class BoardSearchAllRes extends BaseResponseBody {
    @ApiModelProperty(value = "유저 ID", required = true, example = "122333")
    private int userId;

    @ApiModelProperty(value = "유저 닉네임", required = true, example = "게시글 작성자 닉네임입니다.")
    private String userNick;

    @ApiModelProperty(value = "게시글 제목", required = true, example = "게시글 제목입니다.")
    private String boardName;

    @ApiModelProperty(value = "게시글 사진", required = false, example = "board_img.jpg")
    private String boardImg;

    @ApiModelProperty(value = "게시글 내용", required = true, example = "게시글 내용입니다")
    private String boardContent;

    @ApiModelProperty(value = "게시글 날짜", required = true, example = "2020-01-23 13:33:33")
    private Date boardDt;

    @Builder
    public BoardSearchAllRes(int userId, String userNick, String boardName, String boardImg, String boardContent, Date boardDt) {
        this.userId = userId;
        this.userNick = userNick;
        this.boardName = boardName;
        this.boardImg = boardImg;
        this.boardContent = boardContent;
        this.boardDt = boardDt;
    }

    public BoardSearchAllRes of(Board board){
        return BoardSearchAllRes.builder()
                .userId(board.getUser().getUserId())
                .userNick(board.getUser().getUserNick())
                .boardName(board.getBoardName())
                .boardImg(board.getBoardImg())
                .boardContent(board.getBoardContent())
                .boardDt(board.getBoardDt())
                .build();
    }

}
