import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const url = 'http://localhost:8080'


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  saveQuestion(data:any){
    return this.http.post(url+'/question',data);
  }

  getAllQuestions(){
    return this.http.get(url+'/questions');
  }
  getCurrentUser(){
    return this.http.get(url+'/getEmpId');
  }
  getQuestionById(id:number){
    return this.http.get(url+'/question/'+id);
  }
}
