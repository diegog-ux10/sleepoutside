import { setLocalStorage, getParams } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();
