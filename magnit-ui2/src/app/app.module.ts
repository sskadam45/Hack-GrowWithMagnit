import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as CanvasJSAngularChart  from 'src/assets/canvasjs.angular.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerticalStepQuestionsComponent } from './vertical-step-questions/vertical-step-questions.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpMetricsComponent } from './emp-metrics/emp-metrics.component';
import { ToastrModule } from 'ngx-toastr';
import { SurveyDialogComponent } from './survey-dialog/survey-dialog.component';

const CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@NgModule({
  declarations: [
    AppComponent,
    CanvasJSChart,
    VerticalStepQuestionsComponent,
    EmpMetricsComponent,
    SurveyDialogComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatNativeDateModule,
    MaterialExampleModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000, // 5 seconds
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
