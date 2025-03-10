import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { enterAnimation } from '../../consts/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [enterAnimation],
})
export class ModalComponent {
  @Input('title') public title = 'Default title';
  @ViewChild('modal', { static: true })
  public modal!: ElementRef<HTMLDialogElement>;

  public open() {
    this.modal.nativeElement.showModal();
  }

  public close() {
    this.modal.nativeElement.close();
  }
}
