import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements AfterViewInit {
  @Input() public placeholder = '';
  @Input() public type = 'text';
  @Input() public control!: FormControl;
  public errorMessage = '';

  public ngAfterViewInit() {
    this.control.statusChanges.subscribe(() => {
      this.setErrorMessage();
    });
  }

  private setErrorMessage() {
    if (this.control.errors?.['required']) {
      this.errorMessage = 'Ce champ est requis.';
    } else if (this.control.errors?.['minlength']) {
      this.errorMessage = `La longueur minimale est de ${this.control.errors['minlength'].requiredLength} caractères.`;
    } else {
      this.errorMessage = '';
    }
  }
}
