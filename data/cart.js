import { products } from "../data/products.js";

export const cart = [];

export function addProducts(btns, amount) {

    




    btns.forEach((product, i)=>{
    product.addEventListener('click', ()=>{
        const selectedvalue = amount[i].value;
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
            matchingItem.quantity++;
            cartQuantity++;
        }else{    
         cart.push({
            productId: products[i].id, 
            quantity: 1}
        )
            cartQuantity++;
       }

       


    
       
       console.log(cartQuantity);
       document.querySelector('.cart-quantity').innerHTML = cartQuantity;
       console.log(cart);
       console.log('The amount is ', selectedvalue)
    })
})
}