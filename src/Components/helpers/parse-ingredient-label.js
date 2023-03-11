import capitalizeFirstLetter from './capitalize-first-letter';

const parseIngredientLabel = (label, i, length, quantity) => {
  const isLast = (i + 1) === length;
  const isFirst = i === 0;
  const parsedQuantity = `(${quantity})`;
  if (isFirst) return `- ${capitalizeFirstLetter(label)}${length > 1 ? ` ${parsedQuantity}, ` : ` ${parsedQuantity}`}`;
  return `${label} ${parsedQuantity}${isLast ? ' ' : ', '}`;
};

export default parseIngredientLabel;
