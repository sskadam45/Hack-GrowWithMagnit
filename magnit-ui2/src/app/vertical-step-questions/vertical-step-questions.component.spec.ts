import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalStepQuestionsComponent } from './vertical-step-questions.component';

describe('VerticalStepQuestionsComponent', () => {
  let component: VerticalStepQuestionsComponent;
  let fixture: ComponentFixture<VerticalStepQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalStepQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalStepQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
