import { Component, OnInit } from '@angular/core';
import quizz_questions from 'src/assets/data/quizz_questions.json'
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string='';
  imgS="";
  questions:any;
  questionSelected:any;

  answers:string[] = [];
  answerSelected:string="";

  questionIndex:number=0;
  maxIndex:number=0;

  finished:boolean=false;

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected= this.questions[this.questionIndex]
      this.questionIndex = 0;
      this.maxIndex=this.questions.length
    }
  }
  buttonChoice(value:string){
    this.answers.push(value);
    console.log(this.answers);
    this.nextStep();
  }
  async nextStep(){
    this.questionIndex+=1
    if(this.maxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string= await this.checkRes(this.answers);
      this.finished=true;
      this.answerSelected= quizz_questions.results[finalAnswer as keyof typeof 
        quizz_questions.results]
      if(this.answerSelected === "Você muito provavelmente seria um super Herói!"){
        this.imgS="https://www.einerd.com.br/wp-content/uploads/2017/10/super-her%C3%B3is-mais-populares-brasil-890x466.jpg.webp";
      }else{
        this.imgS="https://pop.proddigital.com.br/wp-content/uploads/sites/8/2021/06/capa-de-post-1500x983-pop-3.png";
      }
    }
  }
  async checkRes(answers: string[]){
    const res = answers.reduce((previus,current,i,arr)=>{
      if(arr.filter(item=> item ===previus).length > 
      arr.filter(item=> item ===current).length){
        return previus
      }else{
        return current
      }
    })
    return res
  }
}
