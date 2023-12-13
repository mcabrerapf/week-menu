// type MenuDishType {
//     id: ID
//     days: [Int]
//     useAs: String
//     sideDishesToUse: [ID]
//   }

//   type TimeType {
//     hours: Int
//     minutes: Int
//   }

//   type DayListItemType {
//     name: String
//     breakfast: [ID]
//     lunch: [ID]
//     dinner: [ID]
//     dessert: [ID]
//   }

//   type IngredientListiItemType {
//     id: ID!
//     quantity: Int
//     unit: String
//     name: String
//     type: String
//   }

//   type Ingredient @model @auth(rules: [{allow: owner}]) {
//     id: ID!
//     name: String!
//     type: String!
//     unit: String!
//   }

//   type Dish @model @auth(rules: [{allow: owner}]) {
//     id: ID!
//     name: String!
//     types: [String!]
//     servings: Int
//     size: String
//     time: TimeType
//     description: String
//     instructions: String
//     ingredients: [IngredientListiItemType!]
//     tags: [String]
//     sideDishes: [ID]
//     sideDishTo: [ID]
//   }

//   type Menu @model @auth(rules: [{allow: owner}]) {
//     id: ID!
//     name: String!
//     favourite: Boolean
//     dishes: [MenuDishType!]
//     description: String
//     tags: [String]
//     dessert: [ID]
//     snacks: [ID]
//     testfield: String
//   }