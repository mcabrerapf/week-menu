import { INGREDIENTS } from './INGREDIENTS';

const DISH_TYPES = { lunch: 'lunch', dinner: 'dinner' };
const DISH_TAGS = {
  fish: 'pescado', meat: 'carne', latin: 'latino', pasta: 'pasta',
};

const DISHES = [
  {
    type: DISH_TYPES.lunch,
    label: 'Estofado de ternera',
    time: '3h',
    ingredients: [
      INGREDIENTS.beef.label,
      INGREDIENTS.potato.label,
      INGREDIENTS.tomato.label,
      INGREDIENTS.onion.label,
      INGREDIENTS.carrot.label,
      INGREDIENTS.peas.label,
      INGREDIENTS.chocolate.label,
      INGREDIENTS.rum.label,
      INGREDIENTS.boquet.label,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Pollo al horno',
    time: '2h',
    ingredients: [
      INGREDIENTS.chicken.label,
      INGREDIENTS.potato.label,
      INGREDIENTS.onion.label,
      INGREDIENTS.redPepper.label,
      INGREDIENTS.greenPepper.label,
      INGREDIENTS.whiteWhine.label,
    ],
    tags: [],
  },
  {
    type: '',
    label: 'Garbanzos con espinacas',
    time: '30m',
    ingredients: [
      INGREDIENTS.onion.label,
      INGREDIENTS.redPepper.label,
      INGREDIENTS.tomato.label,
      INGREDIENTS.almonds.label,
      INGREDIENTS.garlic.label,
      INGREDIENTS.chorizo.label,
      INGREDIENTS.spinach.label,
      INGREDIENTS.chickpeas.label,
    ],
    tags: [],
  },
  {
    type: 'dinner',
    label: 'Patacones',
    time: '30m',
    ingredients: [
      INGREDIENTS.platain.label,
      INGREDIENTS.cheese.label,
      INGREDIENTS.onion.label,
      INGREDIENTS.redPepper.label,
      INGREDIENTS.chicken.label,
    ],
    tags: [DISH_TAGS.latin],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Fricando',
    time: '',
    ingredients: [
      INGREDIENTS.beef.label,
      INGREDIENTS.flour.label,
      INGREDIENTS.garlic.label,
      INGREDIENTS.parsley.label,
      INGREDIENTS.almonds.label,
      INGREDIENTS.cannedTomato.label,
      INGREDIENTS.mushrooms.label,
      INGREDIENTS.cognac.label,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.dinner,
    label: 'Ensalada de salmon',
    time: '',
    ingredients: [
      INGREDIENTS.lettuce.label,
      INGREDIENTS.carrot.label,
      INGREDIENTS.onion.label,
      INGREDIENTS.cheese.label,
      INGREDIENTS.lime.label,
      INGREDIENTS.salmon.label,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Pescado con arroz',
    time: '',
    ingredients: [
      INGREDIENTS.goldfish.label,
      INGREDIENTS.rice.label,
      INGREDIENTS.onion.label,
      INGREDIENTS.garlic.label,
      INGREDIENTS.carrot.label,
    ],
    tags: [DISH_TAGS.fish],
  },
  {
    type: '',
    label: 'Calamares amb salsa',
    time: '',
    ingredients: [
      INGREDIENTS.onion.label,
      INGREDIENTS.garlic.label,
      INGREDIENTS.squid.label,
      INGREDIENTS.whiteWhine.label,
      INGREDIENTS.friedTomato.label,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Pasta Bolognesa',
    time: '',
    ingredients: [
      INGREDIENTS.sausage.label,
      INGREDIENTS.cannedTomato.label,
      INGREDIENTS.onion.label,
      INGREDIENTS.pasta.label,
      INGREDIENTS.garlic.label,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Pasta Carbonara',
    time: '',
    ingredients: [
      INGREDIENTS.bacon.label,
      INGREDIENTS.cream.label,
      INGREDIENTS.pasta.label,
      INGREDIENTS.onion.label,
      INGREDIENTS.garlic.label,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.dinner,
    label: 'Sanguich Ou',
    time: '',
    ingredients: [
      INGREDIENTS.eggs.label,
      INGREDIENTS.bread.label,
      INGREDIENTS.ketchup.label,
      INGREDIENTS.mayonesse.label,
    ],
    tags: [],
  },
];

export { DISHES, DISH_TYPES, DISH_TAGS };
