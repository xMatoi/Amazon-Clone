
import { clientCart } from "../data/cart-class.js";
import { itemsOrder } from "../scripts/orders.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { matchingProduct, products } from "../data/products.js";
import { priceToCents } from "./utility/price.js";
import { cart } from "../data/cart.js";



export function renderPaymentSummary() {
   let HTMLContent = '';
   let cartQuantity = 0;

   clientCart.cartItems.forEach((element) => {
    cartQuantity+=element.quantity;
   });

   HTMLContent = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${calculateItemTotal()}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${calculateShipping()}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money" id='before-tax'></div>
          </div>

          <div class="payment-summary-row">
            <div >Estimated tax (10%):</div>
            <div class="payment-summary-money" id="tax"></div>
          </div>

          <div class="payment-summary-row total-row">
            <div >Order total:</div>
            <div class="payment-summary-money" id="total"></div>
          </div>

          <button class="place-order-button button-primary order-btn">
            Place your order
          </button>`

          document.querySelector('.payment-summary').innerHTML = HTMLContent;
          calculateTotal();
          addEventListeners();
}



function calculateItemTotal() {
    let itemTotal = 0;
    let matchingItem;

    clientCart.cartItems.forEach(item =>{

        matchingItem = matchingProduct(item.productId);

        if (matchingItem) {
            itemTotal+= matchingItem.priceCents;        
        }

        })

        return priceToCents(itemTotal);
        
    }
        

function calculateShipping() {
    let matchingItem;
    let shippingTotal = 0;
    clientCart.cartItems.forEach(item =>{
        deliveryOptions.forEach(option =>{
            if (item.deliveryId === Number(option.id)) {
                matchingItem = option;
                
            }
        })

        if (matchingItem) {
            shippingTotal += matchingItem.priceCents; 
        }

    
    })
    
    return priceToCents(shippingTotal);
}

function calculateTotal() {
    let totalBeforeTax = calculateItemTotal() + calculateShipping();
    
    let tax = Number((totalBeforeTax * 0.1).toFixed(2));

    let orderTotal = (totalBeforeTax + tax).toFixed(2);

    document.getElementById('before-tax').innerHTML = `$${Number(totalBeforeTax.toFixed(2))}`;
    document.getElementById('tax').innerHTML = `$${tax}`;
    document.getElementById('total').innerHTML = `$${orderTotal}`;
}

//renderPaymentSummary();
//calculateItemTotal();
//calculateShipping();



function addEventListeners() {

  document.querySelector('.order-btn')
    .addEventListener('click', async()=>{
      try {
        const response = await fetch('https://supersimplebackend.dev/orders',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: clientCart.cartItems
        })  
         });

        const order = await response.json();
        
         itemsOrder.AddToOrders(order);

         window.location.href = 'orders.html';

      } catch (error) {
        console.log('Unexpected Error', error);
      }
      });

      
  
}


