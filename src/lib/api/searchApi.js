export const createSearch = async(data) => {

    console.log("SEARCH DATA COMING IN: ", data)

    try {
        
        const response = await fetch(`https://tentlify-ecom.up.railway.app/api/search`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed to record search');
          }
        
          return response.json();

    } catch (error) {
        
        console.log(error);

    }

}