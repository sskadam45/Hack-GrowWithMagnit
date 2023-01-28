import { SurveyDialogComponent } from './../survey-dialog/survey-dialog.component';
import { NotificationService } from './../notification.service';
import { Component, OnInit } from '@angular/core';
import { Food, Question } from '../models';
import { UtilsService } from '../utils.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vertical-step-questions',
  templateUrl: './vertical-step-questions.component.html',
  styleUrls: ['./vertical-step-questions.component.css']
})
export class VerticalStepQuestionsComponent implements OnInit {
  max = 10;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 1;
  disabled = false;
  suggestion: string ='';
  questions: Question[] = [
  {emp_id :100 ,q_id:1,title:'Would you like to receive any training from us?',options:['Yes','No'],type:'radio'},
  {emp_id :100,q_id:2,title:'On a scale of 1 to 10, how challenged are you on a daily basis at work?',options:[],type:'slider', happyMark: true,},
  {emp_id :100 ,q_id:3,title:'Do you think our organization supports you in your professional development?',options:['Yes','No'],type:'radio',  happyMark: true},
  {emp_id :100 ,q_id:4,title:'Would you leave this organization if another company offered you a 5% raise?',options:['Yes','No'],type:'radio',  happyMark: true},
  {emp_id :100 ,q_id:5,title:'Do you think that work is distributed evenly across your team?',options:['Yes','No'],type:'radio',  happyMark: true},
  {emp_id :100 ,q_id:6,title:'Choose your most fev food from our restaurant?',options:['Pizza','Tacos','Bhel','None'],type:'single select'},
  {emp_id :100, q_id:7,title:'What are the things u like about company?',options:[{label:'Culture',selected:false},{label:'Salary',selected:false},{label:'Policy',selected:false},{label:'Technology',selected:false}],type:'multiselect',multiselect:true},
  {emp_id :100 ,q_id:8,title:'Pick your prefered office location?',options:['Pune Office','Benglore Office','Remote Only','Hybrid Model'], type:'radio'}
 ];
  emp_id: number | undefined;
  constructor(private utilService: UtilsService, private notificationService: NotificationService, public dialog: MatDialog) { }

  ngOnInit(): void {
 
  }
  onChange( data:any, currentObject: Question){
      if(currentObject.q_id == 2 ){
        //consider positive if value is >=6
        if(data >= 6)
          currentObject.weight = 100;
        else
          currentObject.weight = 0;
      }
      if(currentObject.q_id ==4){
        if(data == 'No')
          currentObject.weight = 100;
        else
          currentObject.weight = 0;
      }
      if(currentObject.q_id ==5){
        if(data == 'Yes')
          currentObject.weight = 100;
        else
          currentObject.weight = 0;
      }
   
  }
  openDialog(value:any,currentObject: any): void {
    
      if(value == 'No'){
        currentObject.weight = 0;
        const dialogRef = this.dialog.open(SurveyDialogComponent, {
          data: {suggestion: this.suggestion},
          width: '600px',
          enterAnimationDuration: 1000,
          exitAnimationDuration: 500,
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          currentObject.suggestion = result;
        });
    }else{
          currentObject.weight = 100;
    }
  }

  saveQuestions(){
    this.utilService.getCurrentUser().subscribe((e:any)=>{
      this.emp_id = ++e;
      this.questions.forEach(d=>{
        d.emp_id = this.emp_id;
        if( d.multiselect ){
            let filterData = d.options?.filter(t=>t.selected).map(e=>e.label).toString();
            d.selected = filterData;
          }
      })
      this.utilService.saveQuestion(this.questions).subscribe(d=>{
        this.notificationService.showSuccess('Data saved Successfully.','');
      });
    });
    
  }
}