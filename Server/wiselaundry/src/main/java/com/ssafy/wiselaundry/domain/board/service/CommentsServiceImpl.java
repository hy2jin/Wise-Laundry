package com.ssafy.wiselaundry.domain.board.service;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.Comments;
import com.ssafy.wiselaundry.domain.board.db.repository.CommentsRepository;
import com.ssafy.wiselaundry.domain.board.request.CommentCreateReq;
import com.ssafy.wiselaundry.domain.board.request.CommentUpdateReq;
import com.ssafy.wiselaundry.domain.board.response.CommentDetailRes;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import com.ssafy.wiselaundry.domain.user.db.repository.UserRepository;
import com.ssafy.wiselaundry.domain.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.List;

@Service
public class CommentsServiceImpl implements CommentsService{
    @Autowired
    CommentsRepository commentsRepository;

    @Autowired
    UserService userService;

    @Autowired
    BoardService boardService;

    @Override
    public Comments commentSearchById(int commentId) {
        return commentsRepository.findById(commentId).get();
    }

    @Override
    public Comments commentCreate(CommentCreateReq body) {
        User user = userService.findByUserId(body.getUserId());
        Board board = boardService.boardSearchById(body.getBoardId());

        Comments comments = body.toEntity(body,user,board);
        commentsRepository.save(comments);
        return comments;
    }

    @Override
    public void commentUpdate(CommentUpdateReq body) {
    }

    @Override
    public void commentDelete(int commentId) {
        Comments deleteComments = commentsRepository.findById(commentId).get();
        commentsRepository.delete(deleteComments);
    }
}
