import { matchingProduct, products } from "../data/products.js";

export const cart = JSON.parse(localStorage.getItem('cart')) || [];

function cartItemQuantity() {
    let cartQuantity = 0;
    cart.forEach((item)=>{
        cartQuantity+=item.quantity
    })

    
}



export function addProducts(btns, amount) {

    btns.forEach((product, i)=>{
    product.addEventListener('click', ()=>{
        const selectedvalue = Number(amount[i].value);
        const productId = product.dataset.productId;
        let matchingItem;
        let cartQuantity = 0;

        

        cart.forEach((item)=>{
            if (item.productId === productId) {
                matchingItem = item;
                
            }
            cartQuantity+=item.quantity;
            
        });

        if (matchingItem) {
            matchingItem.quantity+=selectedvalue;
            cartQuantity+=selectedvalue;
        }else{    
         cart.push({
            productId: products[i].id, 
            quantity: selectedvalue,
            deliveryId: 1}
        )
            cartQuantity+=selectedvalue;
       }

       
       document.querySelector('.cart-quantity').innerHTML = cartQuantity;
       console.log(cart);

       localStorage.setItem('cart', JSON.stringify(cart));

    })
})
}


export function updateQuantity(id, quantity) {
    let matchingItem;
    let itemNumber;
    cart.forEach((element, i)=>{
        if (id === element.productId) {
            matchingItem = matchingProduct(element);
            itemNumber = i;
        }
       
    })

    if (matchingItem.id === id){
        
            cart[itemNumber].quantity = quantity;
            console.log('Updated Quantity!');
            localStorage.setItem('cart', JSON.stringify(cart));
            return;
        
    }
}
cartItemQuantity();