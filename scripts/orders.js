import { loadProductsFetch, matchingProduct } from "../data/products.js";
import { arrivingDate } from "../data/deliveryOptions.js";
import { priceToCents } from "../scripts/utility/price.js";

class Orders {
    orders;


    constructor(){
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
    }

    AddToOrders(newItem){
        this.orders.unshift(newItem);
        console.log(this.orders);
        localStorage.removeItem('new-cart');
        this.#saveToStorage();
    }

    #saveToStorage(){
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }
}




export const itemsOrder = new Orders();


function orderHistory(){
    let html = '';
    console.log(itemsOrder.orders)

    itemsOrder.orders.forEach((element, i) => {
        html+=`
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${arrivingDate(element.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${priceToCents(element.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${element.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            
            ${renderOrderItems(i)}

          </div>
          
        </div>
        `
    });
    return html;

}



function renderHistory(html) {
    document.querySelector('.orders-grid').innerHTML = html ;
}

function renderOrderItems(i) {
    let html='';
    let matchingItem;
   
    itemsOrder.orders[i].products.forEach(element =>{

      matchingItem = matchingProduct(element.productId);
      console.log()
      
      html+=`<div class="product-image-container">
              <img src="../${matchingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arrivingDate(element.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${element.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            `
    })
    
    return html;
    
}

loadProductsFetch().then(()=>{
  renderHistory(orderHistory());
})

