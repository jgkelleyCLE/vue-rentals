<script setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCartStore } from '@/stores/CartStore';
  import { ref, defineProps } from 'vue';
import { toast } from 'vue-sonner';


const props = defineProps({
    subtotal: Number,
    taxPrice: Number,
    total: Number,
    deliveryFee: Number
})

const cartStore = useCartStore()
const cartItems = cartStore.cart

console.log('Props subtotal:', props.subtotal)

let date = ref('')
let email = ref('')
let title = ref('')

const submitHandler = async(e) => {
    e.preventDefault()

    console.log('Date:', date.value)
    console.log('Email:', email.value)
    console.log('Event Name:', title.value)

    if(!title.value){
        toast.error('Please enter a title')
        return
    }else if(!date.value){
        toast.error('Please enter a date')
        return
    }else if(!email.value){
        toast.error('Please enter an email')
        return
    }else {

        try {

           const result = await cartStore.sendEmail({
                cartList: cartItems,
                subtotal: props.subtotal,
                deliveryFee: props.deliveryFee,
                taxPrice: props.taxPrice,
                total: props.total,
                email: email.value,
                selected: date.value,
                title: title.value
        })

        if(result.success){
            toast.success('Email sent successfully')
            title.value = ''
            date.value = ''
            email.value = ''
        }else {
            toast.error(`Failed to send quote: ${result.error}`)
        }
            
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`)
        }
        // cartStore.submitOrder({
        //     title: title.value,
        //     eventDate: date.value,
        //     orderItems: cartItems,
        //     itemsPrice: props.subtotal,
        //     taxPrice: props.taxPrice,
        //     totalPrice: props.total
        // })

        
    }

    
}

</script>

<template>

<Dialog >
    <DialogTrigger class="w-full">
      <button class="bg-blue-500 hover:bg-blue-600 transition duration-300 p-2 rounded-md w-full text-white">Email Quote</button>
    </DialogTrigger>
    <DialogContent class="">
      <DialogHeader>
        <DialogTitle>Email Quote</DialogTitle>
        <DialogDescription>
          
        </DialogDescription>
      </DialogHeader>

      <form class="w-full flex flex-col items-start gap-2" @submit="submitHandler">
        <div class="flex flex-col w-full">
            <label for="name">Title</label>
            <input type="text" id="name" name="name" v-model="title" class="w-full p-2 rounded-md text-gray-700 font-bold" placeholder="Event Name" />
        </div>

        <div class="flex flex-col w-full">
            <label for="eventDate">Event Date</label>
            <input type="date" id="eventDate" v-model="date" class="w-full p-2 rounded-md text-gray-700 font-bold" />
        </div>

        <div class="flex flex-col w-full">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="email" placeholder="Email" class="w-full p-2 rounded-md text-gray-700 font-bold" />
        </div>

        <button type="submit" class="w-full bg-safariGreen hover:bg-safariGreenHover transition duration-300 p-2 rounded-md">Submit</button>
      </form>

      
    </DialogContent>
  </Dialog>

</template>