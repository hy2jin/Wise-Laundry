package com.ssafy.wiselaundry.domain.board.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "board_img")
@ApiModel(value = "BoardImg", description = "게시글 이미지")
public class BoardImg {
    @ApiModelProperty(value = "게시글 번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_img_id")
    private int boardImgId;

    @JsonBackReference
    @ApiModelProperty(value = "게시판 정보", example = "")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ApiModelProperty(value = "게시판 이미지", example = "")
    @Column(name = "board_img")
    private String boardImg;

    public BoardImg(Board board, String boardImg) {
        this.board = board;
        this.boardImg = boardImg;
    }
}
