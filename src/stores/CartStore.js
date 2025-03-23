import { get } from "@vueuse/core";
import { defineStore } from "pinia";

export const useCartStore = defineStore('cartStore', {
    state: ()=> {

        const savedCart = localStorage.getItem('vueCart')
        return {
            cart: savedCart ? JSON.parse(savedCart) : [],
            // subtotal: 0,
            // taxPrice: 0,
            // total: 0,
            checkoutStatus: 'idle',
            checkoutError: null
        }
    },
    getters: {
        cartTotal() {
            return this.cart.reduce((acc, item) => acc + item.price, 0)
        },
        getCartItems() {
            return this.cart
        },
        getCartCount() {
            return this.cart.length
        }
    },
    actions: {
        addToCart(product) {
            const itemIndex = this.cart.findIndex(item => item.id === product.id)
           
            if(itemIndex >= 0){
                this.cart[itemIndex].cartQuantity += product.cartQuantity
            }else {
                this.cart.push({...product, cartQuantity: product.cartQuantity})
            }
            localStorage.setItem('vueCart', JSON.stringify(this.cart))
        },
        removeFromCart(product) {
            this.cart = this.cart.filter(item => item.id !== product.id)
            localStorage.setItem('vueCart', JSON.stringify(this.cart))
        },
        increaseQuantity(product){
            const itemIndex = this.cart.findIndex(item => item.id === product.id)
            if(itemIndex >= 0){
                this.cart[itemIndex].cartQuantity += 1
            }
            localStorage.setItem('vueCart', JSON.stringify(this.cart))
        },
        decreaseQuantity(product){
            const itemIndex = this.cart.findIndex(item => item.id === product.id)
            if(itemIndex >= 0){
                if(this.cart[itemIndex].cartQuantity > 1){
                    this.cart[itemIndex].cartQuantity -= 1
                }else {
                    this.cart = this.cart.filter(item => item.id !== product.id)
                }
            }
            localStorage.setItem('vueCart', JSON.stringify(this.cart))
        },
        clearCart(){
            this.cart = []
            localStorage.setItem('vueCart', JSON.stringify(this.cart))
        },
        async submitOrder({  title, eventDate, itemsPrice, taxPrice, totalPrice }) {
            this.checkoutStatus = 'pending'

            try {

                const response = await fetch(`https://tentlify-ecom.up.railway.app/api/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({title, orderItems: this.cart, eventDate, itemsPrice, taxPrice, totalPrice })
                })
                
            } catch (error) {
                console.log('Error submitting order:', error)
                this.checkoutStatus = 'error'
                this.checkoutError = error.message
            } finally {
                this.checkoutStatus = 'idle'
            }
        },
        // async sendEmail( cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title ) {
        //     this.checkoutStatus = 'pending'

        //     console.log("DATA COMING IN: ", cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title)

        //     try {
                
        //         const response = await fetch(`https://tentlify-ecom.up.railway.app/api/mail/send`, {
        //             method: 'POST',
        //             headers: {
                        
        //                  "Access-Control-Allow-Origin": "*",
        //                'Content-Type': 'application/json',
                        
        //            },
        //             body: JSON.stringify({ cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title }),
                    
        //         })

        //         const data = await response.json().catch(() => ({}));
        //         return data;

        //     } catch (error) {
        //         console.error("Email send error:", error);
        //         throw error; 
        //     } finally {
        //         this.checkoutStatus = 'idle'
        //     }
        // }
        async sendEmail(cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title) {
            this.checkoutStatus = 'pending';
        
            try {
                console.log("Sending email with params:", {
                    cartItems: Array.isArray(cartList) ? cartList.length : 0,
                    email, selected, title
                });
                
                const response = await fetch(`https://tentlify-ecom.up.railway.app/api/mail/send`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'  // Note: lowercase 't' in Content-type to match Svelte
                    },
                    body: JSON.stringify({ 
                        cartList, 
                        subtotal, 
                        deliveryFee, 
                        taxPrice, 
                        total, 
                        email, 
                        selected, 
                        title 
                    })
                });
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error response body:", errorText);
                    throw new Error(`Server error: ${response.status}`);
                }
                
                const data = await response.json().catch(() => ({}));
                this.checkoutStatus = 'success';
                return data;
                
            } catch (error) {
                console.error("Email send error:", error);
                this.checkoutStatus = 'error';
                this.checkoutError = error.message;
                throw error;
            } finally {
                this.checkoutStatus = 'idle';
            }
        }
    }
})