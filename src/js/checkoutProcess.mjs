import ExternalServices from './ExternalServices.mjs';
import { getLocalStorage } from './utils.mjs';
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const itemFormat = items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1,
    };
  });
  return itemFormat;
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
}
const services = new ExternalServices();
export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(
      this.outputSelector + ' #subTotal'
    );

    // const itemNumElement = document.querySelector(
    //   this.outputSelector + " #cartTotal"
    // );
    // itemNumElement.innerText = this.list.length;
    const amounts = this.list.map((item) => item.FinalPrice);
    console.log(amounts);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = '$' + this.itemTotal;
  }

  calculateOrdertotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const shipping = document.querySelector(this.outputSelector + ' #shipping');
    const tax = document.querySelector(this.outputSelector + ' #tax');
    const orderTotal = document.querySelector(
      this.outputSelector + ' #orderTotal'
    );
    shipping.innerText = '$' + this.shipping;
    tax.innerText = '$' + this.tax;
    orderTotal.innerText = '$' + this.orderTotal;
  }
  async checkout() {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const formElement = document.forms['checkout'];
    const formJSON = formDataToJSON(formElement);
    formJSON.orderDate = new Date();
    formJSON.orderTotal = this.orderTotal;
    formJSON.tax = this.tax;
    formJSON.shipping = this.shipping;
    formJSON.items = packageItems(this.list);
    console.log(formJSON);
    // call the checkout method in our ExternalServices module and send it our data object.
    const res = await services.checkout(formJSON);
  }
}
