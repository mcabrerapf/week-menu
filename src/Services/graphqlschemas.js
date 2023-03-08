// enum DishTypeKeysEnum {
//     BREAKFAST
//     LUNCH
//     DINNER
//     DESSERT
//     VERMUT
//     MUNCH
//   }

//   enum DayKeysEnum {
//     MON
//     TUE
//     WED
//     THU
//     FRI
//     SAT
//     SUN
//   }

//   type DayListItemType {
//     name: DayKeysEnum
//     breakfast: [ID]
//     lunch: [ID]
//     dinner: [ID]
//     dessert: [ID]
//   }

//   type IngredientListiItemType {
//     id: ID
//     quantity: Int
//   }

//   enum IngredientUnitEnum {
//     UN
//     G
//     KG
//     L
//     TSP
//     TBSP
//     PT
//     QT
//     OZ
//     LB
//     ML
//     DOZ
//   }

//   enum IngredientTypeEnum {
//     OTHER
//     MEAT
//     FRUIT
//     VEGETABLE
//     SAUCE
//     LIQUOR
//     FISH
//   }

//   type Ingredient @model @auth(rules: [{allow: owner}]) {
//     id: ID!
//     name: String!
//     type: IngredientTypeEnum
//     unit: IngredientUnitEnum
//   }

//   type Dish @model @auth(rules: [{allow: owner}]) {
//     id: ID!
//     name: String!
//     type: DishTypeKeysEnum
//     tags: [String]
//     size: String
//     time: String
//     description: String
//     instructions: String
//     ingredients: [IngredientListiItemType]
//   }

//   type Menu @model @auth(rules: [{allow: owner}]) {
//     id: ID!
//     name: String!
//     favourite: Boolean
//     days: [DayListItemType]
//     description: String
//     tags: [String]
//     menuDessert: ID
//   }
