package com.ssafy.wiselaundry.domain.board.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = -1270288203L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoard board = new QBoard("board");

    public final StringPath boardContent = createString("boardContent");

    public final DateTimePath<java.time.LocalDateTime> boardDate = createDateTime("boardDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> boardId = createNumber("boardId", Integer.class);

    public final ListPath<BoardImg, QBoardImg> boardImgs = this.<BoardImg, QBoardImg>createList("boardImgs", BoardImg.class, QBoardImg.class, PathInits.DIRECT2);

    public final StringPath boardName = createString("boardName");

    public final ListPath<Comments, QComments> comments = this.<Comments, QComments>createList("comments", Comments.class, QComments.class, PathInits.DIRECT2);

    public final com.ssafy.wiselaundry.domain.user.db.entity.QUser user;

    public final NumberPath<Integer> view = createNumber("view", Integer.class);

    public QBoard(String variable) {
        this(Board.class, forVariable(variable), INITS);
    }

    public QBoard(Path<? extends Board> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoard(PathMetadata metadata, PathInits inits) {
        this(Board.class, metadata, inits);
    }

    public QBoard(Class<? extends Board> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ssafy.wiselaundry.domain.user.db.entity.QUser(forProperty("user")) : null;
    }

}

