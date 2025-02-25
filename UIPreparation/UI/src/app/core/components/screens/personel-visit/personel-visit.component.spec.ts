import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelVisitComponent } from './personel-visit.component';

describe('PersonelVisitComponent', () => {
  let component: PersonelVisitComponent;
  let fixture: ComponentFixture<PersonelVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonelVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonelVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
