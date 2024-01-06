const INGREDIENT_UNITS_MATCHES = {
  u: 'u',
  mg: 'mg',
  g: 'g',
  kg: 'kg',
  l: 'l',
  ml: 'ml',
  lb: 'lb',
  oz: 'oz',
  tsp: 'cdta',
  tbsp: 'cda',
  pt: 'pt',
  cup: 'tz',
  qt: 'ct',
  doz: 'dz',
};

const INGREDIENT_UNITS = [
  {
    value: 'u', name: 'U', shortLabel: 'u',
  },
  {
    value: 'mg', name: 'Mg', shortLabel: 'mg',
  },
  {
    value: 'g', name: 'G', shortLabel: 'g',
  },
  {
    value: 'kg', name: 'K', shortLabel: 'kg',
  },
  {
    value: 'l', name: 'L', shortLabel: 'l',
  },
  {
    value: 'ml', name: 'Ml', shortLabel: 'ml',
  },
  {
    value: 'lb', name: 'Lb', shortLabel: 'lb',
  },
  {
    value: 'oz', name: 'Oz', shortLabel: 'oz',
  },
  {
    value: 'tsp', name: 'Cdta', shortLabel: 'cdta',
  },
  {
    value: 'tbsp', name: 'Cda', shortLabel: 'cda',
  },
  {
    value: 'pt', name: 'Pt', shortLabel: 'pt',
  },
  {
    value: 'cup', name: 'Tz', shortLabel: 'tz',
  },
  {
    value: 'qt', name: 'Ct', shortLabel: 'ct',
  },
  {
    value: 'doz', name: 'Dc', shortLabel: 'dz',
  },
];

const INGREDIENT_TYPES = [
  {
    value: 'meat', name: 'Carne', shortLabel: 'C',
  },
  {
    value: 'fish', name: 'Pescado', shortLabel: 'P',
  },
  {
    value: 'fruit', name: 'Fruta', shortLabel: 'F',
  },
  {
    value: 'vegetable', name: 'Verdura', shortLabel: 'V',
  },
  {
    value: 'sauce', name: 'Salsa', shortLabel: 'S',
  },
  {
    value: 'liquor', name: 'Licor', shortLabel: 'L',
  },
  {
    value: 'spice', name: 'Especia', shortLabel: 'E',
  },
  {
    value: 'other', name: 'Otro', shortLabel: 'O',
  },
];

export { INGREDIENT_UNITS, INGREDIENT_TYPES, INGREDIENT_UNITS_MATCHES };
