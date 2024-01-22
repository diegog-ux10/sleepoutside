import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  if (cartItems.length > 0) {
    // Show the cart footer
    let cartFooter = document.querySelector('.cart-footer');
    cartFooter.classList.remove('hide');

    // Calculate the total amount
    let totalAmount = calculateTotal(cartItems);

    // Insert the total amount into the HTML element
    let totalElement = document.getElementById('totalAmount');
    totalElement.innerText = 'Total: $' + totalAmount.toFixed(2);
}

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calculateTotal(cartItems) {
  // Implement logic to calculate the total amount
  // For example, iterate through cartItems and sum up the prices
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].ListPrice;
  }
  return total;
}

renderCartContents();

