import axios from 'axios'

export const sendEmail = async (cart, subtotal, deliveryFee, taxPrice, total, email, selected, title) => {

    console.log("DATA COMING IN: ", cart, subtotal, deliveryFee, taxPrice, total, email, selected, title)

    try {
      const response = await fetch(`https://tentlify-ecom.up.railway.app/api/mail/send`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ cart, subtotal, deliveryFee, taxPrice, total, email, selected, title })
      });
      
      const data = await response.json();
        return data;
    } catch (error) {
      console.error("Email send error:", error);
      throw error;
    }
  };

  export const sendEmailWithAxios = async (cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title) => {


    console.log("AXIOS DATA COMING IN: ", cartList, subtotal, deliveryFee, taxPrice, total, email, selected, title)

    try {
        const response = await axios.post(
            'https://tentlify-ecom.up.railway.app/api/mail/send',
            { 
                cartList, 
                subtotal, 
                deliveryFee, 
                taxPrice, 
                total, 
                email, 
                selected, 
                title 
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        return response.data;
    } catch (error) {
        console.error("Email send error:", error);
        throw error;
    }
}

