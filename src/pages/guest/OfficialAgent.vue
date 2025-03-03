<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import placeholderImage from '@/assets/images/placeholder-image.jpg'
import OfficialAgent from '@/pages/guest/welcome/OfficialAgent.vue'
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
                            :src="placeholderImage"
                            aspect-ratio="1"
                            class="h-[150px] min-w-full min-h-full rounded-md border"
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
                </div>
            </div>
            <OfficialAgent />
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
                                <div class="flex flex-row gap-2 items-center">
                                    <div class="w-5 h-5 bg-blue-400"></div>
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
                            <div
                                class="w-full md:w-[650px] lg:w-[980px] mx-auto bg-white p-5 rounded-lg flex flex-col gap-3 duration-5a00 justify-center">
                                <p class="font-medium">Beauty Shop</p>
                                <div class="flex flex-row gap-2 items-center">
                                    <div class="w-5 h-5 bg-blue-400"></div>
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
                                    <iframe
                                        class="w-full max-h-full"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.092003425637!2d106.7658715148677!3d-6.382125364202836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edbeb519bf51%3A0x6d828d2767b5f00c!2sjvalley%20jemblongan!5e0!3m2!1sid!2sid!4v1667524208246!5m2!1sid!2sid"
                                        width="600"
                                        height="450"
                                        style="border: 0"
                                        allowfullscreen=""
                                        loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                <button
                                    @click="isActive.value = false"
                                    class="py-3 px-5 hover:bg-black/30 hover:text-white duration-300 rounded border">
                                    Close
                                </button>
                            </div>
                        </template>
                    </v-dialog>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
