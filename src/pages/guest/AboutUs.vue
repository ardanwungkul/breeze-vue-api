<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import company from '@/assets/images/company.png'
import award from '@/assets/images/award.png'
import production from '@/assets/images/laboratorium.png'
import achievement from '@/assets/images/achievement.png'
import { RouterLink } from 'vue-router'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
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
</script>
<template>
    <AppLayout>
        <div
            class="w-full md:min-h-[95vh] md:max-h-[95vh] min-h-screen flex flex-col mb-12">
            <div class="min-h-full w-full flex">
                <!-- 1 -->
                <div class="w-full h-screen flex flex-col md:flex-row">
                    <div
                        class=" bg-ala2 bg-cover w-full h-full md:w-[66.66vw] md:max-h-[95vh] flex">
                        <div
                            v-for="i in about"
                            :key="i.index"
                            class="w-full px-4 md:px-24 flex flex-row">
                            <div 
                                :class="{ 'opacity-100 -translate-x-0': activeDiv === i.index, ' -translate-x-full opacity-0': activeDiv !== i.index }"
                                class="max-w-[34vw] mt-28 duration-1000 md:left-24 absolute">
                                <div class="text-2xl text-[#794d4a]/70 md:text-4xl md:font-bold pb-2 md:pb-5">
                                    {{ i.title }}
                                </div>
                                <div class="text-xs md:text-base">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Deserunt recusandae
                                    quaerat error dignissimos fuga ipsam illum
                                    amet unde modi? Odio.lorem lorem lorem Lorem
                                    ipsum dolor sit amet consectetur adipisicin
                                </div>
                            </div>
                            <div
                                :class="{ ' -translate-y-1/4 opacity-100': activeDiv === i.index, ' translate-y-0 opacity-0': activeDiv !== i.index }"
                                class=" w-1/5 min-h-full md:min-h-32 duration-1000 left-1/2 -translate-x-1/3 top-1/2 flex items-center absolute">
                                <img
                                    class="max-h-full"
                                    :src="i.img"
                                    alt=""
                                    srcset="" />
                                <!-- desktop -->
                                <!-- mobile -->
                                <div
                                    style="
                                        box-shadow: 0px -125px 100px rgb(
                                                248,
                                                248,
                                                246
                                            ) inset;
                                    "
                                    class="block md:hidden absolute top-0 left-0 w-full min-h-full"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Pilihan desktop -->
                    <div
                        class="hidden md:flex w-[33.33vw] max-w-[33.33vw] flex-col min-h-[95vh] max-h-[65vh]">
                        <div
                            class="w-full flex flex-row min-h-[65vh] max-h-[65vh] overflow-hidden">
                            <swiper
                                class="relative"
                                :navigation="swiperConfig.navigation"
                                :modules="swiperModules"
                                :loop="true"
                                :speed="1300"
                                :allowTouchMove="false"
                                :autoplay="{
                                    delay: 4000,
                                }"
                                @swiper="swiperJs">
                                <swiper-slide v-for="i in 3" :key="i">
                                    <img
                                        src="@/assets/images/gedung.jpg"
                                        alt="" />
                                </swiper-slide>
                                <div
                                    class="absolute top-0 right-0 w-1/5 h-[65vh] bg-white z-20"></div>
                                <div
                                    class="absolute z-30 flex flex-row bottom-0 gap-1 right-0 justify-between">
                                    <div
                                        class="swiper-button-prev opacity-50 duration-200 hover:opacity-100 flex justify-center items-center cursor-pointer">
                                        <div class="w-11 h-11 bg-black">
                                            <svg
                                                height="44"
                                                viewBox="0 0 48 48"
                                                width="44"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fill="white"
                                                    d="M30.83 32.67l-9.17-9.17 9.17-9.17-2.83-2.83-12 12 12 12z" />
                                                <path
                                                    d="M0-.5h48v48h-48z"
                                                    fill="none" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div
                                        class="swiper-button-next opacity-50 duration-200 hover:opacity-100 flex justify-center items-center cursor-pointer">
                                        <div class="w-11 h-11 bg-black">
                                            <svg
                                                height="44"
                                                viewBox="0 0 48 48"
                                                width="44"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fill="white"
                                                    d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z" />
                                                <path
                                                    d="M0-.25h48v48h-48z"
                                                    fill="none" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </swiper>
                        </div>
                        <div
                            class="bg-alakadabra bg-cover w-[33.33vw] min-h-[30vh] flex flex-rowx bg-blue-500 relative overflow-auto py-9 px-5">
                            <div class=" absolute w-full min-h-full bg-black/50 top-0 left-0"></div>
                            <swiper
                                class="relative"
                                :modules="swiperModules"
                                :slides-per-view="3"
                                :space-between="12"
                                :speed="1300"
                                @swiper="swiperJs">
                                <swiper-slide v-for="i in about" :key="i.index">
                                    <button
                                        @click="toggleClass(i.index)"
                                        class="bg-white/20 min-w-full border border-white/30 duration-200 hover:opacity-50 h-full backdrop-blur rounded-sm p-5">
                                        <div
                                            class="w-full max-h-[15vh] flex justify-center mb-2">
                                            <img
                                                class="max-h-[8vh]"
                                                :src="i.img"
                                                alt=""
                                                srcset="" />
                                        </div>
                                        <div class="text-sm">{{ i.title }}</div>
                                    </button>
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                    <!-- Pilihan Mobile -->
                    <div
                        class="bg-alakadabra bg-cover bg-center block md:hidden w-full py-5 px-2">
                        <swiper
                            class="relative"
                            :modules="swiperModules"
                            :slides-per-view="3"
                            :space-between="8"
                            :speed="1300"
                            @swiper="swiperJs">
                            <swiper-slide
                                class="min-h-full max-h-full"
                                v-for="i in about"
                                :key="i.index">
                                <button
                                    @click="toggleClass(i.index)"
                                    class="bg-white/35 min-w-full min-h-[30vw] duration-200 hover:opacity-50 h-full backdrop-blur-sm rounded-sm p-5">
                                    <div
                                        class="w-full min-h-full flex justify-center mb-2">
                                        <img
                                            class="max-h-[10vw]"
                                            :src="i.img"
                                            alt=""
                                            srcset="" />
                                    </div>
                                    <div class="text-xs">{{ i.title }}</div>
                                </button>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
