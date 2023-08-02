import { Component } from '@angular/core';
import { Calculator } from 'src/app/model/calculator.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  firstNumberArr : string[] = [];
  secondNumberArr : string[] = [];
  calculator : Calculator = {
  firstNumber: 0,
  secondNumber: 0,
  result: 0,
  operator: ''
  

  }

  isFirst = false;
  isOperation = false;
  isSec = false;

  isCheckNumber(value: string): boolean {
    const numericStrings = ['00','0', '1', '2', '3', '4', '5', '6', '7', '8', '9','.'];
    return numericStrings.includes(value);
  }


  pressNumber(value:string){

    if(!this.isFirst ){
      if (value!='%')
      {
        this.firstNumberArr.push(value);
        const combinedString = this.firstNumberArr.join('');
        this.calculator.firstNumber = parseFloat(combinedString);
      }else{
        this.calculator.result = this.calculator.result/100;
        this.calculator.firstNumber = this.calculator.result;
      }
      
      //console.log(combinedString);
      
      
      console.log(this.calculator.firstNumber);
    }
  
    if(value=='+' || value=='-' || value == '*' || value == '/'||value == '%'){
      
      if (this.isOperation && value!='%')
      {
        this.calculator.firstNumber = this.calculator.result;
        this.secondNumberArr=[];
      }
      
      if (this.isOperation && value=='%')
      {
        this.calculator.result = this.calculator.result/100;
        this.calculator.firstNumber = this.calculator.result;
        this.secondNumberArr=[];
      }

      this.isFirst=true;
      if (value!='%'){
        this.calculator.operator=value;
      }
      console.log(this.calculator.operator);
      this.isOperation=true;
      
      
    }
   
    if (this.isFirst && this.isCheckNumber(value) ){
      // this.isFirst=true;
      this.secondNumberArr.push(value);
      const combinedString = this.secondNumberArr.join(''); 
      this.calculator.secondNumber = parseFloat(combinedString);
      console.log(this.calculator.secondNumber);
    }

    if (value=='+/-')
    {
      this.calculator.result = this.calculator.result * -1;
    }
  }
  delNumber(){
    if (this.isFirst){
      this.secondNumberArr.pop();
      if(this.secondNumberArr.length==0){
        this.calculator.secondNumber=0;
      }else{
        this.calculator.secondNumber = parseFloat(this.secondNumberArr.join(''));
      }
    }else{
      this.firstNumberArr.pop();
      if(this.firstNumberArr.length==0){
        this.calculator.firstNumber=0;
      }else{
        this.calculator.firstNumber = parseFloat(this.firstNumberArr.join(''));
      }
    }
  }
  getAnswer(){
    if(!this.isSec){
      switch (this.calculator.operator)
      { 
        case '+': this.calculator.result = this.calculator.firstNumber + this.calculator.secondNumber;this.isSec=true;
        break;

        case '-': this.calculator.result = this.calculator.firstNumber - this.calculator.secondNumber;this.isSec=true;
        
        break;

        case '*': this.calculator.result = this.calculator.firstNumber * this.calculator.secondNumber;this.isSec=true;
        break;

        case '/': this.calculator.result = this.calculator.firstNumber / this.calculator.secondNumber;this.isSec=true;
        break; 
      }
    }else {
      switch (this.calculator.operator)
      { 
        case '+': this.calculator.firstNumber = this.calculator.result; this.calculator.result += this.calculator.secondNumber;
        break;

        case '-': this.calculator.firstNumber = this.calculator.result; this.calculator.result -= this.calculator.secondNumber;
        break;

        case '*': this.calculator.firstNumber = this.calculator.result; this.calculator.result *= this.calculator.secondNumber;
        break;

        case '/': this.calculator.firstNumber = this.calculator.result; this.calculator.result /= this.calculator.secondNumber;
        break; 
      }
    }
    
  }

  clear(){
    this.calculator = {
      firstNumber: 0,
      secondNumber: 0,
      result: 0,
      operator: ''
    }
    this.isFirst = false;
    this.isOperation = false;
    this.isSec = false;
    this.firstNumberArr = [];
    this.secondNumberArr = [];
  }
}
