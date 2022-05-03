package com.ssafy.wiselaundry.domain.board.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.wiselaundry.domain.board.db.entity.QBoard.board;

@Repository
public class BoardRepositorySpp {

    @Autowired
    private JPAQueryFactory queryFactory;

    public List<Board> boardPagination(int size, int boardId) {
        return queryFactory
                .select(board)
                .from(board)
                .where(board.boardId.lt(boardId))
                .orderBy(board.boardId.desc())
                .limit(size)
                .fetch();
    }

    public List<Board> boardSearchByKeyword(String keyword, int size, int boardId) {
        return queryFactory
                .select(board)
                .from(board)
                .where(
                        board.boardId.lt(boardId),
                        board.boardName.contains(keyword)
                )
                .orderBy(board.boardId.desc())
                .limit(size)
                .fetch();
    }

    public Board boardSearchLast() {
        return queryFactory
                .selectFrom(board)
                .orderBy(board.boardId.asc())
                .fetchFirst();
    }
}
