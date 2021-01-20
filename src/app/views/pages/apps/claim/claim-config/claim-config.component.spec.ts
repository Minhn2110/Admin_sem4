import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimConfigComponent } from './claim-config.component';

describe('ClaimConfigComponent', () => {
  let component: ClaimConfigComponent;
  let fixture: ComponentFixture<ClaimConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
