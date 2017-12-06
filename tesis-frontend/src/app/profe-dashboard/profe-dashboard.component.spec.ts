import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfeDashboardComponent } from './profe-dashboard.component';

describe('ProfeDashboardComponent', () => {
  let component: ProfeDashboardComponent;
  let fixture: ComponentFixture<ProfeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
