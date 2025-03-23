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
import { useMutation } from '@tanstack/vue-query';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';

let open = ref(false)

let props = defineProps({
    item: Object,
    // required: true,
    // default: ()=> ({
    //     product: '',
    //     category: '',
    //     price: 0,
    //     tags: ''
    // })
})

let formData = ref({
    tags: props.item.tags || ''
})

const updateProduct = useMutation({
  mutationFn: async()=> {
    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/tags/${props.item._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tags: formData.value.tags })
            })
            const data = await response.json()
            return data
  },
  onSuccess: ()=> {
    toast.success('Product updated successfully')
  },
  onError: (error)=> {
    toast.error('An error occurred while updating product')
    console.log("ERROR: ", error)
  }
})

// Create a local copy of the product to edit
const product = ref({...props.item});
console.log("PRODUCT: ", product.value)

onMounted(() => {
  product.value = {...props.item};
});

const submitHandler = (e) => {
    e.preventDefault();
    console.log("SUBMITTED")

    updateProduct.mutate()

    open.value = false

}

</script>

<template>
<Dialog v-model:open="open">
    <DialogTrigger class="text-blue-500">
      Edit
    </DialogTrigger>
    <DialogContent class="w-full ">
      <DialogHeader>
        <DialogTitle>Edit {{ props.item.product }}</DialogTitle>
        <DialogDescription>
        </DialogDescription>
      </DialogHeader>
<div class="w-full">


      <form class="flex flex-col  w-full" @submit="submitHandler">
        <label for="product">Product</label>
        <input type="text" id="product" name="product" class="w-full p-2 rounded-md text-primary" :disabled="true" v-model="props.item.product">
        <label for="category">Category</label>
        <input type="text" id="category" name="category" class="w-full p-2 rounded-md text-primary" :disabled="true" v-model="props.item.category">
        <label for="price">Price</label>
        <input type="text" id="price" name="price" class="w-full p-2 rounded-md text-primary" :disabled="true" v-model="props.item.price">
        <label for="image">Tags</label>
        <textarea type="text" id="image" name="image" class="w-full p-2 rounded-md text-gray-700" v-model="formData.tags" placeholder="Enter tags separated by commas"></textarea>
        <button class="bg-safariGreen p-2 rounded-md mt-1" type="submit">Update</button>
      </form>
    </div>

      
    </DialogContent>
  </Dialog>

</template>