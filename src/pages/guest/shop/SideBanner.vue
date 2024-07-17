<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { useShopPageStore } from '@/stores/shop-page/banner.js'
import { ref, onMounted } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'

const shopStore = useShopPageStore()
const sideBanner = ref([])

const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}
const swiperConfig = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}
onMounted(async () => {
    await shopStore.getAllSideBanner()
    getSideBanner()
})
const getSideBanner = () => {
    sideBanner.value = shopStore.sideBanners.map(banner => ({
        id: banner.id,
        side_banner_media: banner.side_banner_media,
        side_banner_alt: banner.side_banner_alt,
        side_banner_status: banner.side_banner_status,
        isDefault: banner.isDefault,
        src:
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/media/shop/side-banner/' +
            banner.side_banner_media,
    }))
}
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
        <swiper-slide v-for="(item, index) in sideBanner" :key="index">
            <v-img
                :src="item.src"
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
