import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkTableComponent } from './spark-table.component';

describe('SparkTableComponent', () => {
  let component: SparkTableComponent;
  let fixture: ComponentFixture<SparkTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparkTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
