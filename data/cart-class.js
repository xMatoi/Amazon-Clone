import { matchingProduct } from "./products.js";

class Cart {

    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    };

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    };

    saveToStorage(){

        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));

    };

    addToCart(btns, amount){
        
        btns.forEach((product, i)=>{
            product.addEventListener('click', ()=>{
                const selectedvalue = Number(amount[i].value);
                const productId = product.dataset.productId;
                let matchingItem;
                let cartQuantity = 0;
        
                
        
                this.cartItems.forEach((item)=>{
                    if (item.productId === productId) {
                        matchingItem = item;
                        
                    }
                    cartQuantity+=item.quantity;
                    
                });
        
                if (matchingItem) {
                    matchingItem.quantity+=selectedvalue;
                    cartQuantity+=selectedvalue;
                }else{    
                    
                 this.cartItems.push({
                    productId, 
                    quantity: selectedvalue,
                    deliveryId: 1}
                )
                    cartQuantity+=selectedvalue;
               }
        
               
               document.querySelector('.cart-quantity').innerHTML = cartQuantity;

               
               this.saveToStorage();
    
            })

        })
    }

    showCartQuantity(){
        let cartQuantity = 0;
        this.cartItems.forEach((item)=>{
            cartQuantity+=item.quantity
        })
    }


    updateCart(id, quantity){
        let matchingItem;
        let itemNumber;
       this.cartItems.forEach((element, i)=>{
            if (id === element.productId) {
                matchingItem = matchingProduct(element);
                itemNumber = i;
            }
            
        })

        if (matchingItem.id === id){
            
            this.cartItems[itemNumber].quantity = quantity;
            this.saveToStorage();
            return;
            
        }
    }

};

export const clientCart = new Cart('new-cart');
console.log(clientCart);