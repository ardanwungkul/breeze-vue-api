<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode';
import 'swiper/css/navigation'
import 'swiper/css/thumbs';

const modules = [ FreeMode, Thumbs, Navigation, Autoplay, Pagination]
const swiperJs = swiper => {}

</script>
<template>
    <AppLayout>
        <!-- Top -->
        <swiper
        :modules="modules"
        :loop="true"
        :speed= 1300
        :autoplay="{
            delay: 3000,
        }"
        @swiper="swiperJs"
        >
            <swiper-slide v-for="i in 3" :key="i">
                <div style="background-image: url('public/assets/images/banner3.jpg')" class=" bg-cover bg-center w-full min-h-44 md:min-h-72 flex justify-center items-center">
                    <div class=" flex flex-col  min-h-full justify-center">
                        <div class=" text-center text-2xl md:text-3xl text-white mb-3">
                            LET'S LAUNCH YOUR BRAND
                        </div>
                        <div class=" text-center text-xs text-white mb-5">
                            Maroon is a elegant and beatiful Genesis Child theme brand for creative skincare women
                        </div>
                        <div class=" flex flex-row justify-center gap-4 text-xs">
                            <button class=" py-2 px-3 bg-white">LEARN MORE</button>
                            <button class=" py-2 px-3 bg-white" >SHOP NOW</button>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <!-- Get Update -->
        <div class=" w-full flex justify-center">
            <div class=" w-full flex flex-col md:flex-row align-middle justify-between px-5 md:px-0 py-5 max-w-[1320px]">
                <div class=" flex flex-row ">
                    <div class=" w-8 h-8 mb-3 md:mb-0">
                        <svg class="feather feather-mail" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div class=" font-semibold">getupdate</div>
                </div>
                <input type="text" class=" mb-3 md:mb-0 border-none h-8 px-4 w-full md:w-2/6" name="" id="" placeholder="Detail name">
                <input type="text" class=" mb-3 md:mb-0 border-none h-8 px-4 w-full md:w-2/6" name="" id="" placeholder="Gmail address" >
                <button class=" border py-1 md:py-0 border-yellow-400 px-12" >Go</button>
            </div>
        </div>
        <!-- Carousel -->
        <swiper
        :navigation="true"
        :modules="modules"
        :loop="true"
        :speed= 1300
        :autoplay="{
            delay: 5000,
        }"
        @swiper="swiperJs"
        >
            <swiper-slide>
                <div style="background-image: url(/public/assets/images/banner4.jpg)" class=" w-full   md:min-h-screen min-h-[50vh] h-[50vh] bg-cover bg-center mb-16">
                    <div class=" max-w-[1320px] mx-auto">
                        <div class=" w-4/5 md:w-5/12 pl-4 pt-10 md:pt-40 md:pl-0 text-white">
                            <div class=" font-semibold text-base md:text-lg mb-2">s k i n c a r e</div>
                            <div class=" text-4xl md:text-5xl font-bold ">Beauty Skin</div>
                            <div class=" text-4xl md:text-5xl font-bold ">Best skincare</div>
                            <div class=" text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi</div>
                            <div class=" flex flex-row gap-2">
                                <button class=" p-2 text-black bg-white border border-white font-medium">SEE MORE</button>
                                <button class=" font-medium p-2 border border-white">SUBSCRIBE</button>
                            </div>
                    </div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div style="background-image: url(/public/assets/images/banner2.jpg)" class=" w-full   md:min-h-screen min-h-[50vh] h-[50vh] bg-cover bg-center mb-16">
                    <div class=" max-w-[1320px] mx-auto">
                        <div class=" w-4/5 md:w-5/12 pl-4 pt-10 md:pt-40 md:pl-0 text-white">
                            <div class=" font-semibold text-base md:text-lg mb-2">s k i n c a r e</div>
                            <div class=" text-4xl md:text-5xl font-bold ">Beauty Skin</div>
                            <div class=" text-4xl md:text-5xl font-bold ">Best skincare</div>
                            <div class=" text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi</div>
                            <div class=" flex flex-row">
                                <button class=" p-2 text-black bg-white border border-white font-medium">SEE MORE</button>
                                <button class=" font-medium p-2 border border-white">SUBSCRIBE</button>
                            </div>
                    </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <!-- Saya Orang -->
        <div class=" w-full max-w-[1140px] mx-auto flex flex-row justify-center min-h-[80vw] md:min-h-screen gap-5 pb-16 py-0 md:py-16 relative">
            <div class=" max-w-[70vw] md:max-w-[43%] text-center absolute top-32 md:top-[24rem] left-10 md:left-60 z-50 py-5 px-7 border-black border">
                <div style="font-family: 'Grand Hotel'" class=" text-xl md:text-3xl mb-4">Saya Orang</div>
                <hr class=" border-black mb-4">
                <div class=" text-[10px] md:text-xs mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores reprehenderit illum sunt corporis ex maiores numquam, ut error dignissimos voluptates rem fugiat officia nostrum sit natus doloremque distinctio.</div>
                <button class=" border border-black p-2 text-xs">LEARN MORE</button>
            </div>
            <div style="background-color: rgb(241, 237, 237);" class=" absolute w-[20vw] h-32 max-h-[80px] md:max-h-screen md:w-[26vh] md:min-h-[25vh] -rotate-90 top-12 left-2 md:top-64 md:left-10 text-sm md:text-xl font-light">-Blog</div>
            <div style="background-color: rgb(241, 237, 237);" class=" absolute w-[20vw] md:w-[26vh] h-32 md:min-h-[25vh] rotate-90 top-24 right-8 md:top-96 md:right-10 text-sm md:text-xl font-light text-right">About</div>
            <div class=" w-[47vw] md:w-[47%] h-[30vw] md:min-h-[35vh] max-h-[35vh] relative">
                <img src="/public/assets/images/flower.jpeg" alt="" srcset="">
            </div>
            <div class="w-[35vw] md:w-[35%] h-[40vw] md:min-h-[60vh] max-h-[60vh] relative">
                <img src="/public/assets/images/person.jpeg" alt="" srcset="">
            </div>
        </div>
        <!-- Skincare -->
        <div class=" w-full max-w-[1320px] px-3 md:px-0 mx-auto grid grid-cols-1 md:grid-cols-3 py-16 gap-7">
            <div v-for="i in 3" :key="i" class=" p-5 bg-white">
                <div class=" w-full min-h-48 mb-5">
                    <img src="/public/assets/images/banner-5.jpeg" alt="" srcset="">
                </div>
                <div class=" text-center mb-2 font-medium">Skincare</div>
                <div class=" mb-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut eum similique repellat a laborum, rerum voluptates ipsam eos.</div>
                <div>
                    <button class=" p-2 border">Skincare</button>
                </div>
            </div>
        </div>
        <!-- Videos -->
        <div class=" w-full max-w-[1320px] px-4 md:px-0 mx-auto flex flex-col py-16 justify-center">
            <div class=" text-3xl text-center mb-5">Videos</div>
            <div class=" w-full grid grid-cols-1 md:grid-cols-3 gap-7">
                <div v-for="i in 3" :key="i" class=" w-full min-h-52 rounded overflow-hidden">
                    <iframe class=" w-full h-full" src="https://www.youtube.com/embed/otej7WLdPh0?si=hTKjPRESNEp9Gmd3" title="YouTube video"
                    allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

