const split = (expression,operator) => {
  let chunk="";
  let braceCount = 0;
  let result = [];
  if(expression) {
  for(let i=0;i<expression.length;++i) {
    let str = expression[i];
    if(str=='(') {
      braceCount++;
    }
    else if(str==')') {
      braceCount--;
    }
    if(braceCount==0 && operator==str) {
      result.push(chunk);
      chunk="";
    } else chunk +=str;
  }
}
  if(chunk) {
    result.push(chunk);
  }
  return result;
}

export const getMultiplicationExpression = value => {
  let stringValue = split(value,"*");
  let numbers = stringValue.map(str => getSubtractionExpression(str));
  let initial=1;
  let result = numbers.reduce((acc,current) => acc*current,initial);
  return result;
}

export const getDivisionExpression = value => {
  let stringValue = split(value,"/");
  let numbers = stringValue.map(str => {
      if(str[0]=='(') {
        if(str[1] && str[1].match(/[-+]/gm)&&!isNaN(parseInt(str[0]))) {
          str=str.split('');
          str.splice(1,0,'0');
          str = str.join('');
        }
        const expr = str.substr(1,str.length-1);
        return getAdditionExpression(expr);
      }
      if(str.match(/\./g)) {
        str = parseFloat(str);
        console.log('string',str);
      }
      else str=parseInt(str)
      return str;
  });
  let initial=numbers[0];
  let result = numbers.slice(1).reduce((acc,current) => acc/current,initial);
  return result;
}
export const getAdditionExpression = value => {
  value=value.replaceAll(/[a-zA-Z]+/gm,"");
  value = value.replaceAll(/=/gm,"");
  value=value.replaceAll(/\s+/gm,"");
  let stringValue = split(value,"+");
  let numbers = stringValue.map(str => getMultiplicationExpression(str));
  let initial=0;
  let result = numbers.reduce((acc,current) => acc + current,initial);
  return result;
}

export const getSubtractionExpression = value => {
  let stringValue = split(value,"-");
  let numbers = stringValue.map(str => getDivisionExpression(str));
  let initial=numbers[0];
  let result = numbers.slice(1).reduce((acc,current) => acc - current,initial);
  return result;
}
