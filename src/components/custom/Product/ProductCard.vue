<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    item: {
        type: Object,
        required: true,
        default: () => ({
            product: '',
            image: '',
            price: 0,
            _id: ''
        })
    }
});

</script>

<template>
<div key={item._id} class="flex flex-col w-full shadow-md shadow-black/20 rounded-md dark:bg-gray-800
    bg-gray-200 relative">
    <div
    @click="()=> router.push(`/product/${item._id}`)"
    
    >
    <img 
        :src="item.image"
        alt={item.product}                                    
        class="rounded-t-md w-full h-[250px] object-cover bg-white cursor-pointer"
        priority={false}
        />
    </div>
        <div class="flex flex-col items-start p-3 gap-1 w-full">
                        <div class="flex items-center gap-2">
                        <h1 class="font-semibold text-md md:text-lg lg:text-xl line-clamp-1">{{item.product}}</h1> 
                        
                        </div>
                        <h1 class="font-semibold text-gray-400 -mt-1">${{item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</h1>
                        
                        <button aria-label="View Product" class="bg-primary text-secondary p-2 rounded-md hover:bg-primary/70 transition duration-300 w-full font-bold" @click="()=> router.push(`/product/${item._id}`)">View Product</button>
        </div>
    </div>


</template>