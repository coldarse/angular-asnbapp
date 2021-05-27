import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferswitchingComponent } from './transferswitching.component';

describe('TransferswitchingComponent', () => {
  let component: TransferswitchingComponent;
  let fixture: ComponentFixture<TransferswitchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferswitchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferswitchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
