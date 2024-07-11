<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { Tabs } from 'flowbite'
import { ref, onMounted } from 'vue'
import 'swiper/css'

import cosmetic from '@/assets/images/banner4.jpg'

const productgallery = ref(1)
const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}
const swiperConfig = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}
const modules = swiperModules
</script>
<template>
    <AppLayout>
        <div class=" w-full min-h-screen">
            <div class=" fixed bg-black top-0 left-0 w-screen h-screen">
                <v-img
                    :src="cosmetic"
                    aspect-ratio="1"
                    class=" w-full -ml-[45vw]"
                >
                    <template v-slot:placeholder>
                    <div
                        class=" w-full h-full flex justify-center items-center"
                    >
                        <v-progress-circular
                        color=""
                        indeterminate
                        ></v-progress-circular>
                    </div>
                    </template>
                </v-img>
            </div>
            <div class=" grid grid-cols-3 w-full">
                <div class=""></div>
                <div class=" relative col-span-2 bg-white min-h-screen">
                    <div class=" md:p-3 lg:p-5 flex flex-col items-center gap-4 justify-center text-gray-300">
                        <p class=" text-9xl text-center">Skin Care</p>
                        <p class=" text-3xl">Skincare for the beauty glow skin</p>
                    </div>
                    <div class=" h-1 w-full bg-gray-300 mt-4"></div>
                    <div class=" absolute w-[300px] border-l-[16px] border-gray-300 text-gray-300 bg-black -translate-x-full p-5 flex justify-center object-center text-3xl tracking-wide">
                        "Dapatkan kulit cantik dan sehat dengan skincare kami yang berkualitas"
                    </div>
                    <div class=" first-letter:text-7xl first-letter:font-semibold first-letter:mr-2 first-letter:float-left columns-2 sm:px-10 lg:px-20 py-10 gap-4">
                        <p>Praesent orci ligula, lacinia eu viverra at, semper id purus. Nulla vel condimentum orci. Donec rutrum sed nulla a sollicitudin. Curabitur nec nisi libero. Proin justo lorem, dignissim sit amet tortor id, sagittis lobortis tellus. Aenean imperdiet ipsum nisl. Maecenas egestas eros ut tincidunt pretium. Ut velit nunc, sagittis sed cursus et, vestibulum et nunc. Phasellus dignissim metus vitae lacinia condimentum. Integer consequat id ex non pellentesque. Mauris sit amet sagittis dolor, mollis egestas metus. Vestibulum ac varius tortor, eu pretium urna. Integer eu fermentum tellus. Aliquam vel auctor quam, eu fermentum metus. Nunc ornare placerat facilisis.</p>
                        <p>Donec pellentesque nunc sit amet urna dignissim pretium. Aliquam eu mi ut mi dictum consequat nec mollis purus. Curabitur commodo mauris erat, sed sodales ligula rutrum in. Suspendisse auctor purus ac quam dapibus euismod. Nullam scelerisque orci vitae erat convallis, dictum varius nisl rhoncus. Pellentesque gravida enim ut libero semper pharetra. Etiam tristique cursus metus euismod bibendum. Donec consequat massa et consequat ornare. Integer fringilla tempus dignissim.</p>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
