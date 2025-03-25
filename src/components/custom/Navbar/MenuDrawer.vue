<script setup>
import { ref } from 'vue';
import { PxMenu } from 'oh-vue-icons/icons';
import { OhVueIcon } from 'oh-vue-icons';
import { ViFileTypeVue } from 'oh-vue-icons/icons';
import { addIcons } from 'oh-vue-icons';
import { useRouter } from 'vue-router';
addIcons(ViFileTypeVue);
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

addIcons(PxMenu);

const router = useRouter();

let open = ref(false);

const mobileMenuLinks = [
  {
    id: 1,
    title: 'Tents',
    image:
      'https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/7B487F91B0923473A0EC997E5C904F1F.jpg?alt=media&token=3f343ef4-d389-46ea-9b63-6623589502d5',
  },
  {
    id: 2,
    title: 'Tables',
    image: 'https://d2j6dbq0eux0bg.cloudfront.net/images/648178/1143315935.jpg',
  },
  {
    id: 3,
    title: 'Chairs',
    image:
      'https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/IMG_0059.jpg?alt=media&token=91cb8946-1828-4f36-9775-dc5d49574d4a',
  },
];

const closeDrawer = () => {
  open.value = false;
};

const navigationHandler = (item) => {
  router.push(`/category/${item.title}`);
  closeDrawer();
};
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger aria-label="Open navigation menu">
      <OhVueIcon name="px-menu" class="w-8 h-8 text-white md:hidden" />
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <!-- <div class="flex items-center justify-center relative">
            <button @click="()=> {
                router.push('/')
                open = false
            }"><img src="../../../assets/Tenlify_Logo_Thin_Small.png" alt="Tentlify Logo" class="relative w-[150px]" /></button>
            <OhVueIcon name="vi-file-type-vue" class="absolute top-9 right-12 w-5 h-5 z-20 opacity-75" />
        </div> -->
        <div class="flex items-center justify-center relative">
          <div class="relative inline-block">
            <button
              @click="
                () => {
                  router.push('/');
                  open = false;
                }
              "
            >
              <img src="../../../assets/Tenlify_Logo_Thin_Small.png" alt="Tentlify Logo" class="w-[150px]" />
            </button>
            <!-- Position the Vue icon relative to the logo container -->
            <OhVueIcon name="vi-file-type-vue" class="absolute top-9 right-1 w-5 h-5 z-20 opacity-75" />
          </div>
        </div>

        <!-- SCROLL AREA -->
        <div class="h-[500px] w-full overflow-y-scroll">
          <div v-for="item in mobileMenuLinks" :key="item.id">
            <button
              aria-label="`Navigate to ${item.title}`"
              key="{item.id}"
              class="relative w-full"
              @click="() => navigationHandler(item)"
            >
              <div class="bg-black/40 inset-0 rounded-md absolute z-20 top-0 left-0 w-full"></div>
              <img alt="item.title" :src="item.image" priority class="w-full h-[100px] object-cover z-10 rounded-md" />
              <h1 class="text-white text-2xl font-bold absolute left-2 bottom-0 z-30">{{ item.title }}</h1>
            </button>
          </div>

          <!-- LOCATION BUTTON -->
          <button
            aria-label="Navigate to Location Page"
            class="relative w-full"
            @click="
              () => {
                open = false;
                router.push('/location');
              }
            "
          >
            <div class="bg-black/30 inset-0 rounded-md absolute z-20 top-0 left-0 w-full"></div>
            <img
              alt="Location"
              src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/Screenshot%202024-09-18%20at%205.35.50%E2%80%AFPM.png?alt=media&token=fa1d7420-d9e9-4189-9597-015c43fc5159"
              class="w-full h-[100px] object-cover z-10 rounded-md"
            />
            <h1 class="text-white text-2xl font-bold absolute left-2 bottom-0 z-30">Location</h1>
          </button>

          <!-- GALLERY BUTTON -->
          <button
            aria-label="Navigate to Gallery Page"
            class="relative w-full"
            @click="
              () => {
                open = false;
                router.push('/gallery');
              }
            "
          >
            <div class="bg-black/30 inset-0 rounded-md absolute z-20 top-0 left-0 w-full"></div>
            <img
              alt="Location"
              src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/View%20recent%20photos.jpg?alt=media&token=ad5e25d9-63f9-43fb-8539-4c2a92004bd0"
              class="w-full h-[100px] object-cover z-10 rounded-md"
            />
            <h1 class="text-white text-2xl font-bold absolute left-2 bottom-0 z-30">Gallery</h1>
          </button>
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
