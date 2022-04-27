package com.ssafy.wiselaundry.domain.board.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.wiselaundry.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "comments")
@ApiModel(value = "Comments", description = "댓글")
public class Comments {
    @ApiModelProperty(value = "댓글번호", example = "1")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ApiModelProperty(value = "댓글 내용", required = true, example = " 내용입니다")
    @Column(name = "comment_content")
    private String commentContent;

    @ApiModelProperty(value = "댓글 날짜", required = true, example = "2020-01-23")
    @Column(name = "comment_date")
    private LocalDateTime commentDate;

    @Builder
    Comments(int commentId, User user, Board board, String commentContent, LocalDateTime commentDate) {
        this.commentId = commentId;
        this.user = user;
        this.board = board;
        this.commentContent = commentContent;
        this.commentDate = commentDate;
    }

}
