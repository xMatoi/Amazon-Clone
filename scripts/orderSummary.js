import { cart, updateQuantity } from "../data/cart.js";
import { clientCart } from "../data/cart-class.js";
import { products } from "../data/products.js";
import { priceToCents } from "./utility/price.js";
import { deliveryOptions   } from "../data/deliveryOptions.js";
import { deliveryDatePicker } from "../data/deliveryOptions.js";
import { deliveryOptionPrice } from "../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderItems() {
    let HTMLContent = '';
    let cartQuantity = 0;

    

    clientCart.cartItems.forEach((element) => {
        cartQuantity += element.quantity

        products.forEach((product, index)=>{
            if (element.productId === product.id) {
                
            HTMLContent+=`<div class="cart-item-container data-product-indexd="${index}">
            <div class="delivery-date">
              Delivery date: ${deliveryDatePicker(element.deliveryId-1)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                $${priceToCents(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label label-${product.id}">${element.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary update-${product.id}" data-product-id="${product.id}">
                    Update
                  </span>
                 <input class="quantity-input quantity-${product.id}" name="quantity-input"> 
                 <span class="save-quantity-link link-primary save-${product.id}" data-product-id="${product.id}">Save</span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>


                <div class = "delivery-option-render">
                  ${renderDates(product.id, product.id)}

                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
        
            }
        })

        document.querySelector('.order-summary').innerHTML = HTMLContent;
        document.querySelector('.return-to-home-link').innerHTML = cartQuantity;
        
    });

    addEventListeners();
}



function renderDates(id, productId) {
  let HTMLContent = '';
  let deliveryPicked = 0;
  
  clientCart.cartItems.forEach((item)=>{
        if (productId === item.productId) {
          deliveryPicked = item.deliveryId;
        }
      })

      const isChecked = deliveryPicked;

  deliveryOptions.forEach((element, i)=>{
    
      const newDate  = deliveryDatePicker(i);
      const price = deliveryOptionPrice(i);

      

      HTMLContent += `<div class="delivery-option" data-delivery-option = "${i}" data-product-id="${productId}" 
      >
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${id}" ${isChecked === Number(element.id) ? 'checked': ''}>
                    <div>
                      <div class="delivery-option-date option-${element.id}">
                        ${newDate}
                      </div>
                      <div class="delivery-option-price">
                        ${price} Shipping
                      </div>
                    </div>
                    </div>`;

      
  })


  return HTMLContent;
  

}




renderItems();





function addEventListeners() {
  const delivery = document.querySelectorAll('.delivery-option');
  const btns = document.querySelectorAll('.delete-quantity-link');
  const updateBtn = document.querySelectorAll('.update-quantity-link');
  const saveBtn = document.querySelectorAll('.save-quantity-link');

  
  delivery.forEach(element => {
        const {deliveryOption} = element.dataset;
        const {productId} = element.dataset;
        let itemNumber = 0;
        
        clientCart.cartItems.forEach((item, i)=>{
            if (productId === item.productId) {
               itemNumber = i
            }
        })
        element.addEventListener('click', ()=>{
            console.log('Done');
            updateDelivery(deliveryOption, itemNumber); 
                
        })
    });

    btns.forEach((cartItem, i)=>{
    cartItem.addEventListener('click', ()=>{
        removeItem(i);
    })

})

 updateBtn.forEach(element=>{
      const {productId} = element.dataset;
      element.addEventListener('click', ()=>{
        document.querySelector(`.save-${productId}`).classList.add('is-editing');
        document.querySelector(`.quantity-${productId}`).classList.add('is-editing');
        
        element.classList.toggle('is-not-editing');
        document.querySelector(`.label-${productId}`).classList.add('is-not-editing');

      })
    })

    saveBtn.forEach(element=>{
        const {productId} = element.dataset

        element.addEventListener('click', ()=>{
       

        let quantity = Number(document.querySelector(`.quantity-${productId}`).value);
        console.log(quantity);  
        clientCart.updateCart(productId, quantity);
        updateItems(productId);
      })
    })

}
    
function updateItems(productId) {
    document.querySelector(`.update-${productId}`).classList.remove('is-not-editing');
    document.querySelector(`.label-${productId}`).classList.remove('is-not-editing');
    document.querySelector(`.save-${productId}`).classList.remove('is-editing');
    document.querySelector(`.quantity-${productId}`).classList.remove('is-editing');

    renderItems();
    renderPaymentSummary();

}
 


function updateDelivery(deliveryOption, itemNumber) {
    clientCart.cartItems[itemNumber].deliveryId = Number(deliveryOption)+1;
    console.log('Option updated!');
    clientCart.saveToStorage();
    renderItems();
    renderPaymentSummary();
}




function removeItem(i) {
    

    clientCart.cartItems.splice(i, 1);

    clientCart.saveToStorage();
    
    renderItems();
    renderPaymentSummary();
}



