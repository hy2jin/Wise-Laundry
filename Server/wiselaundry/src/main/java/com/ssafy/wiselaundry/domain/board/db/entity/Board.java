package com.ssafy.wiselaundry.domain.board.db.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
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

    @ApiModelProperty(value = "게시글 내용", required = true, example = "게시글 내용입니다")
    @Column(name = "board_content", length = 1500)
    private String boardContent;

    @ApiModelProperty(value = "게시글 날짜", required = true, example = "2020-01-23 13:33:33")
    @Column(name = "board_dt")
    private LocalDateTime boardDate;

    @ApiModelProperty(value = "조회수", example = "0")
    @Column(name = "view", columnDefinition = "integer default 0")
    private int view;

    @JsonManagedReference
    @ApiModelProperty(value = "게시글 댓글", required = false, example = "게시글 댓글")
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Comments> comments = new ArrayList<Comments>();

    @JsonManagedReference
    @ApiModelProperty(value = "게시글 사진", required = false, example = "board_img.jpg")
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<BoardImg> boardImgs = new ArrayList<BoardImg>();

    @Builder
    Board(int boardId, User user, String boardName, List<BoardImg> boardImgs, List<Comments> comments,
          LocalDateTime boardDate, String boardContent) {
        this.boardId = boardId;
        this.user = user;
        this.boardName = boardName;
        this.boardImgs = boardImgs;
        this.comments = comments;
        this.boardDate = boardDate;
        this.boardContent = boardContent;
    }
}
