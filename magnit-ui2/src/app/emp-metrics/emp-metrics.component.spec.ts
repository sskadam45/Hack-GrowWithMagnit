import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMetricsComponent } from './emp-metrics.component';

describe('EmpMetricsComponent', () => {
  let component: EmpMetricsComponent;
  let fixture: ComponentFixture<EmpMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
