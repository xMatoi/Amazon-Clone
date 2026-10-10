import { renderItems } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { loadProductsFetch, matchingProduct } from "../data/products.js";
import { itemsOrder } from "../scripts/orders.js";
import { products } from "../data/products.js";

import { arrivingDate } from "../data/deliveryOptions.js";

async function loadPage() {
    try{
        await loadProductsFetch();
        console.log('Primero esto');
        renderItems();
        renderPaymentSummary();
    } catch (e) {
        console.log('An error has ocurred', e);
    }
}

loadPage().then(()=>{
    let orders = itemsOrder.orders;

        orders.forEach(element => {
        let matchingProd;
        element.products.forEach(item=>{
            matchingProd =  matchingProduct(item.productId);
            if (matchingProd) {
            console.log(matchingProd.name);
            }
        })

        console.log(matchingProd);
        });
});









