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
query ListMenu($filter: ModelMenuFilterInput, $limit: Int, $nextToken: String) {
  listMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      favourite
      description
      tags
      snacks 
      dessert 
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
