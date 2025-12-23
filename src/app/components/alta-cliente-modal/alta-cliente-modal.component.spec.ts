import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaClienteModalComponent } from './alta-cliente-modal.component';

describe('AltaClienteModalComponent', () => {
  let component: AltaClienteModalComponent;
  let fixture: ComponentFixture<AltaClienteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaClienteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
