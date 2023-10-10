// Importar la clase ProductManager
const ProductManager = require('./ProductManager');

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Llamar al método addProduct con los campos especificados
const newProduct = productManager.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc1223t34t3",
  25
);

productManager.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc12ewer3",
  25
);

productManager.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc12werwr3",
  25
);

productManager.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc12werw3",
  25
);

productManager.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc12ewett3",
  25
);

productManager.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc12444tgg3",
  25
);

// Obtener la lista de productos (incluyendo el producto recién agregado)
const productsList = productManager.getProducts();

// Ver la lista de productos
console.log("Lista de productos:");
productsList.forEach((product) => {
  console.log(product);
});