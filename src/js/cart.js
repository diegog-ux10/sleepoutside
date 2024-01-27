import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
  <button class="remove-item" data-id="${item.Id}">X</button>
</li>`;

  return newItem;
}

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].ListPrice;
  }
  return total;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productList = document.querySelector(".product-list");

  productList.innerHTML = htmlItems.join("");

  if (cartItems.length > 0) {
    let cartFooter = document.querySelector(".cart-footer");
    cartFooter.classList.remove("hide");

    let totalAmount = calculateTotal(cartItems);

    let totalElement = document.getElementById("totalAmount");
    totalElement.innerText = "Total: $" + totalAmount.toFixed(2);

    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", removeFromCart);
    });
  }
}

function removeFromCart(event) {
  const productIdToRemove = event.target.dataset.id;
  const updatedCart = getLocalStorage("so-cart").filter(
    (product) => product.Id !== productIdToRemove
  );

  setLocalStorage("so-cart", updatedCart);

  location.reload();
}

renderCartContents();
