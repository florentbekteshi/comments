import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentComponent } from './components/comment/comment.component';
import { AddcommentComponent } from './components/addcomment/addcomment.component';
import { ModalComponent } from './shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { ApiService } from './commo/api.service';
import { User, Comment } from './commo/types/index';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommentComponent,
    AddcommentComponent,
    ModalComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blogs';
  Comments: Comment[] = [];
  CurrentUser: User = {
    username: '',
    image: {
      png: '',
    },
  };
  currentReplyingTo: Comment | null = null;
  editingId: number | null = null;
  newParagraph: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchData();
    this.fetchUserCurrent();
  }

  fetchData() {
    this.apiService.getData().subscribe({
      next: (data) => {
        this.Comments = data.comments;
      },
      error: (error) => {
        console.error('Error fetching data', error);
      },
    });
  }

  fetchUserCurrent() {
    this.apiService.getData().subscribe({
      next: (data) => {
        this.CurrentUser = data.currentUser;
      },
      error: (error) => {
        console.error('Error fetching data', error);
      },
    });
  }

  deleteComment(commentId: number) {
    this.Comments = this.Comments.filter((comment) => {
      if (comment.id === commentId) {
        return false;
      }
      comment.replies = comment.replies.filter(
        (reply) => reply.id !== commentId
      );
      return true;
    });
  }

  
  updateScore(
    commentId: number,
    isReply: boolean,
    isIncrement: boolean,
    replyId?: number
  ) {
    const comment = this.Comments.find((comment) => comment.id === commentId);
    if (!comment) {
      return;
    }

    if (!isReply) {
      if (isIncrement) {
        comment.score++;
      } else if (comment.score > 0) {
        comment.score--;
      }
    } else {
      const reply = comment.replies.find((reply) => reply.id === replyId);
      if (!reply) {
        return;
      }

      if (isIncrement) {
        reply.score++;
      } else if (reply.score > 0) {
        reply.score--;
      }
    }
  }


  replyToComment(comment: Comment) {
    this.currentReplyingTo = comment;
  }
  sendReply(replyText: string) {
    if (!replyText.trim()) {
      return;
    }
    const now = new Date();
    const newComment: Comment = {
      id: now.getTime(),
      content: replyText,
      createdAt: '1 min ago',
      score: 0,
      user: this.CurrentUser,
      replies: [],
    };

    if (this.currentReplyingTo) {
      const comment = this.Comments.find(
        (c) => c.id === this.currentReplyingTo!.id
      );
      if (comment) {
        comment.replies.push(newComment);
      }
    } else {
      this.Comments.push(newComment);
    }
    this.currentReplyingTo = null;
  }
}
