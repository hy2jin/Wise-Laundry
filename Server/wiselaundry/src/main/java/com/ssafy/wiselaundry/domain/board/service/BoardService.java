package com.ssafy.wiselaundry.domain.board.service;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.request.BoardCreateReq;
import com.ssafy.wiselaundry.domain.board.request.BoardUpdateReq;

import java.util.List;

public interface BoardService {
    List<Board> boardSearchAll();
    Board boardSearchById(int boardId);
    void boardCreate(BoardCreateReq boardCreateReq);
    void boardUpdate(BoardUpdateReq boardUpdateReq);
    void boardDelete(int boardId);
}
