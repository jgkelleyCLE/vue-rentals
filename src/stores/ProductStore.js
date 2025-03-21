import { defineStore } from "pinia";

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [],
        isLoading: false,
        error: null,
        product: null
    }),
    getters: {
        currentProduct: (state) => state.product
    },
    actions: {
        async fetchProducts() {
            this.isLoading = true
            this.error = null

            try {

                const response = await fetch('https://tentlify-ecom.up.railway.app/api/products')

                    if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const products = await response.json()
                this.products = products
                
            } catch (error) {
                console.log('Error fetching products:', error)
                this.error = error.message
            } finally {
                this.isLoading = false
            }

        
        },
        async fetchProduct(id) {
            this.isLoading = true
            this.error = null

            try {
                
                const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/${id}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const product = await response.json()  
                this.product = product
                this.isLoading = false

            } catch (error) {
                console.log('Error fetching product:', error)
                this.error = error.message
            }finally {
                this.isLoading = false
            }
        },
        async fetchProductCategory(slug){
            this.isLoading = true
            this.error = null

            try {
                
                const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/category/${slug}`)

                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const products = await response.json()
                this.products = products
                this.isLoading = false

            } catch (error) {
                console.log('Error fetching product:', error)
                this.error = error.message
            }finally {
                this.isLoading = false
            }
        }
    }
})