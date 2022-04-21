package com.ssafy.wiselaundry.domain.board.db.entity;

import com.ssafy.wiselaundry.domain.laundry.db.entity.Info;
import com.ssafy.wiselaundry.domain.laundry.db.entity.Laundry;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "comments")
@ApiModel(value = "Comments", description = "댓글")
public class Comments {

    @ApiModelProperty(value = "댓글번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @ManyToOne
    @Column(name = "user_id")
    private User user;

    @ManyToOne
    @Column(name = "board_id")
    private Board board;

    @ApiModelProperty(value = "댓글내용", required = true, example = " 내용입니다")
    @Column(name = "comment_content")
    private int commentContent;

    @ApiModelProperty(value = "댓글 날짜", required = true, example = "2020-01-23")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "comment_dt")
    private Date commentDt;



}
