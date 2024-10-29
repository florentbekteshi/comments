import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() username: string = '';
  @Input() timeAgo: string = '';
  @Input() commentText: string = '';
  @Input() replyCount: number = 0;
  @Input() avatarUrl: string = '';
  @Input() isActive: boolean = false;
  @Input() commentId: number | undefined;
  showModal: boolean = false;

  @Output() onDelete = new EventEmitter<number>();
  @Output() onReply = new EventEmitter<void>();
  @Output() onIncrement: EventEmitter<void> = new EventEmitter();
  @Output() onDecrement: EventEmitter<void> = new EventEmitter();

  editingId: number | null = null;
  newParagraph: string = '';

  handleReplyClick() {
    this.onReply.emit();
  }

  handleDeleteClick() {
    this.showModal = true;
  }

  confirmDelete() {
    if (this.commentId !== undefined) {
      this.onDelete.emit(this.commentId);
    }
    this.showModal = false;
  }

  onEdit(id: number, currentParagraph: string) {
    this.editingId = id;
    this.newParagraph = currentParagraph !== undefined ? currentParagraph : '';
  }

  updateParagraph(id: number) {
    if (this.editingId === id) {
      this.commentText = this.newParagraph;
      this.editingId = null;
    }
  }
  incrementScore() {
    this.onIncrement.emit();
  }

  decrementScore() {
    this.onDecrement.emit();
  }

  cancelDelete() {
    this.showModal = false;
  }

  onEnter(event: KeyboardEvent, id: number) {
    if (event.key === 'Enter') {
      this.updateParagraph(id);
    }
  }
}
