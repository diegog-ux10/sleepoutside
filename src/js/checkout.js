import CheckoutProcess from "./checkoutProcess.mjs";
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart', '.order-summary');

checkout.init();


document.querySelector('#zip').addEventListener('blur', () => {
    // console.log('asd');
    checkout.calculateOrdertotal();
})
document.querySelector('#checkoutBtn').addEventListener('click', (e)=>{
    e.preventDefault();
    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status)
        checkout.checkout();
});


