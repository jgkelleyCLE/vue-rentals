export const updateOrderStatus = async(id, status) => {

    console.log('updateOrderStatus', id, status)

    try {
        const response = await fetch(`https://tentlify-ecom.up.railway.app/api/orders/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status})
        })

        if (!response.ok) {
            throw new Error('Failed to update order status!');
        }


    

    } catch (error) {
        
        console.log('Error updating order status:', error)

    }
    
    

}