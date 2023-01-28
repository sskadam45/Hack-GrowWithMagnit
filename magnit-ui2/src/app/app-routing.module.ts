import { VerticalStepQuestionsComponent } from './vertical-step-questions/vertical-step-questions.component';
import { EmpMetricsComponent } from './emp-metrics/emp-metrics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: VerticalStepQuestionsComponent},
  { path: 'metrics', component: EmpMetricsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
