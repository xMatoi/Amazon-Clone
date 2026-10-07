import { renderItems } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { loadProducts } from "../data/products.js";


loadProducts(()=>{
    renderItems();
    renderPaymentSummary();
});

