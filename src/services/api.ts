export interface Ingredient {
  strIngredient1: string;
}

interface GetingredientsResponse {
  drinks: Ingredient[];

  // example whitout multiple interfaces
  //   drinks: {
  //     strIngredient1: string;
  //   }[];
}

export async function getingredients(): Promise<Ingredient[]> {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

  const fetchIngredient = await fetch(url);
  const data: GetingredientsResponse = await fetchIngredient.json();

  return data.drinks;
}

export async function getCocktails(
  apiKey: string,
  selectedIngredients: string[]
): Promise<any> {
  const stringifyIngredients = selectedIngredients.join(",");
  const url = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/filter.php?i=${stringifyIngredients}`;
  console.log("url", url);
  const fetchIngredient = await fetch(url);
  const data: any = await fetchIngredient.json();

  return data;
}
