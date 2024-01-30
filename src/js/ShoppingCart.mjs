import { getLocalStorage, loadTemplate, setLocalStorage } from './utils.mjs';
export default class ShoppingCart {
  constructor(cartContainer, cartItems) {
    this.cartContainer = cartContainer;
    this.cartItems = cartItems || [];
  }

  async init() {
    await this.renderCart();
    this.renderTotal();
  }

  async renderCart() {
    const cartTemplatePath = '../partials/cart-item-template.html'; // Replace with the actual path
    const cartTemplate = await loadTemplate(cartTemplatePath);

    this.cartContainer.innerHTML = '';

    this.cartItems.forEach((item) => {
      const cartItemElement = cartTemplate.content.cloneNode(true);
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

      const removeButton = cartItemElement.querySelector('.remove-item');
      removeButton.addEventListener('click', () => this.removeItem(item.Id));

      this.cartContainer.appendChild(cartItemElement);
    });
  }

  removeItem(itemId) {
    const productIdToRemove = itemId;
    const updatedCart = getLocalStorage('so-cart').filter(
      (product) => product.Id !== productIdToRemove
    );
    setLocalStorage('so-cart', updatedCart);
    location.reload();
  }

  renderTotal() {
    if (this.cartItems.length > 0) {
      let cartFooter = document.querySelector('.cart-footer');
      cartFooter.classList.remove('hide');

      let totalAmount = this.calculateTotal(this.cartItems);

      let totalElement = document.getElementById('totalAmount');
      totalElement.innerText = 'Total: $' + totalAmount.toFixed(2);
    }
  }

  calculateTotal(cartItems) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].ListPrice;
    }
    return total;
  }
}
