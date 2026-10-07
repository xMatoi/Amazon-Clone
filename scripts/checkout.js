import { renderItems } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {
    await loadProductsFetch();
    renderItems();
    renderPaymentSummary();
}

loadPage();
/*loadProducts(()=>{
    renderItems();
    renderPaymentSummary();
});*/

