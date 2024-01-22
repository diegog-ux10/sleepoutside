import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// console.log(productId);
// dataSource.findProductById(productId).then(res => console.log(res))

// add listener to Add to Cart button
// document
// .getElementById('addToCart')
// .addEventListener('click', addToCartHandler);s