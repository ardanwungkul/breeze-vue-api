<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { ref, onMounted } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'

const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}
const swiperConfig = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}
const backendURl = ref(import.meta.env.VITE_PUBLIC_BACKEND_URL)
const props = defineProps({
    side_banner: Object,
})
</script>
<template>
    <swiper
        :navigation="swiperConfig.navigation"
        :modules="swiperModules"
        :loop="false"
        :speed="100"
        :allowTouchMove="true"
        :autoplay="{
            delay: 3000,
        }"
        @swiper="swiperJs"
        class="w-full h-full">
        <swiper-slide v-for="(item, index) in side_banner" :key="index">
            <v-img
                :src="
                    backendURl +
                    '/storage/media/shop/side-banner/' +
                    item.side_banner_media
                "
                aspect-ratio="1"
                class="min-h-full lazyload"
                cover>
                <template v-slot:placeholder>
                    <div class="w-full h-full flex justify-center items-center">
                        <v-progress-circular
                            color=""
                            indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
        </swiper-slide>
    </swiper>
</template>
