package com.ssafy.wiselaundry.domain.board.controller;

import com.ssafy.wiselaundry.domain.board.db.entity.Comments;
import com.ssafy.wiselaundry.domain.board.request.CommentCreateReq;
import com.ssafy.wiselaundry.domain.board.response.BoardSearchDetailRes;
import com.ssafy.wiselaundry.domain.board.response.CommentDetailRes;
import com.ssafy.wiselaundry.domain.board.service.CommentsService;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api("유저 API")
@Slf4j
@RestController
@RequestMapping("/api/community/comment")
public class CommentController {

    @Autowired
    CommentsService commentService;

    @ApiOperation(value = "게시판 ID로 게시글 조회", notes = "게시글 하나에 대해서만 상세히 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BoardSearchDetailRes.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @PostMapping("/create")
    public ResponseEntity<CommentDetailRes> commentsCreate(@RequestBody CommentCreateReq body) {
        Comments comment = commentService.commentCreate(body);
        CommentDetailRes commentDetailRes = CommentDetailRes.builder()
                .commentDt(comment.getCommentDt())
                .commentId(comment.getCommentId())
                .commentContent(comment.getCommentContent())
                .userNick(comment.getUser().getUserNick())
                .userImg(comment.getUser().getUserImg())
                .userId(comment.getUser().getUserId())
                .build();
        return ResponseEntity.status(200).body(commentDetailRes);
    }

    @ApiOperation(value = "댓글 삭제", notes = "댓글 삭제")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @DeleteMapping("/{commentId}")
    public ResponseEntity<? extends BaseResponseBody> boardCreate(@RequestParam int commentId) {
        commentService.commentDelete(commentId);
        return ResponseEntity.status(201).body(BaseResponseBody.of(204, "Success"));
    }

}
