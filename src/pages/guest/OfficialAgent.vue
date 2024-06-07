<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'

const modules = [Navigation, Autoplay]
const swiperJs = swiper => {}
</script>
<template>
    <AppLayout>
        <div class="space-y-16 max-w-[1140px] mx-auto pb-12">
            <div
                class="flex flex-wrap pt-6 gap-3 sm:w-[70%] px-3 sm:px-0 mx-auto text-center">
                <p class="text-[40px] text-[#212529] font-medium w-full">
                    Our Official Agent
                </p>
                <div class="space-y-4">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptas dolore, quaerat reiciendis provident ipsa
                        voluptate illum facilis sit fugit. Ab magnam et incidunt
                        eveniet, tempora dignissimos
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptas dolore, quaerat reiciendis provident ipsa
                        voluptate illum facilis sit fugit. Ab magnam et incidunt
                        eveniet, tempora dignissimos
                    </p>
                </div>
                <div
                    class="grid sm:grid-cols-3 grid-cols-1 gap-y-3 w-full mt-8">
                    <div
                        v-for="n in 3"
                        class="w-full px-3 flex items-center justify-center">
                        <img
                            :key="n"
                            src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                            class="h-[150px] object-cover rounded-md border"
                            alt="" />
                    </div>
                </div>
            </div>
            <div class="px-3 sm:px-0">
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
                                <img
                                    src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                                    alt=""
                                    class="w-20 h-20 object-cover rounded-full" />
                                <p class="text-gray-600">
                                    Lorem ipsum dolor sit amet, consec
                                    adipiscing elit. Nam eusem scelerisque
                                    tempor, varius quam
                                </p>
                                <div>
                                    <svg
                                        viewBox="0 0 32 32"
                                        class="w-8 fill-gray-300">
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
                        <button
                            class="rounded-md tracking-widest uppercase font-semibold text-gray-700 transition-all duration-500 hover:bg-[#f8f8f6] hover:shadow px-10 py-2">
                            Let's Become Partners!
                        </button>
                    </div>
                </div>
            </div>
            <div class="px-10">
                <div class="grid md:grid-cols-3 grid-cols-1 w-full gap-6">
                    <div
                        class="bg-[#f4f0ed] rounded-md p-5 shadow"
                        v-for="index in 6"
                        :key="index">
                        <p class="font-medium">Beauty Shop</p>
                        <div class="flex items-center gap-2">
                            <p class="text-gray-600">Rating :</p>
                            <div class="flex gap-1">
                                <i
                                    v-for="n in 5"
                                    :key="n"
                                    class="fa-solid fa-star text-yellow-400"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
