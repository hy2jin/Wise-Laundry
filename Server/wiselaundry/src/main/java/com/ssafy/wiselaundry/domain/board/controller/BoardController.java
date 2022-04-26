package com.ssafy.wiselaundry.domain.board.controller;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.Comments;
import com.ssafy.wiselaundry.domain.board.request.BoardCreateReq;
import com.ssafy.wiselaundry.domain.board.request.BoardUpdateReq;
import com.ssafy.wiselaundry.domain.board.response.BoardSearchAllRes;
import com.ssafy.wiselaundry.domain.board.response.BoardSearchDetailRes;
import com.ssafy.wiselaundry.domain.board.response.CommentDetailRes;
import com.ssafy.wiselaundry.domain.board.service.BoardService;
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
@RequestMapping("/api/community")
public class BoardController {
    @Autowired
    BoardService boardService;

    @Autowired
    CommentsService commentsService;

    @ApiOperation(value = "모든 게시글 조회", notes = "모든 게시글을 가져다 준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = List.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @GetMapping("/all")
    public ResponseEntity<List<BoardSearchAllRes>> boardSearchAll() {
        List<Board> boards = boardService.boardSearchAll();
        List<BoardSearchAllRes> boardSearchAllResList = new ArrayList<>();

        for (Board board: boards) {
            boardSearchAllResList.add(BoardSearchAllRes.of(board));
        }

        return ResponseEntity.status(200).body(boardSearchAllResList);
    }

    @ApiOperation(value = "게시판 ID로 게시글 조회", notes = "게시글 하나에 대해서만 상세히 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BoardSearchDetailRes.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardSearchDetailRes> boardSearchDetail(@RequestParam int boardId) {
        Board board = boardService.boardSearchById(boardId);
        List<CommentDetailRes> commentDetailResList = new ArrayList<>();

        for (Comments comment : board.getComments()) {
            commentDetailResList.add(CommentDetailRes.builder()
                            .commentContent(comment.getCommentContent())
                            .commentId(comment.getCommentId())
                            .commentDt(comment.getCommentDt())
                            .build());
        }

        BoardSearchDetailRes boardSearchDetailRes = BoardSearchDetailRes.builder()
                .boardContent(board.getBoardContent())
                .boardDt(board.getBoardDt())
                .boardId(board.getBoardId())
                .boardImgs(board.getBoardImgs())
                .boardName(board.getBoardName())
                .userId(board.getUser().getUserId())
                .userNick(board.getUser().getUserNick())
                .userImg(board.getUser().getUserImg())
                .comments(commentDetailResList)
                .build();
        return ResponseEntity.status(200).body(boardSearchDetailRes);
    }

    @ApiOperation(value = "게시글 작성", notes = "게시글 하나 생성")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @PostMapping("/create")
    public ResponseEntity<? extends BaseResponseBody> boardCreate(@RequestBody BoardCreateReq body) {
        boardService.boardCreate(body);
        return ResponseEntity.status(201).body(new BaseResponseBody(201, "생성 완료"));
    }

    @ApiOperation(value = "게시글 수정", notes = "게시글 수정")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @PutMapping("/{boardId}")
    public ResponseEntity<? extends BaseResponseBody> boardUpdate(@RequestBody BoardUpdateReq body) {
        boardService.boardUpdate(body);
        return ResponseEntity.status(201).body(new BaseResponseBody(201, "수정 완료"));
    }

    @ApiOperation(value = "게시글 삭제", notes = "게시글 삭제")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })

    @DeleteMapping("/{boardId}")
    public ResponseEntity<? extends BaseResponseBody> boardDelete(@RequestParam int boardId) {
        boardService.boardDelete(boardId);
        return ResponseEntity.status(201).body(new BaseResponseBody(201, "수정 완료"));
    }
}
