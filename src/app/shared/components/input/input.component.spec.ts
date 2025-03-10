import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a default placeholder and type', () => {
    expect(component.placeholder).toBe('');
    expect(component.type).toBe('text');
  });

  it('should set error message for required field', () => {
    component.ngAfterViewInit();
    component.control.setValue('');
    component.control.updateValueAndValidity();

    expect(component.errorMessage).toBe('Ce champ est requis.');
  });

  it('should set error message for minlength violation', () => {
    component.ngAfterViewInit();
    component.control.setValue('tt');
    component.control.updateValueAndValidity();

    expect(component.errorMessage).toBe(
      'La longueur minimale est de 5 caractères.'
    );
  });

  it('should clear error message when control is valid', () => {
    component.control.setValue('valid input'); // Valid input
    component.control.updateValueAndValidity();

    expect(component.errorMessage).toBe('');
  });

  it('should subscribe to control status changes on view init', () => {
    spyOn(component.control.statusChanges, 'subscribe');

    component.ngAfterViewInit();

    expect(component.control.statusChanges.subscribe).toHaveBeenCalled();
  });
});
