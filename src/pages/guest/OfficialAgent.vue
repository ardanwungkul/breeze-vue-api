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
                        <v-img
                            :key="n"
                            src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                            aspect-ratio="1"
                            class=" h-[150px] min-w-full min-h-full rounded-md border"
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
                                <v-img
                                    :src="'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'"
                                    aspect-ratio="1"
                                    class=" w-20 h-20 object-cover rounded-full"
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
                    <v-dialog>
                        <template v-slot:activator="{ props: activatorProps }">
                            <div
                                v-bind="activatorProps"
                                class="hover:bg-[#e2d9d9] bg-[#f4f0ed] cursor-pointer duration-300 rounded-md p-5 shadow flex flex-col gap-2"
                                v-for="index in 6"
                                :key="index">
                                <p class="font-medium">Beauty Shop</p>
                                <div class=" flex flex-row gap-2 items-center">
                                    <div class=" w-5 h-5 bg-blue-400"></div>
                                    <p>Emerald</p>
                                </div>
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
                        </template>

                        <template v-slot:default="{ isActive }">
                            <div class=" w-full md:w-[650px] lg:w-[980px] mx-auto bg-white p-5 rounded-lg flex flex-col gap-3 duration-5a00 justify-center">
                                <p class="font-medium">Beauty Shop</p>
                                <div class=" flex flex-row gap-2 items-center">
                                    <div class=" w-5 h-5 bg-blue-400"></div>
                                    <p>Emerald</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <p class="text-gray-600">Rating :</p>
                                    <div class="flex gap-1">
                                        <i
                                            v-for="n in 5"
                                            :key="n"
                                            class="fa-solid fa-star text-yellow-400"></i>
                                    </div>
                                </div>
                                <div class="flex h-80 mx-auto mb-5 w-full">
                                    <iframe class=" w-full max-h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.092003425637!2d106.7658715148677!3d-6.382125364202836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edbeb519bf51%3A0x6d828d2767b5f00c!2sjvalley%20jemblongan!5e0!3m2!1sid!2sid!4v1667524208246!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                <button @click="isActive.value = false" class=" py-3 px-5 hover:bg-black/30 hover:text-white duration-300 rounded border">Close</button>
                            </div>
                        </template>
                    </v-dialog>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
