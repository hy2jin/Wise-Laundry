package com.ssafy.wiselaundry.domain.board.service;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.BoardImg;
import com.ssafy.wiselaundry.domain.board.db.repository.BoardImgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardImgServiceImpl implements BoardImgService {

    @Autowired
    BoardImgRepository boardImgRepository;

    @Override
    public List<BoardImg> boardImgSearchAll() {
        return boardImgRepository.findAll();
    }

//    @Override
//    public List<BoardImg> boardImgSearchByBoardId(int boardId) {
//        return boardImgRepository.findAllByBoard(boardService.boardSearchById(boardId));
//    }

    @Override
    public BoardImg boardImgCreate(Board board, String boardImg) {
        BoardImg img = boardImgRepository.findByBoardAndBoardImg(board, boardImg);
        /**
         * BoardImg 가 Null 값일 경우 객체 생성.
         */
        if(img == null) {
            img = new BoardImg(board, boardImg);
            boardImgRepository.save(img);
        }
        return img;
    }

    @Override
    public void boardImgDelete(int boardImgId) {
        BoardImg deleteBoardId = boardImgRepository.findById(boardImgId).get();
        boardImgRepository.delete(deleteBoardId);
    }
}
