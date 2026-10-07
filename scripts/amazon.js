import { clientCart } from "../data/cart-class.js";
import { loadProducts, products } from "../data/products.js";
import { priceToCents } from "./utility/price.js";

let htmlContent = '';
loadProducts(renderProducts);


function renderProducts() {
    products.forEach((product)=>{
        htmlContent+=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src=${product.getStarsUrl()}>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${priceToCents(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class = "product-amount">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraHTML()}
          
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`


    })

    document.querySelector('.products-grid').innerHTML = htmlContent;
    addEventListener();
    
}

function addEventListener() {
  const addBTN = document.querySelectorAll('.add-to-cart-button');
  const productQuantity = document.querySelectorAll('.product-amount');


  clientCart.addToCart(addBTN, productQuantity);
}







