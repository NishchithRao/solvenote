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
};
let operators = {
  "+": function(a, b) {
    let subTotal = a + b;
    return subTotal;
  },
  "-": function(a, b) {
    let subTotal = a - b;
    return subTotal;
  },
  "*": function(a, b) {
    let subTotal = a * b;
    return subTotal;
  },
  "/": function(a, b) {
    let subTotal = a / b;
    return subTotal;
  },
  "^": function(a, b) {
    let subTotal = Math.pow(a, b);
    return subTotal;
  },
  "%": function(a, b) {
    let subTotal = (a * b) / 100;
    return subTotal;
  },
};

const processString = value => {
  value = value.replaceAll(/[a-z=]/gmi,"");
  value =" ( " + value;
  value = value+" )";
  value =value.replaceAll(/(?<=\d)(?=[^\d\s])|(?<=[^\d\s])(?=\d)/gm," ");
  value = value.replaceAll('(',' ( ');
  value = value.replaceAll(')',' ) ');
  return value;
}
export const solveExpression = (value) => {
  value=processString(value);
  value = value.replaceAll(/\s+/gm, "#");
  convertRPN(value);
  return solve();
};
const convertRPN = (value) => {
  let regular = value.split("#");
  numStack = [];
  operatorStack = [];
  for (let i = 0; i < regular.length; i++) {
    if (checkNum(regular[i])) {
      numStack.push(regular[i]);
    } else if (Object.keys(operators).includes(regular[i])) {
      if(operatorStack[i]=="") {
        operatorStack.pop();
      }
      if (operatorStack.length) {
        if (precedance[operatorStack[0]] == precedance[regular[i]]) {
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
        operatorStack.shift(regular[i]);
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
  operatorStack.map((op,index) => op==""&&operatorStack.splice(index,1));
  numStack = numStack.concat(operatorStack);
};

const checkNum = (str) => {
  return !isNaN(parseFloat(str));
};

const solve = () => {
  resultStack = [];
  for (let i = 0; i < numStack.length; i++) {
    if (checkNum(numStack[i]) && isFinite(numStack[i])) {
      resultStack.unshift(parseFloat(numStack[i]));
    }
    if (Object.keys(operators).includes(numStack[i])) {
      console.log('pre',resultStack);
      let b = resultStack.shift();
      let a = resultStack.shift();
      resultStack.unshift(operators[numStack[i]](a, b));
    }
  }
  return resultStack.pop();
};

const checkEqualPrecendence = (i, regular) => {
  numStack.push(operatorStack.shift());
    if (precedance[operatorStack[0]] > precedance[regular[i]]) {
      operatorStack.splice(1, 0, regular[i]);
      return;
    }
    if (precedance[operatorStack[0]] < precedance[regular[i]]) {
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
};
