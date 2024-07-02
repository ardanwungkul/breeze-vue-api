<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { Tabs } from 'flowbite'
import 'swiper/css'

import cosmetic from '@/assets/images/cosmetic.jpeg'

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
        <div class="flex flex-row w-[1120px] bg-white mx-auto">
            <div class="flex flex-col gap-2 w-[40%] h-full py-6 p-4">
                <div class="w-full h-96 rounded-sm">
                    <v-img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F175%2F452%2Fnon_2x%2Fwhite-cream-jar-bottle-beauty-cosmetic-blank-mockup-3d-illustration-free-png.png&f=1&nofb=1&ipt=fa54a50dcaf23d1ca8ded9f4daed07a9259ee9373c9933b46731843ffd37b128&ipo=images"
                        aspect-ratio="1">
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
                <div class="w-full h-20">
                    <swiper
                        :modules="swiperModules"
                        :breakpoints="{
                            '640': {
                                slidesPerView: 5,
                                spaceBetween: 2,
                            },
                            '768': {
                                slidesPerView: 5,
                                spaceBetween: 2,
                            },
                            '1024': {
                                slidesPerView: 5,
                                spaceBetween: 2,
                            },
                        }"
                        @swiper="swiperJs"
                        :navigation="swiperConfig.navigation">
                        <swiper-slide v-for="n in 6" :key="n">
                            <div class="w-full h-full">
                                <v-img
                                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F175%2F452%2Fnon_2x%2Fwhite-cream-jar-bottle-beauty-cosmetic-blank-mockup-3d-illustration-free-png.png&f=1&nofb=1&ipt=fa54a50dcaf23d1ca8ded9f4daed07a9259ee9373c9933b46731843ffd37b128&ipo=images"
                                    aspect-ratio="1">
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
                        </swiper-slide>
                        <div
                            class="flex absolute top-0 w-full h-full justify-between z-20 items-center">
                            <div
                                class="swiper-button-prev bg-black/25 py-3 px-1 flex justify-center items-center cursor-pointer">
                                <i
                                    class="fa-solid fa-chevron-left text-white"></i>
                            </div>
                            <div
                                class="swiper-button-next bg-black/25 py-3 px-1 flex justify-center items-center cursor-pointer">
                                <i
                                    class="fa-solid fa-chevron-right text-white"></i>
                            </div>
                        </div>
                    </swiper>
                </div>
                <!-- <div class=" px-5 flex flex-row w-full h-6 items-center gap-2">
                    <p>Share :</p>
                    <div v-for="i in 4" :key="i" class=" w-6 h-6 bg-black rounded-full overflow-hidden"></div>
                </div> -->
            </div>
            <div class="w-[60%] h-full py-6 p-4 gap-2 flex flex-col">
                <p class="text-xl font-medium">Skincar Wajah</p>
                <div class="flex flex-row items-center gap-2">
                    <p
                        class="text-xs underline underline-offset-4 text-gray-500">
                        5.0
                    </p>
                    <div class="flex flex-row gap-0.5">
                        <i
                            v-for="n in 5"
                            :key="n"
                            class="fa-solid fa-star text-yellow-300 text-xs"></i>
                    </div>
                </div>
                <div
                    class="flex justify-between w-full py-1 px-5 bg-red-600 text-white items-center">
                    <p class="tracking-wider text-lg font-medium">
                        <span class="font-semibold">Flash</span>Sale
                    </p>
                    <div class="flex flex-row gap-2">
                        <p>BERAKHIR DALAM</p>
                        <div class="flex flex-row gap-1 font-medium">
                            <p class="bg-black px-1">00</p>
                            <p class="bg-black px-1">00</p>
                            <p class="bg-black px-1">00</p>
                        </div>
                    </div>
                </div>
                <div
                    class="flex w-full bg-[#f4f4f4] flex-row gap-3 py-3 -mt-2 px-5">
                    <p class="line-through text-gray-500">Rp.200.000</p>
                    <p class="text-2xl font-medium">Rp.50.000</p>
                </div>
                <div class="flex flex-col w-full py-7 px-5 gap-6 text-[13px]">
                    <div class="flex flex-row w-full">
                        <div class="w-1/5 min-w-[20%]">
                            <p class="text-gray-600">Voucher</p>
                        </div>
                        <div class="w-auto"></div>
                    </div>
                    <div class="flex flex-row w-full">
                        <div class="w-1/5 min-w-[20%]">
                            <p class="text-gray-600">Return</p>
                        </div>
                        <div class="w-auto">Bebas Pengembalian</div>
                    </div>
                    <div class="flex flex-row w-full">
                        <div class="w-1/5 min-w-[20%]">
                            <p class="text-gray-600">Protection</p>
                        </div>
                        <div class="w-auto flex flex-row">
                            <p class="w-1/5 flex flex-wrap">
                                Proteksi Kerusakan+
                            </p>
                            <p class="w-5/5 flex flex-wrap text-blue-600">
                                Melindungi Barang Belanjaanmu dari Kerusakan
                                total hingga 6 bulan
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-row w-full">
                        <div class="w-1/5 min-w-[20%]">
                            <p class="text-gray-600">Kuantitas</p>
                        </div>
                        <div class="w-auto flex flex-row gap-2">
                            <input
                                class="h-7 w-16 text-sm focus:ring-transparent border-gray-300 focus:border-gray-300"
                                type="number"
                                name=""
                                id="" />
                            <p class="text-gray-600 flex items-center">
                                tersisa 458 buah
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row text-[13px] px-5 gap-2">
                    <button
                        class="py-3 px-4 rounded-sm bg-red-100 border border-red-600 text-red-600 hover:bg-red-50 duration-300">
                        <p>Masukkan Keranjang</p>
                    </button>
                    <button
                        class="py-3 px-4 rounded-sm bg-red-600 text-white hover:bg-red-500 duration-300">
                        <p>Beli Sekarang</p>
                    </button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
