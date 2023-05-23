// import fetch from 'node-fetch';

export async function getCategories() {
  // Implemente aqui
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const jsonData = await response.json();
  return jsonData;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  const jsonData = await response.json();
  return jsonData;
}

export async function getProductsFromQuery(query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const jsonData = await response.json();
  return jsonData.results;
}

export async function getProductsFromCategory(category) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}`);
  const jsonData = await response.json();
  return jsonData.results;
}

export async function getProductById(id) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}
