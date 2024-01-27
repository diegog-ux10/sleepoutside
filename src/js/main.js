import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage } from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();

loadHeaderFooter();

const cartContainer = document.getElementById("cart-container");
const cartItems = getLocalStorage("so-cart");
const shoppingCart = new ShoppingCart(cartContainer, cartItems);
shoppingCart.init();
