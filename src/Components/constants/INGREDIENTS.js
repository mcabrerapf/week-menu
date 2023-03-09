export const INGREDIENT_UNITS = [
  {
    value: 'UN', name: 'Unidad',
  },
  {
    value: 'G', name: 'Gramos',
  },
  {
    value: 'KG', name: 'Kilogramos',
  },
  {
    value: 'L', name: 'Litros',
  },
  {
    value: 'ML', name: 'Mililitros',
  },
  {
    value: 'LB', name: 'Libras',
  },
  {
    value: 'OZ', name: 'Onza',
  },
  {
    value: 'TSP', name: 'Cucharadita',
  },
  {
    value: 'TBSP', name: 'Cucharada',
  },
  {
    value: 'PT', name: 'Pinta',
  },
  {
    value: 'QT', name: 'Cuarto',
  },
  {
    value: 'DOZ', name: 'Dozena',
  },
];

export const INGREDIENT_TYPES = [
  {
    value: 'OTHER', name: 'Otro',
  },
  {
    value: 'MEAT', name: 'Carne',
  },
  {
    value: 'FISH', name: 'Pescado',
  },
  {
    value: 'FRUIT', name: 'Fruta',
  },
  {
    value: 'VEGETABLE', name: 'Verdura',
  },
  {
    value: 'SAUCE', name: 'Salsa',
  },
  {
    value: 'LIQUOR', name: 'Licor',
  },
  {
    value: 'SPICE', name: 'Especia',
  },
];

export const SELECT_OPTIONS = {
  ingredient: {
    type: INGREDIENT_TYPES,
    unit: INGREDIENT_UNITS,
  },
};
