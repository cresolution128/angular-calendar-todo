import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointModalComponent } from './appoint-modal.component';

describe('AppointModalComponent', () => {
  let component: AppointModalComponent;
  let fixture: ComponentFixture<AppointModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
