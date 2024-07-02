<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import gedung from '@/assets/images/gedung.jpg'
import award from '@/assets/images/award.png'
import production from '@/assets/images/laboratorium.png'
import achievement from '@/assets/images/achievement.png'
import company from '@/assets/images/company.png'
import aboutbg from '@/assets/images/aboutbg.png'
import lamp from '@/assets/images/lamp.png'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const tab = ref(null);
const about =ref([
    {
        index: 1,
        title: 'Company Profile',
        Desc: 'Compo',
        img: company,
        sideimg: gedung,
    },
    {
        index: 2,
        title: 'Award',
        Desc: 'Award',
        img: award,
        sideimg: gedung,
    },
    {
        index: 3,
        title: 'Production',
        Desc: 'Production',
        img: production,
        sideimg: gedung,
    },
    {
        index: 4,
        title: 'Achievement',
        Desc: 'Achievement',
        img: achievement,
        sideimg: gedung,
    },
]);
const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}
const swiperConfig = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}
</script>
<template>
    <AppLayout>
        <div class=" hidden flex-col w-full min-h-screen max-h-screen sm:flex">
            <v-card
                style="
                border-radius: 0;
                box-shadow: none;
                ">
                <div class=" w-full min-h-[65vh] flex">
                    <div class=" flex flex-row w-[60%] 2xl:pl-48 sm:pl-8 min-h-full items-center relative">
                        <div class=" w-full max-h-full absolute top-0 left-0 opacity-40">
                            <v-img
                                :key="n"
                                :src="aboutbg"
                                aspect-ratio="1"
                                class=" h-[65vh]"
                                cover
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
                        <div class=" flex flex-col sm:w-3/4 lg:w-1/2 relative">
                            <v-card-text>
                                <v-tabs-window v-model="tab">
                                    <v-tabs-window-item 
                                        v-for="i in about" :key="i.index"
                                        :value="i.index">
                                        <div class=" text-4xl text-[#284723]/80 font-semibold mb-5">
                                            {{ i.title }}
                                        </div>
                                        <div class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt recusandae quaerat error dignissimos fuga ipsam illum amet unde modi? Odio.lorem lorem lorem Lorem ipsum dolor sit amet consectetur adipisicin</div>
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </div>
                        <div class=" sm:w-2/5 lg:w-1/3 min-h-full absolute sm:top-64 lg:top-44 left-[65%] overflow-hidden">
                            <v-card-text>
                                <v-tabs-window v-model="tab">
                                    <v-tabs-window-item 
                                        v-for="i in about" :key="i.index"
                                        :value="i.index">
                                        <v-img
                                            :key="n"
                                            :src="i.img"
                                            aspect-ratio="1"
                                            class=" sm:min-h-[360px] lg:min-h-[480px] relative justify-center"
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
                                            <div
                                                style="
                                                box-shadow: 0px -10px 10px 20px #ceddce;"
                                                class=" absolute left-0 w-full bg-[#ceddce] sm:h-20 lg:h-28 -bottom-1"></div>
                                        </v-img>
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </div>
                    </div>
                    <div class=" w-[40%] flex flex-row min-h-full bg-[#f8f8f6] 2xl:pr-48 sm:pr-8 md:pr-8">
                        <div class=" w-5/6 min-h-full">
                            <v-card-text class=" !p-0">
                                <v-tabs-window v-model="tab">
                                    <v-tabs-window-item
                                        v-for="i in about" :key="i.index"
                                        :value="i.index">
                                        <v-img
                                            :key="n"
                                            :src="i.sideimg"
                                            aspect-ratio="1"
                                            class=" w-full min-h-[65vh]"
                                            cover
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
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </div>
                        <div class=" w-1/6 min-h-full flex flex-col py-5 items-center gap-5">
                            <div v-for="i in 3" :key="i" class=" w-8 max-h-8 flex justify-center items-center">
                                <svg id="Icons_User" overflow="hidden" version="1.1" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle cx="48" cy="30" r="16"/><path d=" M 80 82 L 80 66 C 80 63.6 78.8 61.2 76.8 59.6 C 72.4 56 66.8 53.6 61.2 52 C 57.2 50.8 52.8 50 48 50 C 43.6 50 39.2 50.8 34.8 52 C 29.2 53.6 23.6 56.4 19.2 59.6 C 17.2 61.2 16 63.6 16 66 L 16 82 L 80 82 Z"/></g></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" w-full min-h-[35vh] flex">
                    <div class=" w-[60%] min-h-full 2xl:pl-48 sm:pl-8 bg-[#ceddce] gap-5 flex flex-col">
                        <div class=" flex flex-row sm:gap-5 lg:gap-20 p-5">
                            <button class=" py-3 px-10 border border-white text-white font-semibold bg-gradient-to-r from-lime-600 to-lime-950 duration-200 hover:opacity-70 rounded-2xl">Check Shop</button>
                            <button class=" font-semibold duration-200 hover:text-gray-500">Learn more -></button>
                        </div>
                        <div class=" w-full flex flex-row static z-10 sm:gap-1 lg:gap-5">
                            <div class=" flex flex-row sm:gap-1 lg:gap-3" v-for="i in 3" :key="1">
                                <div class=" min-w-16 h-20">
                                    <v-img
                                        :src="lamp"
                                        aspect-ratio="1"
                                        class=" min-h-full"
                                        cover
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
                                <div class=" flex-col sm:max-w-[100px] lg:max-w-28">
                                    <div class="">Dimwnsions</div>
                                    <div class=" text-[8px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque perspiciatis asperiores laboriosam rem</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" w-[40%] min-h-full 2xl:pr-48 sm:pr-8 md:pr-8 bg-[#f8f8f6] static z-10">
                        <v-tabs
                        style="
                        background-color: #f8f8f6 !important;"
                        v-model="tab"
                        center-active
                        bg-color="primary"
                        class = "min-h-full w-full flex"
                        >
                            <v-tab 
                                v-for="i in about" :key="i.about" :value="i.index"
                                class=" hoverea min-h-full  w-1/3 max-w-1/3 duration-300 hover:opacity-100 opacity-70 ">
                                <div class=" w-full min-h-full flex flex-col justify-center items-center gap-5 relative">
                                    <v-img
                                        :src="i.img"
                                        aspect-ratio="1"
                                        class=" min-w-[80px] max-w-[140px] min-h-[130px] top-0 left-0"
                                        cover
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
                            </v-tab>
                        </v-tabs>
                    </div>
                </div>
            </v-card>
        </div>
        <div class=" flex flex-col sm:hidden w-full min-h-full">
            <v-card
                class=" !rounded-none !shadow-none">
                <div class=" flex flex-col w-full h-screen relative">
                    <div class=" absolute h-[25%] w-[40%] right-2 top-[27%] z-10">
                        <v-card-text class=" h-full">
                            <v-tabs-window v-model="tab" class=" h-full">
                                <v-tabs-window-item 
                                    class=" h-full"
                                    v-for="i in about" :key="i.index"
                                    :value="i.index">                                    
                                    <v-img
                                        :key="n"
                                        :src="i.img"
                                        aspect-ratio="1"
                                        class="h-full"
                                        cover
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
                                </v-tabs-window-item>
                            </v-tabs-window>
                        </v-card-text>
                    </div>
                    <!-- hidden -->
                    <div class=" hidden absolute h-[35%] w-[50%] left-0 top-[35%] z-10 overflow-hidden rounded-r-sm">
                        <v-card-text class=" p-0 h-full">
                            <v-tabs-window v-model="tab" class=" h-full">
                                <v-tabs-window-item
                                    class=" h-full"
                                    v-for="i in about" :key="i.index"
                                    :value="i.index">
                                    <v-img
                                        :key="n"
                                        :src="i.sideimg"
                                        aspect-ratio="1"
                                        class=" min-h-full"
                                        cover
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
                                </v-tabs-window-item>
                            </v-tabs-window>
                        </v-card-text>
                    </div>
                    <div class=" flex flex-col gap-2 w-full pt-24 h-[55%] p-4 relative">
                        <div class=" absolute top-0 left-0 w-full h-full opacity-40">
                            <v-img
                                :key="n"
                                :src="aboutbg"
                                aspect-ratio="1"
                                class=" min-h-full"
                                cover
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
                        <div class=" w-[80%] static z-20">
                            <v-card-text>
                                <v-tabs-window v-model="tab">
                                    <v-tabs-window-item 
                                        v-for="i in about" :key="i.index"
                                        :value="i.index">
                                        <div class=" text-3xl text-[#284723]/80 font-bold">{{ i.title }}</div>
                                        <div class="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit esse fugiat sapiente necessitatibus mollitia ea. Quasi impedit libero est. Eius quis minima esse repellendus ad cumque perferendis adipisci numquam aut.</div>
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </div>
                    </div>
                    
                    <div class=" flex flex-col w-full h-[45%] bg-[#ceddce] relative">
                        <div class=" flex flex-col w-full gap-5 sm:gap-5 lg:gap-20 pt-10 py-4 px-5 right-0">
                            <button class=" py-3 px-10 border border-white text-white font-semibold bg-gradient-to-r from-lime-600 to-lime-950 duration-200 hover:opacity-70 rounded-2xl text-sm">Check Shop</button>
                            <button class=" text-sm font-semibold duration-200 hover:text-gray-500">Learn more -></button>
                        </div>
                        <div class=" w-full h-1/2">
                            <v-tabs
                            style="
                            background-color: #ceddce !important
                            "
                            v-model="tab"
                            center-active
                            bg-color="primary"
                            class = "min-h-full w-full flex !bg-[#ceddce]"
                            >
                                <v-tab
                                    v-for="i in about" :key="i.about" :value="i.index" 
                                    class=" !bg-[#ceddce] !rounded-2xl min-h-full  w-1/3 max-w-1/3 duration-300 hover:opacity-100 opacity-50 overflow-hidden">
                                    <div class=" !w-full !min-h-full flex flex-col justify-center items-center gap-5 hover:bg-[#ceddce] absolute p-12">
                                        <v-img
                                            :src="i.img"
                                            aspect-ratio="1"
                                            class=" min-w-[80px] max-w-[140px] min-h-[130px] top-0 left-0"
                                            cover
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
                                </v-tab>
                            </v-tabs>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>
    </AppLayout>
</template>
<style>
.v-slide-group__prev {
    margin-left: -52px
}
.v-slide-group__next {
    margin-right: -52px
}
</style>
