import { INGREDIENTS } from './INGREDIENTS';

const DISH_TYPES = { lunch: 'lunch', dinner: 'dinner' };

const DISH_TAGS = {
  fish: 'pescado', meat: 'carne', latin: 'latino', pasta: 'pasta',
};

const DISH_SIZES = { half: 'mitx', full: 'tot' };

const DISHES = [
  {
    label: 'Estofado de ternera',
    type: DISH_TYPES.lunch,
    tag: DISH_TAGS.meat,
    size: DISH_SIZES.full,
    time: '3h',
    ingredients: [
      INGREDIENTS.beef,
      INGREDIENTS.potato,
      INGREDIENTS.tomato,
      INGREDIENTS.onion,
      INGREDIENTS.carrot,
      INGREDIENTS.peas,
      INGREDIENTS.chocolate,
      INGREDIENTS.rum,
      INGREDIENTS.boquet,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Pollo al horno',
    time: '2h',
    ingredients: [
      INGREDIENTS.chicken,
      INGREDIENTS.potato,
      INGREDIENTS.onion,
      INGREDIENTS.redPepper,
      INGREDIENTS.greenPepper,
      INGREDIENTS.whiteWhine,
    ],
    tags: [],
  },
  {
    type: '',
    label: 'Garbanzos con espinacas',
    time: '30m',
    ingredients: [
      INGREDIENTS.onion,
      INGREDIENTS.redPepper,
      INGREDIENTS.tomato,
      INGREDIENTS.almonds,
      INGREDIENTS.garlic,
      INGREDIENTS.chorizo,
      INGREDIENTS.spinach,
      INGREDIENTS.chickpeas,
    ],
    tags: [],
  },
  {
    type: 'dinner',
    label: 'Patacones',
    time: '30m',
    ingredients: [
      INGREDIENTS.platain,
      INGREDIENTS.cheese,
      INGREDIENTS.onion,
      INGREDIENTS.redPepper,
      INGREDIENTS.chicken,
    ],
    tags: [DISH_TAGS.latin],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Fricando',
    time: '',
    ingredients: [
      INGREDIENTS.beef,
      INGREDIENTS.flour,
      INGREDIENTS.garlic,
      INGREDIENTS.parsley,
      INGREDIENTS.almonds,
      INGREDIENTS.cannedTomato,
      INGREDIENTS.mushrooms,
      INGREDIENTS.cognac,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.dinner,
    label: 'Ensalada de salmon',
    time: '',
    ingredients: [
      INGREDIENTS.lettuce,
      INGREDIENTS.carrot,
      INGREDIENTS.onion,
      INGREDIENTS.cheese,
      INGREDIENTS.lime,
      INGREDIENTS.salmon,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Pescado con arroz',
    time: '',
    ingredients: [
      INGREDIENTS.goldfish,
      INGREDIENTS.rice,
      INGREDIENTS.onion,
      INGREDIENTS.garlic,
      INGREDIENTS.carrot,
    ],
    tags: [DISH_TAGS.fish],
  },
  {
    type: '',
    label: 'Calamares amb salsa',
    time: '',
    ingredients: [
      INGREDIENTS.onion,
      INGREDIENTS.garlic,
      INGREDIENTS.squid,
      INGREDIENTS.whiteWhine,
      INGREDIENTS.friedTomato,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Pasta Bolognesa',
    time: '',
    ingredients: [
      INGREDIENTS.sausage,
      INGREDIENTS.cannedTomato,
      INGREDIENTS.onion,
      INGREDIENTS.pasta,
      INGREDIENTS.garlic,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.lunch,
    label: 'Pasta Carbonara',
    time: '',
    ingredients: [
      INGREDIENTS.bacon,
      INGREDIENTS.cream,
      INGREDIENTS.pasta,
      INGREDIENTS.onion,
      INGREDIENTS.garlic,
    ],
    tags: [],
  },
  {
    type: DISH_TYPES.dinner,
    label: 'Sanguich Ou',
    time: '',
    ingredients: [
      INGREDIENTS.eggs,
      INGREDIENTS.bread,
      INGREDIENTS.ketchup,
      INGREDIENTS.mayonesse,
    ],
    tags: [],
  },
];

export { DISHES, DISH_TYPES, DISH_TAGS };
