<script setup>
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import Searchbar from '../components/custom/Search/Searchbar.vue'

const homeImages = [
		"https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/FlatsCoverWebP.webp?alt=media&token=27e98ee5-049a-44e5-8f37-151c3f1f2619",
    	"https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/EdgewaterCoverWebP.webp?alt=media&token=88867055-ee83-497a-b8b7-29f907b464a2",
    	"https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/KSUCoverWebP.webp?alt=media&token=c08f29e7-04e2-4a11-8695-e547ed92c834"
	]

	const rotatingWords = [
		"Corporate Event",
		"Wedding",
		"Church Picnic",
		"Graduation"
	]

	let currentWordIndex = ref(0)
	let currentImageIndex = ref(0)
	let fade = ref(true)

	let wordInterval;
    let imageInterval;
    let fadeOutInterval;
    let fadeInInterval;

    onMounted(() => {
    // Set up intervals when component mounts
    wordInterval = setInterval(() => {
        currentWordIndex.value = (currentWordIndex.value + 1) % rotatingWords.length;
    }, 3000);

    imageInterval = setInterval(() => {
        // Start fade out
        fade.value = false;
        
        // Change image and fade in after a short delay
        setTimeout(() => {
            currentImageIndex.value = (currentImageIndex.value + 1) % homeImages.length;
            fade.value = true;
        }, 1000);
    }, 5000);
});

// This is like the cleanup function in useEffect
onUnmounted(() => {
    clearInterval(wordInterval);
    clearInterval(imageInterval);
});


</script>

<template>
    <div class="flex items-center justify-center w-full h-[100vh] relative">
	
	<img 
	width="1200" 
	height="800" 
	:src="homeImages[currentImageIndex]" 
	
	alt="Home Images" 
	class="w-full h-[100vh] object-cover absolute top-0 left-0 select-none pointer-events-none z-10" />

	<!-- IMAGE OVERLAY -->
	<div class="absolute top-0 left-0 w-full h-[100vh] bg-black/55 z-10">


	<!-- ROTATING WORDS CONTAINER -->
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10 w-[100%]">
		<div class="flex flex-col items-center mx-4">
		<h1 class="text-white md:text-6xl text-4xl my-5 font-thin ">Everything for your</h1>
		
		<h1 class="text-white md:text-5xl text-3xl uppercase font-bold mb-5">
					{{rotatingWords[currentWordIndex]}}
			</h1>
	</div>

	<Searchbar />
		
		</div>

</div>

</div>
</template>