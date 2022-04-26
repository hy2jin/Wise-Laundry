package com.ssafy.wiselaundry.domain.board.response;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.BoardImg;
import com.ssafy.wiselaundry.domain.board.db.entity.Comments;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@ApiModel("게시글 상세 res")
public class BoardSearchDetailRes extends BaseResponseBody {
//    @Autowired
//    CommentsService commentsService;

    @ApiModelProperty(value = "게시글 id", required = true, example = "게시글 id")
    private int boardId;

    @ApiModelProperty(value = "유저 id", required = true, example = "게시글 작성자 ID 입니다.")
    private int userId;

    @ApiModelProperty(value = "유저 닉네임", required = true, example = "게시글 작성자 닉네임입니다.")
    private String userNick;

    @ApiModelProperty(value = "유저 프로필 사진", required = true)
    private String userImg;

    @ApiModelProperty(value = "게시글 제목", required = true, example = "게시글 제목입니다.")
    private String boardName;

    @ApiModelProperty(value = "게시글 사진", required = false, example = "board_img.jpg")
    private List<BoardImg> boardImgs;

    @ApiModelProperty(value = "게시글 내용", required = true, example = "게시글 내용입니다")
    private String boardContent;

    @ApiModelProperty(value = "게시글 날짜", required = true, example = "2020-01-23 13:33:33")
    private LocalDateTime boardDt;

    @ApiModelProperty(value = "댓글 정보 리스트", required = true)
    private static List<CommentDetailRes> comments;

    @Builder
    public BoardSearchDetailRes(int boardId, int userId, String userNick, String userImg, String boardName,
                                List<BoardImg> boardImgs, String boardContent, LocalDateTime boardDt,
                                List<CommentDetailRes> comments) {
        this.boardId = boardId;
        this.userId = userId;
        this.userNick = userNick;
        this.userImg = userImg;
        this.boardName = boardName;
        this.boardImgs = boardImgs;
        this.boardContent = boardContent;
        this.boardDt = boardDt;
        this.comments = comments;
    }

    public static BoardSearchDetailRes of(Board board){

        return BoardSearchDetailRes.builder()
                .userId(board.getUser().getUserId())
                .userNick(board.getUser().getUserNick())
                .boardId(board.getBoardId())
                .boardName(board.getBoardName())
                .boardImgs(board.getBoardImgs())
                .boardContent(board.getBoardContent())
                .boardDt(board.getBoardDt())
                .comments(comments)
                .build();
    }
}
