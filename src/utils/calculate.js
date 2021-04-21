import { operators } from "./methods";
import { processString } from "./helpers";

let resultStack = [];
let numStack = [];
let operatorStack = [];
// let variables = {};
let precedance = {
  "+": 2,
  "-": 2,
  "*": 3,
  "^": 4,
  "/": 3,
  "%":3
};

export const solveExpression = (value) => {
  value=processString(value);
  value = value.replaceAll(/\s+/gm, "#");
  convertRPN(value);
  return solve();
};
const convertRPN = (value) => {
  let regular = value.split("#");
  console.log(regular);
  numStack = [];
  operatorStack = [];
  for (let i = 0; i < regular.length; i++) {
    console.log('check',checkNum(regular[i]),regular[i],regular,i);
    if (checkNum(regular[i])) {
      console.log('y');
      numStack.push(regular[i]);
    } else if (Object.keys(operators).includes(regular[i])) {
      console.log('RR',regular[i]);
      if (operatorStack.length) {
        if (precedance[operatorStack[0]] == precedance[regular[i]]) {
          console.log('op',operatorStack[0],regular[i]);
          if(operatorStack[0]==regular[i]) {
            operatorStack.unshift(regular[i]);
          }
          else {
          checkEqualPrecendence(i, regular);
          }
        } else if (precedance[operatorStack[0]] > precedance[regular[i]]) {
          operatorStack.splice(1, 0, regular[i]);
        } else if (precedance[operatorStack[0]] < precedance[regular[i]]) {
          operatorStack.unshift(regular[i]);
        } else {
          if (operatorStack[0] == "(") {
            operatorStack.unshift(regular[i]);
          } else {
            operatorStack.push(regular[i]);
          }
        }
      } else {
        operatorStack.unshift(regular[i]);
      }
    }
    else if (regular[i] == "(") {
      operatorStack.unshift(regular[i]);
    }
    else if (regular[i] == ")") {
      let j=operatorStack.indexOf('(');
      for(let r=0; r<j; r++) {
        numStack.push(operatorStack.shift());
      }
      operatorStack.shift();
    } else {
      operatorStack.push(regular[i]);
    }
  }
  numStack = numStack.concat(operatorStack);
};

const checkNum = (str) => {
  console.log('string',str);
  return !isNaN(parseFloat(str));
};

const solve = () => {
  resultStack = [];
  for (let i = 0; i < numStack.length; i++) {
    if (checkNum(numStack[i]) && isFinite(numStack[i])) {
      resultStack.unshift(parseFloat(numStack[i]));
    }
    if (Object.keys(operators).includes(numStack[i])) {
      let b = resultStack.shift();
      let a = resultStack.shift();
      resultStack.unshift(operators[numStack[i]](a, b));
    }
  }
  return resultStack.pop();
};

const checkEqualPrecendence = (i, regular) => {
  numStack.push(operatorStack.shift());
  console.log('prec',operatorStack.length);
  if(operatorStack.length) {
    if (precedance[operatorStack[0]] > precedance[regular[i]]) {
      operatorStack.splice(1, 0, regular[i]);
      return;
    }
    if (precedance[operatorStack[0]] < precedance[regular[i]]) {
      console.log('RTY',regular[i]);
      operatorStack.unshift(regular[i]);
      return;
    }
    if (precedance[operatorStack[0]] == precedance[regular[i]]) {
      if(operatorStack[0]==regular[i]) {
        operatorStack.pop();
      }
      else {
      checkEqualPrecendence(i, regular);
      }
    }
  }
  else {
    operatorStack.push(regular[i]);
  }
};
