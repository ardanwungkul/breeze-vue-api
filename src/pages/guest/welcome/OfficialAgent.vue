<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import OfficialAgentForm from '@/pages/guest/welcome/OfficialAgentForm.vue'
import placeholderImage from '@/assets/images/placeholder-image.jpg'

const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}
const swiperConfig = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}
const modules = swiperModules
const packet = ref([
    {
        index: 1,
        name: 'EARLYBIRD',
        harga: '4Juta',
        availabel: [],
    },
    {
        index: 2,
        name: 'SHAPIRE',
        harga: '25Juta',
        availabel: [],
    },
    {
        index: 3,
        name: 'EMERALD',
        harga: '150Juta',
        availabel: [],
    },
    {
        index: 4,
        name: 'DIAMOND',
        harga: '500Juta',
        availabel: [],
    },
])
</script>
<template>
    <div class="px-3 xl:px-0">
        <div
            class="w-full rounded-md border p-5 bg-[#f4f0ed]"
            style="box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.2)">
            <swiper
                :modules="modules"
                :loop="true"
                :autoplay="{
                    delay: 3000,
                }"
                :breakpoints="{
                    '640': {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    '768': {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    '1024': {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }"
                @swiper="swiperJs">
                <swiper-slide v-for="n in 10" :key="n">
                    <div
                        class="flex flex-col justify-center items-center text-center gap-2">
                        <div
                            class="w-20 h-20 object-cover rounded-full overflow-hidden">
                            <v-img
                                :src="placeholderImage"
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
                        <p class="text-gray-600">
                            Lorem ipsum dolor sit amet, consec adipiscing elit.
                            Nam eusem scelerisque tempor, varius quam
                        </p>
                        <div>
                            <svg viewBox="0 0 32 32" class="w-8 fill-gray-300">
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <path
                                            d="M13,11c0.6,0,1-0.4,1-1s-0.4-1-1-1c-5,0-9,4-9,9c0,2.8,2.2,5,5,5s5-2.2,5-5s-2.2-5-5-5c-0.3,0-0.7,0-1,0.1 C9.3,11.8,11,11,13,11z"></path>
                                        <path
                                            d="M23,13c-0.3,0-0.7,0-1,0.1c1.3-1.3,3-2.1,5-2.1c0.6,0,1-0.4,1-1s-0.4-1-1-1c-5,0-9,4-9,9c0,2.8,2.2,5,5,5s5-2.2,5-5 S25.8,13,23,13z"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <p class="text-blue-700 uppercase font-bold">
                            Jessica Milla
                        </p>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="flex justify-center mt-10">
                <v-dialog>
                    <template v-slot:activator="{ props: activatorProps }">
                        <button
                            v-bind="activatorProps"
                            class="rounded-md tracking-widest uppercase font-semibold text-gray-700 transition-all duration-500 hover:bg-[#f8f8f6] hover:shadow px-10 py-2">
                            Let's Become Partners!
                        </button>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <div
                            class="w-full max-w-4xl mx-auto bg-light-primary-1 rounded-xl shadow-lg h-[80vh] mt-4">
                            <div
                                class="flex justify-end p-3 bg-transparent relative">
                                <button
                                    @click="isActive.value = false"
                                    class="fa-solid fa-x rounded-xl hover:bg-gray-100 px-3 py-2 absolute z-10"></button>
                            </div>
                            <div
                                class="p-3 invisible-scrollbar overflow-y-scroll h-[calc(80vh-56px)]">
                                <swiper
                                    :modules="swiperModules"
                                    :breakpoints="{
                                        '640': {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                        '768': {
                                            slidesPerView: 3,
                                            spaceBetween: 10,
                                        },
                                        '1024': {
                                            slidesPerView: 4,
                                            spaceBetween: 10,
                                        },
                                    }"
                                    @swiper="swiperJs">
                                    <swiper-slide
                                        v-for="i in packet"
                                        :key="i.index"
                                        class="flex justify-center">
                                        <div
                                            class="w-full h-full text-blue-500 text-center flex justify-center flex-col">
                                            <div
                                                class="text-3xl font-semibold text-black/50 mb-4">
                                                {{ i.name }}
                                            </div>
                                            <div
                                                class="text-xl font-medium mb-4">
                                                Rp. {{ i.harga }}
                                            </div>
                                            <div
                                                class="w-full justify-center mb-4">
                                                <OfficialAgentForm />
                                            </div>
                                            <div class="border-t p-4 pb-0">
                                                <div
                                                    v-for="i in 8"
                                                    :key="i"
                                                    class="max-h-full overflow-auto flex flex-row justify-center gap-2 mb-4">
                                                    <div
                                                        class="w-3 flex items-center">
                                                        <svg
                                                            height="12"
                                                            viewBox="0 0 16 16"
                                                            width="12"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <polygon
                                                                fill-rule="evenodd"
                                                                points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414" />
                                                        </svg>
                                                    </div>
                                                    <div
                                                        class="font-semibold text-sm">
                                                        plakat
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </div>
                    </template>
                </v-dialog>
            </div>
        </div>
    </div>
</template>
