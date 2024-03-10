import { useState } from 'react';

function useFilterView({
  ingredients, dishes, currentData, setCurrentData,
}) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showDishes, setShowDishes] = useState(false);
  const ingredientsArrowIcon = showIngredients ? 'arrow-a-d' : 'arrow-a-u';
  const dishesArrowIcon = showDishes ? 'arrow-a-d' : 'arrow-a-u';

  const handleButtonClick = (value, isSelected, key) => {
    if (!isSelected) {
      setCurrentData({
        ...currentData,
        filters: {
          ...currentData.filters,
          [key]: [...currentData.filters[key], value],
        },
      });
    } else {
      setCurrentData({
        ...currentData,
        filters: {
          ...currentData.filters,
          [key]: currentData.filters[key].filter((iType) => iType !== value),
        },
      });
    }
  };

  return {
    currentData,
    allIngredients: ingredients,
    allDishes: dishes,
    showIngredients,
    showDishes,
    ingredientsArrowIcon,
    dishesArrowIcon,
    setShowIngredients,
    setShowDishes,
    handleButtonClick,
  };
}

export default useFilterView;
