export const styles = [{
    text: /(\d+)/g,
    style:"color:blue;"
  },{
    text: /#[a-z]+/iygm,
    style: 'font-weight:bold;'
  },{
    text: /\s[a-z]+/iygm,
    style: 'font-weight:bold;'
  },{
    text: /[+/\-*%]+/gm,
    style: 'color:orchid'
  }];