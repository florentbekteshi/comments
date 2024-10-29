import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  confirmDelete() {
    this.onDelete.emit();
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }
}
