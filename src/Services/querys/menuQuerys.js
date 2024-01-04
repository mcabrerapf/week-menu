export const GET_MENU_QUERY = `
  query GetMenu($id: ID!) {
    getMenu(id: $id) {
      id
      name
      favourite
      description
      tags
      snacks 
      dessert 
      weeks {
        dishes {
          id
          days
          useAs
          sideDishesToUse
        }
      }
      dishes {
        id
        days
        useAs
        sideDishesToUse
      }
    }
  }
`;

export const GET_ALL_MENUS_QUERY = `
query ListMenu($filter: ModelMenuFilterInput, $nextToken: String) {
  listMenus(filter: $filter, limit: 999, nextToken: $nextToken) {
    items {
      id
      name
      favourite
      description
      tags
      snacks 
      dessert 
      weeks {
        dishes {
          id
          days
          useAs
          sideDishesToUse
        }
      }
      dishes {
        id
        days
        useAs
        sideDishesToUse
      }
    }
    nextToken
  }
}
`;
