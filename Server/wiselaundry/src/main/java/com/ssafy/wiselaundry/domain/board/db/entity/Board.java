package com.ssafy.wiselaundry.domain.board.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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

    @ApiModelProperty(value = "유저번호", required = true, example = "1")
    @Column(name = "user_id")
    private int userId;

    @ApiModelProperty(value = "게시글 제목", required = true, example = "글 제목입니다.")
    @Column(name = "board_name")
    private String boardName;

    @ApiModelProperty(value = "개시글 사진", required = false, example = "board_img.jpg")
    @Column(name = "board_img")
    private String boardImg;

    @ApiModelProperty(value = "게시글 내용", required = true, example = "게시글 내용입니다")
    @Column(name = "board_content")
    private int boardContent;

    @ApiModelProperty(value = "게시글 날짜", required = true, example = "2020-01-23")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "board_dt")
    private Date boardDt;

}
