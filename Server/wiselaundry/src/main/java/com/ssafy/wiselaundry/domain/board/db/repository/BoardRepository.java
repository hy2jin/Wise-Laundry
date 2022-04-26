package com.ssafy.wiselaundry.domain.board.db.repository;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
}
