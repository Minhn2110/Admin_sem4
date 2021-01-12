import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryListComponent } from './transaction-history-list.component';

describe('TransactionHistoryListComponent', () => {
  let component: TransactionHistoryListComponent;
  let fixture: ComponentFixture<TransactionHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
