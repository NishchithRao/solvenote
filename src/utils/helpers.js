export const highlightNumbers = (value) =>
  value.replace(/(\d+)/g, (num) => `<span class="number">${num}</span>`);

export const extractText = (value) => {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = value;
  return tempDiv.textContent;
};

export const highlightHeading = (value) => {
    value = value.replaceAll(/\s+/gm,'spa3');
  value = value.replace(
    /#\w+/iygm,
    (text) => `<span class="heading">${text}</span>`);
    return value.replaceAll(/spa3/gm,' ');
};

export const processString = value => {
  value = value.replaceAll(/[a-z=]/gmi,"");
  value =value.replaceAll(/(?<=\d)(?=[^\d\s])|(?<=[^\d\s])(?=\d)/gm," ");
  value = value.replaceAll('(',' ( ');
  value = value.replaceAll(')',' ) ');
  return value;
}