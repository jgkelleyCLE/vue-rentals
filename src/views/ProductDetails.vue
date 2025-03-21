<script setup>
import PageSpinner from '@/components/custom/Loading/PageSpinner.vue';
import { useCartStore } from '@/stores/CartStore';
import { useProductStore } from '@/stores/ProductStore';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue-sonner';

const route = useRoute()
const id = ref(route.params.id)
let quantity = ref(1)
const productStore = useProductStore()
const cartStore = useCartStore()

onMounted( async()=> {
     await productStore.fetchProduct(id.value)
})

const product = computed(() => productStore.product);


console.log('product:', product)

const cartHandler = (product) => {
    if(quantity.value < 1){
        toast.error('Quantity must be at least 1')
        return
    }else {
        cartStore.addToCart({...product, cartQuantity: quantity})
        toast.success(`${quantity.value} - ${product.product} added to cart`)
    }

}

</script>

<template>
    
    <div class="mt-20 mx-auto w-11/12">

        <div v-if="productStore.isLoading">
            <PageSpinner />
        </div>

<div v-else class="flex gap-2 mt-2 flex-col lg:flex-row items-start  ">
    <!-- LEFT SIDE  -->
    <div  class="lg:w-1/2 w-full  ">
      <img width={1000} height={600} class="w-full rounded-md max-h-[700px] object-contain" :src="product?.image" alt="product?.product" />
    </div>

    <!-- RIGHT SIDE  -->
    <div class=" flex flex-col items-start p-4 rounded-md bg-gray-200 dark:bg-gray-600 max-h-[600px] lg:w-1/2 w-full">
      <h1 class="text-2xl font-bold">{{product?.product}}</h1>
      <h1 class="text-gray-600 dark:text-gray-300 font-semibold my-4">${{product?.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</h1>
      
      
      <input type="number" class="w-full max-w-[300px] p-2 text-black font-bold text-xl rounded-md dark:bg-gray-400" placeholder="Qty" v-model="quantity" />
      <button aria-label="`Add product to cart`" class='w-full max-w-[300px] bg-green-400 hover:bg-green-500 font-bold p-2 rounded-md mt-2 transition duration-300' @click="()=> cartHandler(product)"> Add to Cart</button>
      
    </div>
  </div>

</div>
 

</template>