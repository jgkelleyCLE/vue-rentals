<script setup>
import { useCartStore } from '@/stores/CartStore';
import { OhVueIcon } from 'oh-vue-icons';
import { addIcons } from 'oh-vue-icons';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { CoPlus, CoMinus, IoClose } from 'oh-vue-icons/icons';
import EmailModal from '@/components/custom/Email/EmailModal.vue';
import { toast } from 'vue-sonner';

addIcons(CoPlus, CoMinus, IoClose);

const router = useRouter();
let open = ref(false);

const cartStore = useCartStore();

const cartList = computed(() => cartStore.cart);
let subtotal = computed(() => cartStore.cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0));
const deliveryFee = 85.0;
let taxPrice = computed(() => subtotal.value * 0.08);
let total = computed(() => subtotal.value + deliveryFee + taxPrice.value);

const increaseQuantity = (item) => {
  cartStore.increaseQuantity(item);
};

const decreaseQuantity = (item) => {
  cartStore.decreaseQuantity(item);
};

const removeHandler = (item) => {
  cartStore.removeFromCart(item);
  toast.success(`${item.product} removed from cart`);
};
</script>

<template>
  <div class="mt-20 mx-8 w-11/12">
    <h1 class="text-2xl">Cart</h1>

    <div class="flex flex-col items-center w-11/12 mx-auto">
      <div v-if="cartList.length === 0">
        <div class="flex flex-col items-center justify-center gap-2 h-[50vh]">
          <h1 class="text-2xl">Cart is empty</h1>
          <a
            href="/product"
            class="bg-safariGreen hover:bg-safariGreenHover p-2 px-6 rounded-md text-white transition duration-300 font-bold mt-8"
            >View Products</a
          >
        </div>
      </div>

      <div v-else class="flex flex-col md:flex-row md:items-start items-center w-full mx-auto max-w-[1600px]">
        <!-- LEFT SIDE -->
        <div class="w-[95%] md:w-[65%] mx-4">
          <!-- EMPTY CART -->

          <div
            class="flex items-center justify-between p-2 shadow-md shadow-black/20 dark:bg-gray-800 bg-gray-100 w-full rounded-md my-2 relative"
            v-for="item in cartList"
          >
            <div class="flex items-start">
              <img
                width="{100}"
                height="{50}"
                class="w-32 object-fit rounded-md cursor-pointer mr-2"
                :src="item.image"
                :alt="item.product"
                @click="() => router.push(`/product/${item._id}`)"
              />

              <div class="flex flex-col items-start">
                <h1 class="text-xl font-bold cursor-pointer" @click="() => router.push(`/product/${item._id}`)">
                  {{ item.product }}
                </h1>
                <h1 class="text-lg font-semibold text-gray-600 dark:text-gray-400">
                  ${{ item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                </h1>
                <div class="flex items-center gap-2">
                  <button aria-label="decrease quantity" @click="() => decreaseQuantity(item)">
                    <OhVueIcon name="co-minus" />
                  </button>
                  <h1 class="w-[50px] border-2 border-gray-400 px-2 rounded-md">{{ item.cartQuantity }}</h1>

                  <button aria-label="increase quantity" @click="() => increaseQuantity(item)">
                    <OhVueIcon name="co-plus" />
                  </button>
                </div>
              </div>
              <button @click="() => removeHandler(item)" aria-label="`Remove product from cart`">
                <OhVueIcon
                  name="io-close"
                  class="absolute -top-1 -right-1 z-40 hover:text-white transition duration-300 dark:bg-white bg-red-500 rounded-full w-6 h-6 p-1 dark:text-red-500 text-white dark:hover:bg-red-500 hover:bg-red-500 dark:hover:text-white"
                />
              </button>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              aria-label="Remove all items from cart"
              class="bg-safariGreen hover:bg-safariGreenHover p-2 px-6 rounded-md text-white transition duration-300 font-bold mt-2 mb-2"
              @click="() => cartStore.clearCart()"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <!-- RIGHT SIDE -->

        <div
          class="w-[95%] md:w-[35%] flex flex-col items-start gap-1 p-3 shadow-md shadow-black/20 rounded-md bg-gray-200 dark:bg-gray-600 mt-1.5"
        >
          <h1>
            Subtotal: ${{ subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </h1>
          <h1>Estimated Delivery: ${{ deliveryFee }}</h1>
          <h1>Tax: ${{ taxPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</h1>

          <h1 class="font-bold">
            Total: ${{ total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </h1>

          <!-- <EmailModal subtotal={subtotal} deliveryFee={deliveryFee} taxPrice={taxPrice} total={total} /> -->

          <EmailModal :subtotal="subtotal" :deliveryFee="deliveryFee" :taxPrice="taxPrice" :total="total" />
        </div>
      </div>
    </div>
  </div>
</template>
