import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addcomment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.scss'],
})
export class AddcommentComponent {
  @Input() image: string = '';
  @Output() onSendReply = new EventEmitter<string>();
  @Input() isReply: boolean = false;

  replyText: string = '';

  sendReply() {
    if (this.replyText.trim()) {
      this.onSendReply.emit(this.replyText);
      this.replyText = '';
    }
  }
}
