export const highlightNumbers = (value) =>
  value.replace(/(\d+)/g, (num) => `<span class="number">${num}</span>`);

export const extractText = (value) => {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = value;
  return tempDiv.textContent;
};

export const highlightHeading = (value) => {
    value = value.replaceAll(/\s+/gm,'randomText321');
  value = value.replace(
    /#\w+/iygm,
    (text) => `<span class="heading">${text}</span>`);
    return value.replaceAll(/randomText321/gm,' ');
};
export const highlightOperators = (value) => {
    return value.replace(/[+/\-*%]+/gm,num => `<span class="operator">${num}</span>`);
};

export const processString = value => {
  value = value.replaceAll(/[a-z=]/gmi,"");
  value =value.replaceAll(/(?<=(\d(.)\d)|\d)(?=[^\d(.)\d\s])|(?<=[^\d(.)\d\s])(?=\d)/gm," ");
  value = value.replaceAll('(',' ( ');
  value = value.replaceAll(')',' ) ');
  return value;
}