<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref, onMounted } from 'vue'
import { setupCarousel } from '@/assets/js/article.js'
import {
    Navigation,
    Pagination,
    Autoplay,
    FreeMode,
    Thumbs,
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import '@/assets/css/article.css'

import banner4 from '@/assets/images/banner4.jpg'
import banner2 from '@/assets/images/banner2.jpg'

const items = ref([
    {
        image: banner4,
        author: 'Skincare',
        title: 'Beauty Skin',
        topic: 'Best skincare',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi',
    },
    {
        image: banner2,
        author: 'Skincare',
        title: 'Beauty Skin',
        topic: 'Best skincare',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi',
    },
])

const thumbnails = ref([
    {
        image: banner4,
        title: 'Name Slider',
        description: 'Description',
    },
    {
        image: banner2,
        title: 'Name Slider',
        description: 'Description',
    },
])

const timeRunning = ref(1000)
const timeAutoNext = ref(7000)

onMounted(() => {
    setupCarousel()
})

const modules = [FreeMode, Thumbs, Navigation, Autoplay, Pagination]
const swiperJs = swiper => {}
</script>
<template>
    <AppLayout>
        <!-- Top -->
        <swiper
            :modules="modules"
            :loop="true"
            :speed="1300"
            :autoplay="{
                delay: 3000,
            }"
            @swiper="swiperJs">
            <swiper-slide v-for="i in 3" :key="i">
                <div class="relative">
                    <img
                        src="@/assets/images/banner3.jpg"
                        class="absolute w-full min-h-44 md:min-h-72"
                        alt="" />
                    <div
                        class="w-full min-h-44 md:min-h-72 flex justify-center items-center relative z-10">
                        <div class="flex flex-col min-h-full justify-center">
                            <div
                                class="text-center text-2xl md:text-3xl text-white mb-3">
                                LET'S LAUNCH YOUR BRAND
                            </div>
                            <div class="text-center text-xs text-white mb-5">
                                Maroon is a elegant and beatiful Genesis Child
                                theme brand for creative skincare women
                            </div>
                            <div
                                class="flex flex-row justify-center gap-4 text-xs">
                                <button class="py-2 px-3 bg-white">
                                    LEARN MORE
                                </button>
                                <button class="py-2 px-3 bg-white">
                                    SHOP NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <!-- Get Update -->
        <div class="w-full flex justify-center">
            <div
                class="w-full flex flex-col md:flex-row align-middle justify-between px-5 md:mx-4 lg:px-0 py-5 max-w-[1140px]">
                <div class="flex items-center md:gap-10 gap-3 mb-3 md:mb-0">
                    <div class="">
                        <svg
                            class="feather feather-mail w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <div class="font-semibold">getupdate</div>
                </div>
                <input
                    type="text"
                    class="mb-3 md:mb-0 border-none h-8 px-4 w-full md:w-2/6 text-xs"
                    name=""
                    id=""
                    placeholder="Detail name" />
                <input
                    type="text"
                    class="mb-3 md:mb-0 border-none h-8 px-4 w-full md:w-2/6 text-xs"
                    name=""
                    id=""
                    placeholder="Gmail address" />
                <button class="border py-1 md:py-0 border-yellow-400 px-12">
                    Go
                </button>
            </div>
        </div>

        <section class="h-screen flex items-center justify-center">
            <div
                class="carousel h-screen w-full overflow-hidden relative"
                ref="carousel">
                <div class="list" ref="list">
                    <div
                        class="item w-full h-full absolute inset-0"
                        v-for="(item, index) in items"
                        :key="index">
                        <img
                            :src="item.image"
                            class="w-full h-full object-cover" />
                        <div class="max-w-[1140px] m-auto">
                            <div
                                class="content absolute md:top-[20%] top-[10%] md:max-w-[80%] pl-3 md:pl-0 pr-[30%] box-border text-[#fff]">
                                <div class="author font-bold tracking-[10px]">
                                    {{ item.author }}
                                </div>
                                <div
                                    class="title md:text-[3em] font-bold leading-[1.3em] text-lg">
                                    {{ item.title }}
                                </div>
                                <div
                                    class="topic md:text-[3em] font-bold leading-[1.3em] text-3xl">
                                    {{ item.topic }}
                                </div>
                                <div
                                    class="des md:text-base max-w-[30rem] text-sm">
                                    {{ item.description }}
                                </div>
                                <div class="buttons mt-5">
                                    <button
                                        class="h-10 w-[130px] border-none bg-[#eee] tracking-[3px] font-medium text-black">
                                        SEE MORE
                                    </button>
                                    <button
                                        class="h-10 w-[130px] tracking-[3px] font-medium text-white border border-white bg-transparent">
                                        SUBSCRIBE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="thumbnail absolute bottom-[50px] left-1/2 w-max z-[100] flex gap-5"
                    ref="thumbnail">
                    <div
                        class="item w-[150px] h-[220px] flex-shrink-0 relative"
                        v-for="(thumb, index) in thumbnails"
                        :key="index"
                        style="cursor: pointer">
                        <img
                            :src="thumb.image"
                            class="w-full h-full object-cover rounded-[20px]" />
                        <div
                            class="content text-[#fff] absolute bottom-[10px] left-[10px] right-[10px]">
                            <div class="title font-medium">
                                {{ thumb.title }}
                            </div>
                            <div class="description font-light">
                                {{ thumb.description }}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="arrows absolute top-[80%] right-[52%] z-[100] w-[300px] max-w-[30%] flex gap-[10px] items-center">
                    <button
                        class="w-10 h-10 rounded-[50%] bg-[#eee4] border-none text-[#fff] font-mono font-bold duration-500 hover:bg-[#fff] hover:text-black"
                        id="prev"
                        ref="prev">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button
                        class="w-10 h-10 rounded-[50%] bg-[#eee4] border-none text-[#fff] font-mono font-bold duration-500 hover:bg-[#fff] hover:text-black"
                        id="next"
                        ref="next">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- Saya Orang -->
        <div
            class="w-full max-w-[1140px] mx-auto flex flex-row justify-center min-h-[80vw] md:min-h-screen gap-5 pb-16 py-0 md:py-16 relative mt-10 md:mt-0">
            <div
                class="max-w-[70vw] md:max-w-[43%] text-center absolute top-32 md:top-[24rem] left-10 md:left-60 z-20 py-5 px-7 border-black border">
                <div
                    style="font-family: 'Grand Hotel'"
                    class="text-xl md:text-3xl mb-4">
                    Saya Orang
                </div>
                <hr class="border-black mb-4" />
                <div class="text-[10px] md:text-xs mb-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Asperiores reprehenderit illum sunt corporis ex maiores
                    numquam, ut error dignissimos voluptates rem fugiat officia
                    nostrum sit natus doloremque distinctio.
                </div>
                <button class="border border-black p-2 text-xs">
                    LEARN MORE
                </button>
            </div>
            <div
                style="background-color: rgb(241, 237, 237)"
                class="absolute w-[20vw] h-32 max-h-[80px] md:max-h-screen md:w-[26vh] md:min-h-[25vh] -rotate-90 top-12 left-2 md:top-64 md:left-10 text-sm md:text-xl font-light">
                -Blog
            </div>
            <div
                style="background-color: rgb(241, 237, 237)"
                class="absolute w-[20vw] md:w-[26vh] h-32 md:min-h-[25vh] rotate-90 top-24 right-8 md:top-96 md:right-10 text-sm md:text-xl font-light text-right">
                About
            </div>
            <div
                class="w-[47vw] md:w-[47%] h-[30vw] md:min-h-[35vh] max-h-[35vh] relative">
                <img src="@/assets/images/flower.jpeg" alt="" srcset="" />
            </div>
            <div
                class="w-[35vw] md:w-[35%] h-[40vw] md:min-h-[60vh] max-h-[60vh] relative">
                <img src="@/assets/images/person.jpeg" alt="" srcset="" />
            </div>
        </div>
        <!-- Skincare -->
        <div
            class="w-full max-w-[1320px] px-3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-24 md:pt-16 gap-7 mt-5">
            <div v-for="i in 3" :key="i" class="p-5 bg-white">
                <div class="w-full min-h-48 mb-5">
                    <img src="@/assets/images/banner-5.jpeg" alt="" srcset="" />
                </div>
                <div class="text-center mb-2 font-medium">Skincare</div>
                <div class="mb-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                    eum similique repellat a laborum, rerum voluptates ipsam
                    eos.
                </div>
                <div>
                    <button class="p-2 border">Skincare</button>
                </div>
            </div>
        </div>
        <div class=" flex justify-center pt-8 pb-16">
            <button class=" text-gray-600 hover:text-gray-300 p-3 border border-gray-600 hover:border-gray-300">View All</button>
        </div>
        <!-- Videos -->
        <div
            class="w-full max-w-[1320px] px-4 mx-auto flex flex-col py-16 justify-center">
            <div class="text-3xl text-center mb-5">Videos</div>
            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                <div
                    v-for="i in 3"
                    :key="i"
                    class="w-full min-h-52 rounded overflow-hidden">
                    <iframe
                        class="w-full h-full"
                        src="https://www.youtube.com/embed/otej7WLdPh0?si=hTKjPRESNEp9Gmd3"
                        title="YouTube video"
                        allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
