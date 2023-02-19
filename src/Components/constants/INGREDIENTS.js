const INGREDIENT_TYPES = {
  fish: 'pescado',
  meat: 'carne',
  vegetables: 'verduras',
  fruits: 'frutas',
  other: 'otros',
};

// {label:'', type:INGREDIENT_TYPES.}

const INGREDIENTS = {
  chicken: { label: 'pollo', type: INGREDIENT_TYPES.meat },
  chorizo: { label: 'chorizo', type: INGREDIENT_TYPES.meat },
  beef: { label: 'ternera', type: INGREDIENT_TYPES.meat },
  bacon: { label: 'bacon', type: INGREDIENT_TYPES.meat },
  sausage: { label: 'salchicha', type: INGREDIENT_TYPES.meat },

  salmon: { label: 'salmon', type: INGREDIENT_TYPES.fish },
  goldfish: { label: 'dorada', type: INGREDIENT_TYPES.fish },
  squid: { label: 'calamar', type: INGREDIENT_TYPES.fish },

  potato: { label: 'patata', type: INGREDIENT_TYPES.vegetables },
  onion: { label: 'cebolla', type: INGREDIENT_TYPES.vegetables },
  tomato: { label: 'tomate', type: INGREDIENT_TYPES.vegetables },
  garlic: { label: 'ajo', type: INGREDIENT_TYPES.vegetables },
  carrot: { label: 'zanahoria', type: INGREDIENT_TYPES.vegetables },
  peas: { label: 'arbejas', type: INGREDIENT_TYPES.vegetables },
  redPepper: { label: 'pimiento rojo', type: INGREDIENT_TYPES.vegetables },
  spinach: { label: 'espinaca', type: INGREDIENT_TYPES.vegetables },
  greenPepper: { label: 'pimiento verde', type: INGREDIENT_TYPES.vegetables },
  parsley: { label: 'perejil', type: INGREDIENT_TYPES.vegetables },
  cannedTomato: { label: 'tomate triturado', type: INGREDIENT_TYPES.vegetables },
  mushrooms: { label: 'champinones', type: INGREDIENT_TYPES.vegetables },
  lettuce: { label: 'lechuga', type: INGREDIENT_TYPES.vegetables },
  friedTomato: { label: 'tomate frito', type: INGREDIENT_TYPES.vegetables },
  asparagus: { label: 'esparragos', type: INGREDIENT_TYPES.vegetables },

  platain: { label: 'platano', type: INGREDIENT_TYPES.fruits },
  lime: { label: 'limon', type: INGREDIENT_TYPES.fruits },

  chocolate: { label: 'chocolate', type: INGREDIENT_TYPES.other },
  rum: { label: 'ron', type: INGREDIENT_TYPES.other },
  whiteWhine: { label: 'vino blanco', type: INGREDIENT_TYPES.other },
  boquet: { label: 'ramito compuesto', type: INGREDIENT_TYPES.other },
  almonds: { label: 'almendras', type: INGREDIENT_TYPES.other },
  cheese: { label: 'queso', type: INGREDIENT_TYPES.other },
  flour: { label: 'harina', type: INGREDIENT_TYPES.other },
  chickpeas: { label: 'garbanzos', type: INGREDIENT_TYPES.other },
  bread: { label: 'pan', type: INGREDIENT_TYPES.other },
  eggs: { label: 'huevos', type: INGREDIENT_TYPES.other },
  ketchup: { label: 'ketchup', type: INGREDIENT_TYPES.other },
  mayonesse: { label: 'mayonesa', type: INGREDIENT_TYPES.other },
  cognac: { label: 'cognac', type: INGREDIENT_TYPES.other },
  pasta: { label: 'pasta', type: INGREDIENT_TYPES.other },
  cream: { label: 'nata', type: INGREDIENT_TYPES.other },
  rice: { label: 'arroz', type: INGREDIENT_TYPES.other },

};

export { INGREDIENTS, INGREDIENT_TYPES };
