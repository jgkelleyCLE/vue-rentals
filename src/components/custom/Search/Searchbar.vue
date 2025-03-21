<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { HiSearch } from "oh-vue-icons/icons";
import { OhVueIcon } from "oh-vue-icons";
import { addIcons } from 'oh-vue-icons';
import { toast } from 'vue-sonner'

addIcons(HiSearch);



const router = useRouter()
let query = ref('')

const handleSearchSubmit = (e) => {
    e.preventDefault()

    if(query.value === ""){
        toast.error("Please enter a search term")
        return
    } else {
        console.log('searching for:', query.value)
        router.push(`/search?q=${encodeURIComponent(query.value)}`)
        
        query.value = "" 
    }


}
</script>

<template>

<div class=" flex items-center justify-center w-[95%] max-w-[600px] ">
    <form class="flex items-center w-full" @submit="handleSearchSubmit">
        <input v-model="query"  placeholder='Search our products...' class="p-3 rounded-l-md text-gray-700 placeholder-gray-600 text-2xl bg-white/60 outline-none h-12 z-0 w-[95%]" />
        <button aria-label="Submit Search" type="submit" class="flex items-center gap-2 rounded-r-md bg-white p-3.5" title="Search">
            <OhVueIcon name="hi-search" color="black" />
        </button>
        </form>
    </div>
</template>