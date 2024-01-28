// ShoppingCart.mjs

import { loadTemplate } from './utils.mjs'; // Import your template-related functions

export default class ShoppingCart {
  constructor(cartContainer, cartItems) {
    this.cartContainer = cartContainer;
    this.cartItems = cartItems || [];
  }

  async init() {
    await this.renderCart();
  }

  async renderCart() {
    const cartTemplatePath = '../public/partials/cart-item-template.html'; // Replace with the actual path
    const cartTemplate = await loadTemplate(cartTemplatePath);

    this.cartContainer.innerHTML = '';

    this.cartItems.forEach((item) => {
      const cartItemElement = cartTemplate.content.cloneNode(true);

      // Update item details in the template
      cartItemElement.querySelector('.cart-card__image img').src = item.Image;
      cartItemElement.querySelector('.cart-card__image img').alt = item.Name;
      cartItemElement.querySelector('.card__name').textContent = item.Name;
      cartItemElement.querySelector('.cart-card__color').textContent =
        item.Colors[0].ColorName;
      cartItemElement.querySelector(
        '.cart-card__quantity'
      ).textContent = `qty: ${item.quantity || 1}`;
      cartItemElement.querySelector(
        '.cart-card__price'
      ).textContent = `$${item.FinalPrice.toFixed(2)}`;

      // Add event listener for the remove button
      const removeButton = cartItemElement.querySelector('.remove-item');
      removeButton.addEventListener('click', () => this.removeItem(item.Id));

      // Append the item to the cart container
      this.cartContainer.appendChild(cartItemElement);
    });
  }

  removeItem(itemId) {
    // Add logic to remove the item from the cart
    // You might want to update the cartItems array and then call renderCart again
  }

  // Add other methods for updating, adding, and removing items from the cart
}
