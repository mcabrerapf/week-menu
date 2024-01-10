import {
  DISH_STRING, INGREDIENT_STRING, LUNCH_STRING, MENU_STRING,
} from '../../constants/STRINGS';

const initIngredient = (data) => {
  if (data.id) {
    return {
      id: data.id,
      name: data.name || '',
      type: data.type || 'other',
      unit: data.unit || 'u',
    };
  }
  return { name: '', type: 'other', unit: 'u' };
};

const initDish = (data) => {
  if (data.id) {
    return {
      id: data.id,
      name: data.name || '',
      types: data.types || [LUNCH_STRING],
      servings: data.servings || 1,
      time: data.time || { hours: 0, minutes: 0 },
      description: data.description || '',
      instructions: data.instructions || '',
      ingredients: data.ingredients || [],
      sideDishTo: data.sideDishTo || [],
    };
  }
  return {
    name: '',
    types: [LUNCH_STRING],
    servings: 1,
    time: { hours: 0, minutes: 0 },
    description: '',
    instructions: '',
    ingredients: [],
    sideDishTo: [],
  };
};

const initMenu = (data) => {
  if (data.id) {
    return {
      id: data.id,
      name: data.name || '',
      favourite: data.favourite || false,
      description: data.description || null,
      tags: data.tags || null,
      snacks: data.snacks || null,
      dessert: data.dessert || null,
      weeks: data.weeks || [],
    };
  }
  return { name: '', favourite: false, weeks: data.weeks || [] };
};

const initData = (data, type) => {
  switch (type) {
    case MENU_STRING:
      return initMenu(data);
    case DISH_STRING:
      return initDish(data);
    case INGREDIENT_STRING:
      return initIngredient(data);
    default:
      return data || {};
  }
};

export default initData;
