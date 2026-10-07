import { renderItems } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {
    try{
        await loadProductsFetch();
        renderItems();
        renderPaymentSummary();
    } catch (e) {
        console.log('An error has ocurred', e);
    }
}

loadPage();
/*loadProducts(()=>{
    renderItems();
    renderPaymentSummary();
});*/

