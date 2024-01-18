import { setLocalStorage, getParams } from './utils.mjs';
import ProductData from './ProductData.mjs';

// const products = getLocalStorage('so-cart') ?? [];

const dataSource = new ProductData("tents");

const productId = getParams('product');
console.log(productId);
dataSource.findProductById(productId).then(res => console.log(res))



// add listener to Add to Cart button
// document
  // .getElementById('addToCart')
  // .addEventListener('click', addToCartHandler);