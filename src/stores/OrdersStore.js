import { defineStore } from "pinia";


export const useOrderStore = defineStore('orderStore', {
    state: () => ({
        orders: [],
        isLoading: false,
        error: null,
        order: null
    }),
    getters: {
        currentOrder: (state) => state.order
    },
    actions: {
        async fetchOrders() {
            this.isLoading = true
            this.error = null
            try {

                const response = await fetch('https://tentlify-ecom.up.railway.app/api/orders')
                
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const orders = await response.json()
                this.orders = orders
                
            } catch (error) {
                console.log('Error fetching orders:', error)
                this.error = error.message
            } finally {
                this.isLoading = false
            }
            
        },
        async fetchOrder(id) {
            this.isLoading = true
            this.error = null
            try {
                const response = await fetch(`https://tentlify-ecom.up.railway.app/api/orders/${id}`)
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const order = await response.json()
                this.order = order
            } catch (error) {
                console.log('Error fetching order:', error)
                this.error = error.message
            } finally {
                this.isLoading = false
            }
        },
        async updateOrderStatus({ id, status }) {
            try {
                const response = await fetch(`https://tentlify-ecom.up.railway.app/api/orders/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status })
                })
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const order = await response.json()
                this.order = order
            } catch (error) {
                console.log('Error updating order status:', error)
                this.error = error.message
            }
        }
    }
})