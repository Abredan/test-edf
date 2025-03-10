import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent, BrowserAnimationsModule], // Ajoutez BrowserAnimationsModule ici
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default title', () => {
    expect(component.title).toBe('Default title');
  });

  it('should set the title from input', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(component.title).toBe('Test Title');
  });

  it('should open the modal', () => {
    spyOn(component.modal.nativeElement, 'showModal');

    component.open();

    expect(component.modal.nativeElement.showModal).toHaveBeenCalled();
  });

  it('should close the modal', () => {
    spyOn(component.modal.nativeElement, 'close');

    component.close();

    expect(component.modal.nativeElement.close).toHaveBeenCalled();
  });
});
