// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Ingredient, Dish, Menu } = initSchema(schema);

export {
  Ingredient,
  Dish,
  Menu
};