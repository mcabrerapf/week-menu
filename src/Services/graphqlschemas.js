// type TimeType {
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
//     type: String
//     servings: Int
//     size: String
//     time: TimeType
//     description: String
//     instructions: String
//     ingredients: [IngredientListiItemType!]
//     tags: [String]
//   }

//   type Menu @model @auth(rules: [{allow: owner}]) {
//     id: ID!
//     name: String!
//     favourite: Boolean
//     days: [DayListItemType!]
//     description: String
//     tags: [String]
//     menuDessert: ID
//   }
