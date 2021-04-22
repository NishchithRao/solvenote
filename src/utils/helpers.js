import { typographicMathSymbols } from "./methods";

export const highlightNumbers = (value) =>
  value.replace(/(\d+)/g, (num) => `<span class="number">${num}</span>`);

export const extractText = (value) => {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = value;
  return tempDiv.textContent;
};

export const highlightHeading = (value) => {
  value = value.replaceAll(/\s+/gm, "randomText321");
  value = value.replace(
    /#\w+/gimy,
    (text) => `<span class="heading">${text}</span>`
  );
  return value.replaceAll(/randomText321/gm, " ");
};

export const changeOperators = (value) => {
  Object.entries(typographicMathSymbols).map(
    (arr) =>
      (value = value.replaceAll(
        arr[1],
        (operator) => `<span class="operator">${operator}</span>`
      ))
  );
  return value;
};
export const processString = (value) => {
  value=value.replaceAll(/per/gm,'*');
  value=value.replaceAll(/among/gm,'/');
  value = value.replaceAll(/[a-z=]/gim, "");
  Object.entries(typographicMathSymbols).map(
    (arr) => (value = value.replaceAll(arr[1], arr[0]))
  );
  value = value.replaceAll(
    /(?<=(\d(.)\d)|\d)(?=[^\d(.)\d\s])|(?<=[^\d(.)\d\s])(?=\d)/gm,
    " "
  );
  value = value.replaceAll("(", " ( ");
  value = value.replaceAll(")", " ) ");
  return value;
};
