<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'

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
    <div class="w-full py-9 md:grid md:grid-cols-3 md:gap-5">
        <div class="mb-4 md:mb-0">
            <div
                class="text-[28px] font-extralight mb-4 text-center md:text-start">
                BestSellers
            </div>
            <div class="text-base mb-10 font-normal text-center md:text-start">
                A Wide range of face wash body care cosmetics that will not
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                molestiae repudiandae voluptate.
            </div>
            <div class="flex justify-center md:justify-start">
                <RouterLink
                    to="#"
                    class="py-[6px] px-3 border text-base duration-300 border-gray-300 hover:border-transparent">
                    Shop All
                </RouterLink>
            </div>
        </div>
        <div class="sm:col-span-2">
            <swiper
                :modules="swiperModules"
                :loop="true"
                :breakpoints="{
                    '640': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '768': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    '1024': {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                }"
                :autoplay="{
                    delay: 3000,
                }"
                @swiper="swiperJs"
                :navigation="swiperConfig.navigation">
                <swiper-slide v-for="n in 10" :key="n">
                    <div
                        class="flex flex-col justify-center items-center bg-[#f4f0ed] rounded-md p-4">
                        <div class="h-[144px] w-5/6">
                            <v-img
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F175%2F452%2Fnon_2x%2Fwhite-cream-jar-bottle-beauty-cosmetic-blank-mockup-3d-illustration-free-png.png&f=1&nofb=1&ipt=fa54a50dcaf23d1ca8ded9f4daed07a9259ee9373c9933b46731843ffd37b128&ipo=images"
                                aspect-ratio="1"
                                class="min-h-full"
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
                            class="flex justify-between items-center w-full gap-2">
                            <p class="font-medium line-clamp-1">
                                Night Cream {{ n }}
                            </p>
                            <p class="text-xs whitespace-nowrap">Rp. 200.000</p>
                        </div>
                        <p class="text-xs text-start w-full text-gray-600 mt-2">
                            for daily skin
                        </p>
                    </div>
                </swiper-slide>
                <div class="flex justify-center gap-2 mt-5">
                    <div
                        class="swiper-button-prev bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-chevron-left text-[#807d7d]"></i>
                    </div>
                    <div
                        class="swiper-button-next bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                        <i class="fa-solid fa-chevron-right text-[#807d7d]"></i>
                    </div>
                </div>
            </swiper>
        </div>
    </div>
</template>
