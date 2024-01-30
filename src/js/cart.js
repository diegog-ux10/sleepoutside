import ShoppingCart from './ShoppingCart.mjs';
import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

const cartContainer = document.getElementById('cart-container');
const cartItems = getLocalStorage('so-cart');
const shoppingCart = new ShoppingCart(cartContainer, cartItems);

loadHeaderFooter();
shoppingCart.init();
