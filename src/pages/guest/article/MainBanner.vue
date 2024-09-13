<script setup>
import defaultBanner from '@/assets/images/article-main-banner-default.jpg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
    Navigation,
    Pagination,
    Autoplay,
    FreeMode,
    Thumbs,
} from 'swiper/modules'
const modules = [FreeMode, Thumbs, Navigation, Autoplay, Pagination]
const swiperJs = swiper => {}
</script>
<template>
    <swiper
        :modules="modules"
        :loop="true"
        :speed="1300"
        :autoplay="{
            delay: 4000,
        }"
        :allowTouchMove="false"
        @swiper="swiperJs">
        <swiper-slide v-for="i in 3" :key="i">
            <div class="relative w-full md:h-72">
                <div class="w-full h-full absolute top-0 left-0 bg-black">
                    <v-img
                        :src="defaultBanner"
                        aspect-ratio="1"
                        class="min-w-full"
                        cover>
                        <template v-slot:placeholder>
                            <div
                                class="w-full h-full flex justify-center items-center">
                                <v-progress-circular
                                    color=""
                                    indeterminate></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                </div>
                <div
                    class="w-full min-h-44 md:min-h-72 flex justify-center items-center relative z-10">
                    <div class="flex flex-col min-h-full justify-center">
                        <div
                            class="text-center text-2xl md:text-3xl text-white mb-3">
                            LET'S LAUNCH YOUR BRAND
                        </div>
                        <div class="text-center text-xs text-white mb-5">
                            Maroon is a elegant and beatiful Genesis Child theme
                            brand for creative skincare women
                        </div>
                        <div class="flex flex-row justify-center gap-4 text-xs">
                            <button class="py-2 px-3 bg-white">
                                LEARN MORE
                            </button>
                            <button class="py-2 px-3 bg-white">SHOP NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>
