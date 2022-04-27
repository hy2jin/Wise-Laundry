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

    @Override
    public BoardImg findById(int boardImgId) {
        return boardImgRepository.findById(boardImgId).get();
    }

    @Override
    public BoardImg boardImgCreate(Board board, String boardImg) {
        BoardImg img = new BoardImg(board, boardImg);
        boardImgRepository.save(img);
        return img;
    }

    @Override
    public void boardImgDelete(int boardImgId) {
        BoardImg deleteBoardId = boardImgRepository.findById(boardImgId).get();
        boardImgRepository.delete(deleteBoardId);
    }
}
