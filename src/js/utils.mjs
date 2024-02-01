// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = '';
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback = null,
  position = 'afterbegin',
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = ''; // Clear the content if clear is true
  }
  if (callback) {
    callback(data);
  }

  const htmlStrings = data.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export async function convertToText(response) {
  if (!response.ok) {
    throw new Error('fail');
  }

  return response.text();
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  // Load header template
  const headerTemplatePath = '../partials/header.html';
  const headerTemplate = await loadTemplate(headerTemplatePath);

  // Load footer template
  const footerTemplatePath = '../partials/footer.html';
  const footerTemplate = await loadTemplate(footerTemplatePath);

  // Render header and footer
  const headerElement = headerTemplate.content.cloneNode(true);
  const footerElement = footerTemplate.content.cloneNode(true);

  const headerParent = document.getElementById('main-header');
  const footerParent = document.getElementById('main-footer');

  // Append the cloned nodes to the parent containers
  headerParent.appendChild(headerElement);
  footerParent.appendChild(footerElement);

  // Optionally, you can call renderWithTemplate here if needed
  // renderWithTemplate(headerTemplate, headerElement);
  // renderWithTemplate(footerTemplate, footerElement);
  updateCartItemCount();
}

function updateCartItemCount() {
  const cartItemCountElement = document.getElementById('cartItemCount');

  // Retrieve the count of items from localStorage
  const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
  const itemCount = cartItems.length;

  // Update the cart item count in the span
  cartItemCountElement.textContent = itemCount;

  // Optionally, you can add logic to show/hide the count based on whether there are items in the cart
  if (itemCount > 0) {
    cartItemCountElement.style.display = 'inline'; // Show the count
  } else {
    cartItemCountElement.style.display = 'none'; // Hide the count when there are no items
  }
}
