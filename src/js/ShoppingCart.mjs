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
    const cartTemplatePath = '../partials/cart-item-template.html';
    const cartTemplate = await loadTemplate(cartTemplatePath);

    this.cartContainer.innerHTML = '';

    this.cartItems.forEach((item) => {
      const cartItemElement = cartTemplate.content.cloneNode(true);
      const quantityElement = cartItemElement.querySelector('.cart-card__quantity');
      console.log('quantityElement:', quantityElement);
      let quantity = item.quantity || 1;
      quantityElement.textContent = `qty: ${quantity}`;

      cartItemElement.querySelector('.cart-card__image img').src = item.Images.PrimaryMedium;
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

      const decButton = cartItemElement.querySelector('.decButton');
      const incButton = cartItemElement.querySelector('.incButton');
      decButton.addEventListener('click', () => {
        let currentQuantity = item.quantity;
        
        // If currentQuantity is not a valid number, set it to 1
        if (typeof currentQuantity !== 'number' || isNaN(currentQuantity)) {
          currentQuantity = 1;
        }
        
        const newQuantity = Math.max(1, currentQuantity - 1);
        this.updateQuantity(item, newQuantity, quantityElement);
      });
  
      incButton.addEventListener('click', () => {
        let currentQuantity = item.quantity;
      
        // If currentQuantity is not a valid number, set it to 0
        if (typeof currentQuantity !== 'number' || isNaN(currentQuantity)) {
          currentQuantity = 0;
        }
      
        const newQuantity = currentQuantity === 0 ? 2 : currentQuantity + 1;
      
        // Update the item quantity
        const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.Id === item.Id);
        if (itemIndex !== -1) {
          this.cartItems[itemIndex].quantity = newQuantity;
        }
      
        // Update the quantity display in the DOM
        if (quantityElement) {
          quantityElement.textContent = `qty: ${newQuantity}`;
        }
      
        // Save the updated cart to local storage
        setLocalStorage('so-cart', this.cartItems);
      
        // Update the total after updating the quantity
        this.renderTotal();
      });

      this.cartContainer.appendChild(cartItemElement);      
      console.log('quantityElement:', quantityElement);
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
      const listPrice = cartItems[i].FinalPrice;
      const quantity = cartItems[i].quantity || 1;
      if (typeof listPrice === 'number' && !isNaN(listPrice)) {
        total += listPrice * quantity;
      }
      // total += cartItems[i].ListPrice;
    }
    return total;
  }

  async updateQuantity(item, newQuantity, quantityElement) {
    console.log('Updating quantity for item:', item);
    console.log('New quantity:', newQuantity);
    console.log('Quantity element:', quantityElement);
  
    // Ensure the new quantity is within a valid range
    newQuantity = Math.max(1, newQuantity);
  
    // Check if newQuantity is a valid number
    if (typeof newQuantity === 'number' && !isNaN(newQuantity)) {
      // Update the item quantity
      const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.Id === item.Id);
      if (itemIndex !== -1) {
        this.cartItems[itemIndex].quantity = newQuantity;
      }
  
      // Update the quantity display in the DOM
      if (quantityElement) {
        console.log('Before updating DOM. Element content:', quantityElement.textContent);
        quantityElement.textContent = `qty: ${newQuantity}`;
        console.log('After updating DOM. Element content:', quantityElement.textContent);
      }
  
      // Save the updated cart to local storage
      setLocalStorage('so-cart', this.cartItems);
  
      // Update the total after updating the quantity
      this.renderTotal();
    } else {
      // If newQuantity is not a valid number, set quantity to 1
      console.error('Invalid newQuantity value. Setting quantity to 1.');
      newQuantity = 1;
      const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.Id === item.Id);
      if (itemIndex !== -1) {
        this.cartItems[itemIndex].quantity = newQuantity;
      }
  
      // Update the quantity display in the DOM
      if (quantityElement) {
        console.log('Before updating DOM. Element content:', quantityElement.textContent);
        quantityElement.textContent = `qty: ${newQuantity}`;
        console.log('After updating DOM. Element content:', quantityElement.textContent);
      }
  
      // Save the updated cart to local storage
      setLocalStorage('so-cart', this.cartItems);
  
      // Update the total after updating the quantity
      this.renderTotal();
    }
  }

}
