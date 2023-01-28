export interface Food {
    value: string;
    viewValue: string;
  }

 export class Question {
   q_id?: number;
    emp_id?:number;
    title?: string;
    options?: any[];
    type?:string;
    selected?: string;
    weight?:number;
    multiselect?: boolean;
    options_db?:string;
    suggestion?:string;
    happyMark?: boolean;
    
 }

 export enum TYPES{
    TEXT='text',
    RADIO='radio',
  
 }