<script>
export default {
    data() {
        return {
            about: [
                {
                    index: 1,
                    title: 'Company Profile',
                    Desc: 'Compo',
                    img: company,
                },
                {
                    index: 2,
                    title: 'Award',
                    Desc: 'Award',
                    img: award,
                },
                {
                    index: 3,
                    title: 'Production',
                    Desc: 'Production',
                    img: production,
                },
                {
                    index: 4,
                    title: 'Achievement',
                    Desc: 'Achievement',
                    img: achievement,
                },
            ],
            activeDiv: 1,
        }
    },
    methods: {
        toggleClass(i) {
            this.activeDiv = i
        },
    },
}
</script>
<style>
.bg-alakadabra {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1092%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(244%2c 240%2c 237%2c 1)'%3e%3c/rect%3e%3cpath d='M 0%2c113 C 72%2c125 216%2c194.4 360%2c173 C 504%2c151.6 576%2c3.6 720%2c6 C 864%2c8.4 936%2c165.8 1080%2c185 C 1224%2c204.2 1368%2c118.6 1440%2c102L1440 560L0 560z' fill='rgba(226%2c 217%2c 217%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c350 C 96%2c387.8 288%2c531.8 480%2c539 C 672%2c546.2 768%2c403.6 960%2c386 C 1152%2c368.4 1344%2c438 1440%2c451L1440 560L0 560z' fill='rgba(206%2c 194%2c 199%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1092'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
}
.bg-ala2 {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='900' height='560' preserveAspectRatio='none' viewBox='0 0 900 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1092%26quot%3b)' fill='none'%3e%3crect width='900' height='560' x='0' y='0' fill='rgba(244%2c 240%2c 237%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c369.257C71.289%2c376.465%2c139.471%2c348.465%2c204.205%2c317.749C276.729%2c283.337%2c356.276%2c250.538%2c396.55%2c181.098C438.126%2c109.413%2c443.705%2c19.513%2c423.838%2c-60.939C404.86%2c-137.789%2c343.018%2c-192.512%2c289.815%2c-251.126C237.847%2c-308.379%2c188.603%2c-369.396%2c117.115%2c-398.857C41.001%2c-430.225%2c-45.866%2c-448.142%2c-123.787%2c-421.579C-200.664%2c-395.372%2c-245.096%2c-319.833%2c-297.278%2c-257.593C-348.587%2c-196.394%2c-413.258%2c-140.091%2c-425.897%2c-61.235C-438.602%2c18.037%2c-412.42%2c101.826%2c-365.301%2c166.828C-321.929%2c226.661%2c-243.924%2c243.156%2c-179.286%2c278.975C-119.55%2c312.078%2c-67.949%2c362.387%2c0%2c369.257' fill='%23c8b4a5'%3e%3c/path%3e%3cpath d='M900 783.407C948.188 792.2760000000001 1000.425 806.467 1044.013 784.0889999999999 1088.481 761.259 1121.605 714.398 1130.296 665.173 1138.504 618.688 1098.493 579.022 1088.3600000000001 532.918 1079.2640000000001 491.532 1093.664 446.751 1074.035 409.198 1051.912 366.875 1020.252 317.668 972.843 311.91999999999996 924.43 306.05 894.072 366.774 847.6610000000001 381.751 803.211 396.095 742.851 362.058 711.158 396.36699999999996 679.734 430.385 717.373 487.016 708.4449999999999 532.458 698.764 581.729 639.307 623.965 657.2239999999999 670.872 674.83 716.9639999999999 741.688 715.933 786.453 736.683 824.353 754.251 858.9159999999999 775.845 900 783.407' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1092'%3e%3crect width='900' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
}
</style>
