<script setup>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CoCart } from "oh-vue-icons/icons";
import { HiSolidShoppingCart } from "oh-vue-icons/icons";
import { MdShoppingcart } from "oh-vue-icons/icons";
import { IoClose } from "oh-vue-icons/icons";
import { OhVueIcon } from 'oh-vue-icons';
import { addIcons } from 'oh-vue-icons';
import { useCartStore } from '@/stores/CartStore';
import { computed, onMounted, ref, nextTick } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

addIcons(CoCart, MdShoppingcart, HiSolidShoppingCart, IoClose);

const router = useRouter()
let open = ref(false)

const cartStore = useCartStore()
let cartCount = computed(()=> cartStore.cart.length)

//COMPUTED -- like derived in svelte -- item removed without refresh
let cartList = computed(()=> cartStore.cart)
let subtotal = computed(()=> cartStore.cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0))


const navigateToProduct = async (productId) => {
  open.value = false;
  // Wait for UI update to complete before navigation
  await nextTick();
  // Short delay to ensure sheet closing animation has started
  setTimeout(() => {
    router.push(`/product/${productId}`);
  }, 100);
};


const removeHandler = (item) => {
  cartStore.removeFromCart(item)
}

</script>

<template>
    <Sheet v-model:open="open">
    <SheetTrigger>
        
        <OhVueIcon name="hi-solid-shopping-cart" class="cursor-pointer w-6 h-6 font-bold mr-3" />
        <span class="absolute top-1 right-2.5 bg-red-500 text-white rounded-full text-xs p-1 w-5 h-5 flex items-center justify-center">{{ cartCount }}</span>
    </SheetTrigger>
    <SheetContent class="flex flex-col max-h-screen overflow-hidden">
      <SheetHeader>
        <SheetTitle>Cart</SheetTitle>
        <SheetDescription></SheetDescription>

        <!-- EMPTY CART -->
        <div v-if="cartCount === 0" class="flex flex-col items-center justify-center py-6">
          <p class="text-gray-500 text-xl">Your cart is empty</p>
          <button @click="()=> {
            open = false;
            router.push('/product');
          }" class="bg-safariGreen p-2 rounded-md hover:bg-safariGreenHover transition duration-300 text-white font-bold mt-2">View Products</button>
        </div>
<div v-else>
        <div v-for="item in cartList" >
          <div class="md:flex relative md:my-1 -my-5 w-full">
        <button @click="()=> navigateToProduct(item._id)" :key="item._id" class="bg-gray-200 dark:bg-gray-800 dark:text-gray-200 p-2 rounded-md flex items-center justify-start cursor-pointer hover:bg-gray-100 transition duration-300 w-full" 
        
        >
          <img width={100} height={100} :src="item.image" alt="item.product" class="w-16 md:w-20 rounded-md m-2 mr-4" />
          <div class="flex flex-col">
              <h1 class="text-lg font-bold">{{item.product}}</h1>
              <h1 class="text-sm">${{item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</h1>
              <h1 class="text-sm">Qty: {{item.cartQuantity}}</h1>
          </div>
          
      </button>
      <button @click="()=> removeHandler(item)" aria-label="Open Cart"><OhVueIcon name="io-close" class=" absolute top-0 right-0 z-40 hover:text-white transition duration-300 bg-white rounded-full w-6 h-6 p-1 text-red-500 hover:bg-red-500" />
          </button>
    </div>
        </div>
      </div>
      </SheetHeader>
      <div class="absolute bottom-0 right-0 w-full p-4 bg-background flex flex-col items-end">
          
          <h1 class="text-2xl ">Subtotal: ${{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</h1>
          <button aria-label="View Quote" class="bg-safariGreen hover:bg-safariGreenHover transition duration-300 text-white p-2 rounded-md mt-2 px-4" @click="() => {
            open = false;
            router.push('/cart');
          }">View Quote</button>
        </div>
    </SheetContent>
  </Sheet>
</template>