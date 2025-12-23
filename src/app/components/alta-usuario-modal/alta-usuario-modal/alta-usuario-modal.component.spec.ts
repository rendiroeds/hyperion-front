import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaUsuarioModalComponent } from './alta-usuario-modal.component';

describe('AltaUsuarioModalComponent', () => {
  let component: AltaUsuarioModalComponent;
  let fixture: ComponentFixture<AltaUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaUsuarioModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
