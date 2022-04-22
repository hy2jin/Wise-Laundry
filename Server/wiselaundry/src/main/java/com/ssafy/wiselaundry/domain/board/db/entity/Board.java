package com.ssafy.wiselaundry.domain.board.db.entity;

import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "board")
@ApiModel(value = "Board", description = "게시글")
public class Board{

    @ApiModelProperty(value = "게시글 번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private int boardId;

    @ApiModelProperty(value = "유저 정보", example = "")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ApiModelProperty(value = "게시글 제목", required = true, example = "글 제목입니다.")
    @Column(name = "board_name")
    private String boardName;

    @ApiModelProperty(value = "개시글 사진", required = false, example = "board_img.jpg")
    @Column(name = "board_img")
    private String boardImg;

    @ApiModelProperty(value = "게시글 내용", required = true, example = "게시글 내용입니다")
    @Column(name = "board_content")
    private String boardContent;

    @ApiModelProperty(value = "게시글 날짜", required = true, example = "2020-01-23 13:33:33")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "board_dt")
    private Date boardDt;

    @Builder
    Board(int boardId, User user, String boardName, String boardImg, String boardContent, Date boardDt) {
        this.boardId = boardId;
        this.user = user;
        this.boardName = boardName;
        this.boardImg = boardImg;
        this.boardContent = boardContent;
        this.boardDt = boardDt;
    }
}
