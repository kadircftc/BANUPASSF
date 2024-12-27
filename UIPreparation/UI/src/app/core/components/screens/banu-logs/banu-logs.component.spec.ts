import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanuLogsComponent } from './banu-logs.component';

describe('BanuLogsComponent', () => {
  let component: BanuLogsComponent;
  let fixture: ComponentFixture<BanuLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanuLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanuLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
