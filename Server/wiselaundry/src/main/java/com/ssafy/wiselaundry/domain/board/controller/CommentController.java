package com.ssafy.wiselaundry.domain.board.controller;

import com.ssafy.wiselaundry.domain.board.db.entity.Comments;
import com.ssafy.wiselaundry.domain.board.request.CommentCreateReq;
import com.ssafy.wiselaundry.domain.board.response.BoardSearchDetailRes;
import com.ssafy.wiselaundry.domain.board.response.CommentDetailRes;
import com.ssafy.wiselaundry.domain.board.service.CommentsService;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@Api("유저 API")
@Slf4j
@RestController
@RequestMapping("/api/community/comment")
public class CommentController {

    @Autowired
    CommentsService commentService;

    @ApiOperation(value = "댓글 생성", notes = "댓글 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BoardSearchDetailRes.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @PostMapping("/create")
    public ResponseEntity<? extends BaseResponseBody> commentsCreate(@RequestBody CommentCreateReq body) {
        Comments comment = commentService.commentCreate(body);

        CommentDetailRes commentDetailRes = CommentDetailRes.builder()
                .commentDate(comment.getCommentDate())
                .commentId(comment.getCommentId())
                .commentContent(comment.getCommentContent())
                .userNick(comment.getUser().getUserNick())
                .userImg(comment.getUser().getUserImg())
                .kakaoImg(comment.getUser().getKakaoImg())
                .userId(comment.getUser().getUserId())
                .build();

        return ResponseEntity.status(200).body(CommentDetailRes.of(200,"success", commentDetailRes));
    }

    @ApiOperation(value = "댓글 삭제", notes = "댓글 삭제")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @DeleteMapping("/{commentId}")
    public ResponseEntity<? extends BaseResponseBody> boardCreate(@ApiParam(value = "댓글 ID") @PathVariable("commentId") int commentId) {
        commentService.commentDelete(commentId);
        return ResponseEntity.status(201).body(BaseResponseBody.of(204, "Success"));
    }

}
