package com.ssafy.wiselaundry.domain.board.service;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.BoardImg;

import java.util.List;

public interface BoardImgService {
    List<BoardImg> boardImgSearchAll();
//    List<BoardImg> boardImgSearchByBoardId(int boardId);
    /**
     * 만들어진 이미지가 이미 존재하면 생성하지 않고 반환,
     * 이미지가 존재하지 않으면 생성 후 반환.
     * @param board
     * @param boardImg
     * @return BoardImg
     */
    BoardImg boardImgCreate(Board board, String boardImg);
    void boardImgDelete(int boardId);
}
