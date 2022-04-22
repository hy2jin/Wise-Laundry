package com.ssafy.wiselaundry.domain.board.response;

import com.ssafy.wiselaundry.domain.board.db.entity.Comments;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@ApiModel("댓글 res")
public class CommentDetailRes extends BaseResponseBody {
    @ApiModelProperty(value = "유저 아이디", required = true, example = "pse1234")
    private int userId;

    @ApiModelProperty(value = "유저 이미지", required = true )
    private String userImg;

    @ApiModelProperty(value = "유저 닉네임", required = true, example = "댓글 작성자 닉네임입니다.")
    private String userNick;

    @ApiModelProperty(value = "댓글 아이디", required = true, example = "123")
    private int commentId;

    @ApiModelProperty(value = "댓글 내용", required = true, example = "댓글 내용입니다.")
    private String commentContent;

    @ApiModelProperty(value = "댓글 등록 날짜", required = true)
    private LocalDateTime commentDt;

    @Builder
    public CommentDetailRes(int userId, String userImg, String userNick, int commentId, String commentContent, LocalDateTime commentDt){
        this.userId = userId;
        this.userImg = userImg;
        this.userNick = userNick;
        this.commentId = commentId;
        this.commentContent = commentContent;
        this.commentDt = commentDt;
    }

    public CommentDetailRes of(Comments comments){
        return CommentDetailRes.builder()
                .userId(comments.getUser().getUserId())
                .userImg(comments.getUser().getUserImg())
                .userNick(comments.getUser().getUserNick())
                .commentContent(comments.getCommentContent())
                .commentDt(comments.getCommentDt())
                .commentId(comments.getCommentId())
                .build();
    }
}
