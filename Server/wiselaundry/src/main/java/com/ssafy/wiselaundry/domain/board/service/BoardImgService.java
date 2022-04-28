package com.ssafy.wiselaundry.domain.board.service;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.BoardImg;

import java.util.List;

public interface BoardImgService {
    List<BoardImg> boardImgSearchAll();
    BoardImg findById(int boardImgId);
    BoardImg boardImgCreate(Board board, String boardImg);
    void boardImgDelete(int boardId);
    BoardImg findByBoardImg(String boardImg);
}
