export const getProducts = async() => {

    try {
        
        const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products`)
        const products = await response.json()

        if(!response.ok){
            throw new Error('Failed to fetch products!')
        }

        return products

    } catch (error) {
        
        console.log('Error fetching products:', error)
        throw new Error('Failed to fetch products!')

    }

}

export const updateProductStatus = async(id, status) => {

    try {
        
        const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ status })
        })

    } catch (error) {
        
        console.log('Error updating product status:', error)
        throw new Error('Failed to update product status!')

    }

}

export const searchProducts = async(query) => {

    console.log('Searching for:', query)

    try {
        
        const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/search?q=${encodeURIComponent(query)}`)

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }

        const products = await response.json()
        return products

    } catch (error) {
        console.log('Search API error:', error)
        throw new Error('Failed to search products!')
    }

}