package com.ssafy.wiselaundry.domain.board.db.repository;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.BoardImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardImgRepository extends JpaRepository<BoardImg, Integer> {
    List<BoardImg> findAllByBoard(Board board);
    BoardImg findByBoardImg(String boardImg);
    void deleteByBoard(Board board);
}
