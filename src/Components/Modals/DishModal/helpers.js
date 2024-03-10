/* eslint-disable import/prefer-default-export */
const copyDishToClipboard = (dish) => {
  const {
    name,
    servings,
    ingredients,
    instructions,
  } = dish;
  const clipboardData = [
    `${name} (${servings})`,
  ];

  if (ingredients && ingredients.length) {
    clipboardData.push('\n\n');
    clipboardData.push(
      ingredients.map((ingredient) => `- ${ingredient.name} ${ingredient.quantity}${ingredient.unit}`).join('\n'),
    );
  }
  if (instructions && instructions.length) {
    clipboardData.push('\n\n');
    clipboardData.push(
      instructions.map((instruction, i) => `${i + 1}. ${instruction}`).join('\n'),
    );
  }

  navigator.clipboard.writeText(clipboardData.join(''));
};

export {
  copyDishToClipboard,
};
