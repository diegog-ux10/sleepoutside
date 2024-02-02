import CheckoutProcess from "./checkoutProcess.mjs";

const checkout = new CheckoutProcess('so-cart', '.order-summary');

checkout.init();


document.querySelector('#zip').addEventListener('blur', () => {
    console.log('asd');
    checkout.calculateOrdertotal();
})
document.querySelector('#checkoutBtn').addEventListener('click', (e)=>{
    e.preventDefault();
    checkout.checkout();
})


