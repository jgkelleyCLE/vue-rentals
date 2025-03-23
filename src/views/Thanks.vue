<script setup>
import { OhVueIcon } from 'oh-vue-icons';
import { ViFileTypeVue } from "oh-vue-icons/icons";
import { addIcons } from 'oh-vue-icons';

addIcons(ViFileTypeVue);
</script>

<template>
<div class="flex items-center justify-center h-screen relative">
    <!-- IMAGE BACKGROUND -->
    <img 
        width={1200} 
        height={900} 
        alt="hero" 
        draggable="false" 
        src="https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/media%2FGreekFestivalOverhead.jpg?alt=media&token=a9ec3aa2-0747-489b-ae6d-b62af5996ff0" 
        class="w-full h-[100vh] object-cover absolute top-0 left-0" 
    />

    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2 z-40 w-[90%] max-w-[700px] bg-black/80 p-6 rounded-lg text-gray-200">
        <div class="relative w-[150px]">
            <img 
                src="../assets/Tenlify_Logo_Thin_Small.png" 
                alt="Tentlify Rentals" 
                width="150" 
                height="50" 
                class="w-full" 
            />
            
            <OhVueIcon 
                name="vi-file-type-vue" 
                class="absolute top-7 md:-right-2 right-0 w-6 h-6 md:w-8 md:h-8 text-blue-400 opacity-75 z-10" 
            />
        </div>
        <h1 class="text-2xl text-center">Thank you for your interest in Tentlify Rentals!</h1>
        <!-- <p>Your email will arrive momentarily.</p> -->
        <p class="italic text-center">This is a fictitious website to test and learn the benefits of SEO.</p>
        
        <a 
            class="bg-safariGreen hover:bg-safariGreenHover p-2 px-6 rounded-md text-white transition duration-300 font-bold mt-8" 
            href="/"
        >
            Return to Home
        </a>
    </div>
    
    
</div>


</template>