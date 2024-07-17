<script setup>
import { useShopPageStore } from '@/stores/shop-page/banner.js'
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const shopStore = useShopPageStore()
const secondaryBanner = ref([])

const getSecondaryBanner = () => {
    secondaryBanner.value = shopStore.secondaryBanners.map(banner => ({
        id: banner.id,
        secondary_banner_media: banner.second_banner_media,
        secondary_banner_alt: banner.second_banner_alt,
        secondary_banner_status: banner.second_banner_status,
        isDefault: banner.isDefault,
        src:
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/media/shop/secondary-banner/' +
            banner.second_banner_media,
    }))
}
onMounted(async () => {
    await shopStore.getAllSecondaryBanner()
    getSecondaryBanner()
})
const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}
const swiperConfig = {
    slidePerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: false,
    speed: 1300,
    allowTouchMove: false,
    autoplay: {
        delay: 3000,
    },
}
</script>
<template>
    <swiper
        class="w-full max-w-full min-h-full mb-2"
        :navigation="swiperConfig.navigation"
        :modules="swiperModules"
        v-bind="swiperConfig"
        @swiper="swiperJs">
        <swiper-slide v-for="(item, index) in secondaryBanner" :key="index">
            <div
                class="w-full max-h-32 md:min-h-52 md:max-h-52 bg-black flex items-center relative">
                <v-img
                    :src="item.src"
                    aspect-ratio="1"
                    class="min-w-full max-w-full min-h-full">
                    <template v-slot:placeholder>
                        <div
                            class="w-full h-full flex justify-center items-center">
                            <v-progress-circular
                                color=""
                                indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
                <div class="absolute w-full h-full bg-black/50"></div>
            </div>
        </swiper-slide>
        <div
            class="absolute z-30 flex flex-row w-full min-h-full top-0 justify-between">
            <div
                class="swiper-button-prev opacity-50 duration-200 hover:opacity-100 min-h-full flex justify-center items-center cursor-pointer pl-10 md:pl-20">
                <div class="w-12 h-12 bg-black">
                    <svg
                        height="48"
                        viewBox="0 0 48 48"
                        width="48"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="white"
                            d="M30.83 32.67l-9.17-9.17 9.17-9.17-2.83-2.83-12 12 12 12z" />
                        <path d="M0-.5h48v48h-48z" fill="none" />
                    </svg>
                </div>
            </div>
            <div
                class="swiper-button-next opacity-50 duration-200 hover:opacity-100 min-h-full flex justify-center items-center cursor-pointer pr-10 md:pr-20">
                <div class="w-12 h-12 bg-black">
                    <svg
                        height="48"
                        viewBox="0 0 48 48"
                        width="48"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="white"
                            d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z" />
                        <path d="M0-.25h48v48h-48z" fill="none" />
                    </svg>
                </div>
            </div>
        </div>
    </swiper>
</template>
