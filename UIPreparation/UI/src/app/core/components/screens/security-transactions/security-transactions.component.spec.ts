import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityTransactionsComponent } from './security-transactions.component';

describe('SecurityTransactionsComponent', () => {
  let component: SecurityTransactionsComponent;
  let fixture: ComponentFixture<SecurityTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
