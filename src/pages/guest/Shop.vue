<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { RouterLink } from 'vue-router'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
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
        <!-- Videos -->
        <div class="w-full min-h-96 relative overflow-hidden bg-black">
            <div
                :class="{ active: activeVideo === 1, 'z-0': activeVideo !== 1 }"
                class="absolute top-0 left-0 curved-c w-full min-h-96 bg-red-500 overflow-hidden flex justify-center items-center">
                <video
                    class="object-cover w-full h-full"
                    src="@/assets/images/vid1.mp4"
                    autoplay
                    muted
                    loop></video>
            </div>
            <div
                :class="{ active: activeVideo === 2, 'z-0': activeVideo !== 2 }"
                class="absolute top-0 left-0 curved-c w-full min-h-96 bg-blue-500 overflow-hidden">
                <video
                    class="-mt-40 w-full h-full"
                    src="@/assets/images/vid2.mp4"
                    autoplay
                    muted
                    loop></video>
            </div>
            <div
                :class="{ active: activeVideo === 3, 'z-0': activeVideo !== 3 }"
                class="absolute top-0 left-0 curved-c w-full min-h-96 bg-green-500 overflow-hidden">
                <video
                    class="-mt-40 w-full h-full"
                    src="@/assets/images/vid3.mp4"
                    autoplay
                    muted
                    loop></video>
            </div>
            <div
                class="w-full min-h-96 bg-black/50 absolute top-0 left-0 z-20"></div>
            <div
                class="absolute top-0 right-14 flex flex-col min-h-full gap-5 justify-center z-30">
                <RouterLink
                    class="ml-0.5 w-5 min-h-5 duration-200 hover:scale-125">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 1227"
                        fill="none">
                        <g clip-path="url(#a)">
                            <path
                                d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                                fill="#ffffff"
                                class="fill-000000"></path>
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path
                                    fill="#ffffff"
                                    d="M0 0h1200v1227H0z"
                                    class="fill-ffffff"></path>
                            </clipPath>
                        </defs>
                    </svg>
                </RouterLink>
                <RouterLink class="w-6 min-h-6 duration-200 hover:scale-125">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 56.7 56.7"
                        xml:space="preserve">
                        <path
                            d="M28.2 16.7c-7 0-12.8 5.7-12.8 12.8s5.7 12.8 12.8 12.8S41 36.5 41 29.5s-5.8-12.8-12.8-12.8zm0 21c-4.5 0-8.2-3.7-8.2-8.2s3.7-8.2 8.2-8.2 8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"
                            fill="#ffffff"
                            class="fill-000000"></path>
                        <circle
                            cx="41.5"
                            cy="16.4"
                            r="2.9"
                            fill="#ffffff"
                            class="fill-000000"></circle>
                        <path
                            d="M49 8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7 0-14.5 5.8-14.5 14.5v20.5c0 4.3 1.4 8 4.2 10.7 2.7 2.6 6.3 3.9 10.4 3.9h20.4c4.3 0 7.9-1.4 10.5-3.9 2.7-2.6 4.1-6.3 4.1-10.6V19.3c0-4.2-1.4-7.8-4-10.4zm-.4 31c0 3.1-1.1 5.6-2.9 7.3s-4.3 2.6-7.3 2.6H18c-3 0-5.5-.9-7.3-2.6C8.9 45.4 8 42.9 8 39.8V19.3c0-3 .9-5.5 2.7-7.3 1.7-1.7 4.3-2.6 7.3-2.6h20.6c3 0 5.5.9 7.3 2.7 1.7 1.8 2.7 4.3 2.7 7.2v20.6z"
                            fill="#ffffff"
                            class="fill-000000"></path>
                    </svg>
                </RouterLink>
                <RouterLink class="w-6 min-h-6 duration-200 hover:scale-125">
                    <svg
                        viewBox="0 0 56.693 56.693"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M40.43 21.739h-7.645v-5.014c0-1.883 1.248-2.322 2.127-2.322h5.395V6.125l-7.43-.029c-8.248 0-10.125 6.174-10.125 10.125v5.518h-4.77v8.53h4.77v24.137h10.033V30.269h6.77l.875-8.53z"
                            fill="#ffffff"
                            class="fill-000000"></path>
                    </svg>
                </RouterLink>
            </div>
            <div
                class="absolute bottom-9 flex flow-row w-full gap-5 justify-center z-30">
                <button
                    @click="toggleVideo(1)"
                    :class="{
                        'w-8': activeVideo === 1,
                        'w-4': activeVideo !== 1,
                    }"
                    class="min-h-4 rounded-[8px] duration-300 bg-white"></button>
                <button
                    @click="toggleVideo(2)"
                    :class="{
                        'w-8': activeVideo === 2,
                        'w-4': activeVideo !== 2,
                    }"
                    class="min-h-4 rounded-[8px] duration-300 bg-white"></button>
                <button
                    @click="toggleVideo(3)"
                    :class="{
                        'w-8': activeVideo === 3,
                        'w-4': activeVideo !== 3,
                    }"
                    class="w-4 min-h-4 rounded-[8px] duration-300 bg-white focus:w-8"></button>
            </div>
        </div>
        <!-- Banner -->
        <div class="w-full py-16">
            <div class="flex flex-col mx-auto w-full max-w-[1320px] relative">
                <swiper
                    class="max-w-[1320px] mb-2"
                    :navigation="swiperConfig.navigation"
                    :modules="swiperModules"
                    :loop="true"
                    :speed="1300"
                    :allowTouchMove="false"
                    :autoplay="{
                        delay: 4000,
                    }"
                    @swiper="swiperJs">
                    <swiper-slide>
                        <div
                            class="w-full max-h-52 bg-black flex items-center relative">
                            <img
                                class="w-full"
                                src="@/assets/images/banner-flash.jpg"
                                alt=""
                                srcset="" />
                            <div
                                class="absolute w-full h-full bg-black/50"></div>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div
                            class="w-full max-h-52 bg-black flex items-center relative">
                            <img
                                class="w-full"
                                src="@/assets/images/banner-flash2.jpg"
                                alt=""
                                srcset="" />
                            <div
                                class="absolute w-full h-full bg-black/50"></div>
                        </div>
                    </swiper-slide>
                    <div
                        class="absolute z-30 flex flex-row w-full min-h-full top-0 justify-between">
                        <div
                            class="swiper-button-next opacity-50 duration-200 hover:opacity-100 min-h-full flex justify-center items-center cursor-pointer pl-20">
                            <div class="w-12 h-12 bg-black">
                                <svg
                                    height="48"
                                    viewBox="0 0 48 48"
                                    width="48"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill="white"
                                        d="M30.83 32.67l-9.17-9.17 9.17-9.17-2.83-2.83-12 12 12 12z" />
                                    <path d="M0-.5h48v48h-48z" fill="none" />
                                </svg>
                            </div>
                        </div>
                        <div
                            class="swiper-button-prev opacity-50 duration-200 hover:opacity-100 min-h-full flex justify-center items-center cursor-pointer pr-20">
                            <div class="w-12 h-12 bg-black">
                                <svg
                                    height="48"
                                    viewBox="0 0 48 48"
                                    width="48"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill="white"
                                        d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z" />
                                    <path d="M0-.25h48v48h-48z" fill="none" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </swiper>
                <div class="justify-center max-w-[25%] px-5">
                    <div
                        class="flex justify-center mb-2 text-2xl font-semibold text-red-600">
                        FLASH SALE
                    </div>
                    <div
                        class="flex justify-center text-xl font-light text-gray-500 flex-row gap-10">
                        <div>12</div>
                        <div>12</div>
                        <div>12</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- New Product -->
        <div class="w-full pb-16">
            <div
                class="flex flex-col justify-center mx-auto w-full max-w-[1140px] px-16 relative">
                <div class="w-full flex justify-center gap-4 text-base">
                    <div
                        style="background-color: rgb(237, 241, 255)"
                        class="w-1/3 flex flex-row py-4"
                        v-for="i in 3"
                        :key="i">
                        <div class="w-1/3 text-center relative ml-4">
                            <div class="absolute top-1/2 -translate-y-1/2">
                                New Product Upto 50% off
                            </div>
                        </div>
                        <div class="w-1/2 max-h-32 py-2 flex justify-center">
                            <img
                                class="max-h-full"
                                src="@/assets/images/skincare6.png"
                                alt=""
                                srcset="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Search Item -->
        <div class="w-full pb-16">
            <div
                class="flex flex-col justify-center mx-auto w-full max-w-[1320px] relative">
                <div class="w-full flex flow-row gap-5">
                    <div class="w-1/4">
                        <div class="border p-4">
                            <div class="font-medium mb-2">Filter by Price</div>
                            <input
                                id="medium-range"
                                type="range"
                                min="0"
                                max="300000"
                                value="0"
                                class="w-full h-1 bg-gray-400 border-none accent-slate-700 rounded-lg cursor-pointer" />
                            <div class="mt-2 mb-6">Rp.</div>
                            <div class="font-medium mb-2">Filter By Rating</div>
                            <select
                                name=""
                                id=""
                                class="border-black/20 bg-transparent py-2 hover:border-black/30 mb-10">
                                <option value="1star">Select Rating</option>
                                <option value="1star">*</option>
                                <option value="2star">**</option>
                                <option value="3star">***</option>
                                <option value="4star">****</option>
                                <option value="5star">*****</option>
                            </select>
                        </div>
                        <div class="border border-t-transparent py-4">
                            <div class="font-medium mb-4 px-4">Categories</div>
                            <!-- Skincare -->
                            <div
                                @click="toggleClass(1)"
                                class="w-full flex flex-row px-4 py-2 justify-between hover:text-darkbrownshop">
                                <div class="">Skincare</div>
                                <div class="w-4 h-4">
                                    <svg
                                        class="feather feather-chevron-down"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </div>
                            <div
                                :class="{
                                    block: activeDiv === 1,
                                    hidden: activeDiv !== 1,
                                }"
                                class="bg-brownshop py-4">
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Brigthening Series
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Acne Series
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Youth Series
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Eye Cream
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Anti Wringkle Serum
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Peeling Serum
                                </button>
                            </div>
                            <!-- Cosmetic -->
                            <div
                                @click="toggleClass(2)"
                                class="w-full flex flex-row px-4 py-2 justify-between hover:text-darkbrownshop">
                                <div class="">Cosmetic</div>
                                <div class="w-4 h-4">
                                    <svg
                                        class="feather feather-chevron-down"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </div>
                            <div
                                :class="{
                                    block: activeDiv === 2,
                                    hidden: activeDiv !== 2,
                                }"
                                class="bg-brownshop py-4">
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Liptint
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Lip Cream
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Lip Glose
                                </button>
                            </div>
                            <!-- Body Care -->
                            <div
                                @click="toggleClass(3)"
                                class="w-full flex flex-row px-4 py-2 justify-between hover:text-darkbrownshop">
                                <div class="">Body Care</div>
                                <div class="w-4 h-4">
                                    <svg
                                        class="feather feather-chevron-down"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </div>
                            <div
                                :class="{
                                    block: activeDiv === 3,
                                    hidden: activeDiv !== 3,
                                }"
                                class="bg-brownshop py-4">
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Body Wash
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Peaching Body Spray
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Coffe Mask And Body Scrub
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Body Serum
                                </button>
                                <button
                                    class="w-full py-1 px-4 text-left hover:bg-white">
                                    Instant Glow Body Serum
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="w-3/4 flex flex-col">
                        <div class="flex flex-row justify-between mb-5">
                            <div class="h-8 flex flex-row">
                                <input
                                    type="text"
                                    class="text-gray-600 border bg-transparent border-gray-200 focus:ring-transparent focus:border-gray-200"
                                    placeholder="Search by name" />
                                <button
                                    class="w-10 border flex justify-center items-center border-gray-200">
                                    <svg
                                        height="20"
                                        viewBox="0 0 24 24"
                                        width="20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill="#D19C97"
                                            d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
                                    </svg>
                                </button>
                            </div>
                            <ul class="max-h-8 flex flex-row">
                                <li>
                                    <button
                                        type="button"
                                        class="h-8 text-sm px-4 bg-customLightPurple focus:text-white focus:bg-semupink duration-200">
                                        Most Relevan
                                    </button>
                                    <button
                                        type="button"
                                        class="h-8 text-sm px-4 bg-customLightPurple focus:text-white focus:bg-semupink duration-200">
                                        Most Rated
                                    </button>
                                    <button
                                        type="button"
                                        class="h-8 text-sm px-4 bg-customLightPurple focus:text-white focus:bg-semupink duration-200">
                                        Recomended
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="grid grid-cols-4 gap-8">
                            <div
                                class="flex flex-col min-w-[32.2%] rounded-3xl overflow-hidden w-full shadow-lg shadow-black/20"
                                v-for="i in 8"
                                :key="i">
                                <div class="w-full bg-brownshop h-40">
                                    <img src="" alt="" srcset="" />
                                </div>
                                <div class="p-4">
                                    <div class="text-normal font-medium mb-2">
                                        Face Wash
                                    </div>
                                    <div class="flex flex-row justify-between">
                                        <div class="mt-3">
                                            <RouterLink
                                                to="#"
                                                class="text-base bg-semupink text-white p-2 px-3 duration-300 hover:border-transparent rounded-xl hover:text-gray-500">
                                                Buy
                                            </RouterLink>
                                        </div>
                                        <div
                                            class="text-slate-500 text-normal flex flex-col">
                                            <div
                                                class="mb-2 flex flex-row justify-between">
                                                <div
                                                    class="w-4 h-4"
                                                    v-for="i in 5"
                                                    :key="i">
                                                    <svg
                                                        baseProfile="tiny"
                                                        height="24px"
                                                        id="Layer_1"
                                                        version="1.2"
                                                        viewBox="0 0 24 24"
                                                        width="24px"
                                                        xml:space="preserve"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <g>
                                                            <g>
                                                                <path
                                                                    fill="yellow"
                                                                    d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z" />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="">Rp. 200.000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Select Product -->
        <div class="w-full py-16">
            <div
                class="flex flex-col justify-center mx-auto w-full max-w-[1320px] relative">
                <div class="w-full flex flex-row gap-5">
                    <div class="w-1/4 min-h-10">
                        <img
                            class="w-11/12"
                            src="@/assets/images/banner1.png"
                            alt="" />
                    </div>
                    <div class="w-3/4">
                        <table class="w-full">
                            <tr class="border-t">
                                <td
                                    class="font-bold text-lg w-1/3 text-gray-500">
                                    Select Product
                                </td>
                                <td class="w-1/3 p-4">
                                    <select
                                        class="w-full bg-transparent border border-gray-300 py-1"
                                        name=""
                                        id="">
                                        <option value="">
                                            Select Anyone/option
                                        </option>
                                    </select>
                                </td>
                                <td class="w-1/3 p-4">
                                    <select
                                        class="w-full bg-transparent border border-gray-300 py-1"
                                        name=""
                                        id="">
                                        <option value="">
                                            Select Anyone/option
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr class="border-t">
                                <td
                                    class="font-bold text-lg w-full py-4 flex text-gray-500">
                                    Product Image
                                </td>
                                <td class="w-1/3 p-4">
                                    <div
                                        class="w-4/6 mx-auto rounded-lg flex justify-center items-center h-64 bg-gray-600 overflow-hidden">
                                        <img
                                            class="min-h-full max-h-full min-w-full max-w-full"
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                            alt="" />
                                    </div>
                                </td>
                                <td class="w-1/3 p-4">
                                    <div
                                        class="w-4/6 mx-auto rounded-lg flex justify-center items-center h-64 bg-gray-600 overflow-hidden">
                                        <img
                                            class="min-h-full max-h-full min-w-full max-w-full"
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                            alt="" />
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-t">
                                <td
                                    class="font-bold text-lg w-1/3 text-gray-500">
                                    Product Price
                                </td>
                                <td class="w-1/3 text-gray-500 p-4">N/A</td>
                                <td class="w-1/3 text-gray-500 p-4">N/A</td>
                            </tr>
                            <tr class="border-t">
                                <td
                                    class="font-bold text-lg w-1/3 text-gray-500">
                                    Product Description
                                </td>
                                <td class="w-1/3 text-gray-500 p-4">N/A</td>
                                <td class="w-1/3 text-gray-500 p-4">N/A</td>
                            </tr>
                            <tr class="border-t">
                                <td
                                    class="font-bold text-lg w-1/3 text-gray-500">
                                    Product Brand
                                </td>
                                <td class="w-1/3 text-gray-500 p-4">N/A</td>
                                <td class="w-1/3 text-gray-500 p-4">N/A</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Discount -->
        <div class="w-full pb-16">
            <div
                style="background-color: rgb(229, 231, 243)"
                class="flex flex-row justify-between mx-auto p-16 w-full max-w-[1320px] relative">
                <div class="w-3/5 flex flex-col justify-start">
                    <div class="mb-5 text-gray-500">
                        Hurry ip and get 25% discount
                    </div>
                    <div class="mb-3 text-3xl">Deals of the week</div>
                    <div class="text-gray-500 mb-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dignissimos, nesciunt? Unde voluptas doloribus quia et.
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                    </div>
                    <div>
                        <button
                            class="py-2 px-3 bg-red-600 duration-200 hover:bg-red-700 text-white">
                            how Collection
                        </button>
                    </div>
                </div>
                <div class="w-1/3 h-72 flex justify-center">
                    <img
                        class="max-w-full max-h-full"
                        src="@/assets/images/skincare6.png"
                        alt="" />
                </div>
            </div>
        </div>
        <!-- Footer -->
        <!-- <div class="w-full py-16 bg-black text-white">
            <div
                class="flex flex-col mx-auto justify-center w-full max-w-[1120px] relative">
                <div class="flex flex-row justify-between mb-14">
                    <div class="w-[31%]">
                        <div class="text-2xl mb-5">About Us</div>
                        <div class="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut elit tellus, luctus nec ullamcorper mattis,
                            pulvinar dapibus leo.
                        </div>
                    </div>
                    <div class="w-[31%]">
                        <div class="text-2xl mb-5">Follow Us</div>
                        <div class="">
                            <div class="flex">
                                <div class="w-5 mr-2 mb-2">
                                    <svg
                                        viewBox="0 0 512 512"
                                        xml:space="preserve"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        stroke-linejoin="round"
                                        stroke-miterlimit="2">
                                        <path
                                            d="M512 256C512 114.615 397.385 0 256 0S0 114.615 0 256c0 127.777 93.616 233.685 216 252.89V330h-65v-74h65v-56.4c0-64.16 38.219-99.6 96.695-99.6 28.009 0 57.305 5 57.305 5v63h-32.281C305.918 168 296 187.733 296 207.978V256h71l-11.35 74H296v178.89C418.385 489.685 512 383.777 512 256Z"
                                            fill="#ffffff"
                                            fill-rule="nonzero"
                                            class="fill-1877f2"></path>
                                        <path
                                            d="M355.65 330 367 256h-71v-48.022c0-20.245 9.917-39.978 41.719-39.978H370v-63s-29.297-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.89a257.912 257.912 0 0 0 40 3.11c13.608 0 26.966-1.065 40-3.11V330h59.65Z"
                                            fill="#000000"
                                            fill-rule="nonzero"
                                            class="fill-ffffff"></path>
                                    </svg>
                                </div>
                                <div class="text-sm">ezzora.official</div>
                            </div>
                            <div class="flex">
                                <div class="w-5 mr-2 mb-2">
                                    <svg
                                        viewBox="0 0 600 600"
                                        xml:space="preserve"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        stroke-linejoin="round"
                                        stroke-miterlimit="2">
                                        <path
                                            d="M251.921.159c-68.418 0-76.997.29-103.867 1.516-26.814 1.224-45.127 5.482-61.152 11.71-16.566 6.438-30.615 15.052-44.62 29.057-14.005 14.005-22.619 28.054-29.057 44.62-6.228 16.024-10.486 34.337-11.71 61.151C.289 175.083 0 183.662 0 252.08c0 68.417.289 76.996 1.515 103.866 1.224 26.814 5.482 45.127 11.71 61.151 6.438 16.566 15.052 30.615 29.057 44.621 14.005 14.005 28.054 22.619 44.62 29.057 16.025 6.227 34.338 10.486 61.152 11.709 26.87 1.226 35.449 1.516 103.867 1.516 68.417 0 76.996-.29 103.866-1.516 26.814-1.223 45.127-5.482 61.151-11.709 16.566-6.438 30.615-15.052 44.621-29.057 14.005-14.006 22.619-28.055 29.057-44.621 6.227-16.024 10.486-34.337 11.709-61.151 1.226-26.87 1.516-35.449 1.516-103.866 0-68.418-.29-76.997-1.516-103.867-1.223-26.814-5.482-45.127-11.709-61.151-6.438-16.566-15.052-30.615-29.057-44.62-14.006-14.005-28.055-22.619-44.621-29.057-16.024-6.228-34.337-10.486-61.151-11.71C328.917.449 320.338.159 251.921.159Zm0 45.392c67.265 0 75.233.256 101.797 1.468 24.562 1.121 37.901 5.225 46.778 8.674 11.759 4.57 20.151 10.03 28.966 18.845 8.816 8.815 14.275 17.208 18.845 28.966 3.45 8.877 7.554 22.216 8.674 46.778 1.212 26.564 1.469 34.532 1.469 101.798 0 67.265-.257 75.233-1.469 101.797-1.12 24.562-5.224 37.901-8.674 46.778-4.57 11.759-10.029 20.151-18.845 28.966-8.815 8.816-17.207 14.275-28.966 18.845-8.877 3.45-22.216 7.554-46.778 8.674-26.56 1.212-34.527 1.469-101.797 1.469-67.271 0-75.237-.257-101.798-1.469-24.562-1.12-37.901-5.224-46.778-8.674-11.759-4.57-20.151-10.029-28.967-18.845-8.815-8.815-14.275-17.207-18.844-28.966-3.45-8.877-7.554-22.216-8.675-46.778-1.212-26.564-1.468-34.532-1.468-101.797 0-67.266.256-75.234 1.468-101.798 1.121-24.562 5.225-37.901 8.675-46.778 4.569-11.758 10.029-20.151 18.844-28.966 8.816-8.815 17.208-14.275 28.967-18.845 8.877-3.449 22.216-7.553 46.778-8.674 26.564-1.212 34.532-1.468 101.798-1.468Z"
                                            transform="translate(44 43.838) scale(1.01619)"
                                            fill-rule="nonzero"
                                            fill="#ffffff"
                                            class="fill-000000"></path>
                                        <path
                                            d="M251.921 336.053c-46.378 0-83.974-37.596-83.974-83.973 0-46.378 37.596-83.974 83.974-83.974 46.377 0 83.973 37.596 83.973 83.974 0 46.377-37.596 83.973-83.973 83.973Zm0-213.338c-71.447 0-129.365 57.918-129.365 129.365 0 71.446 57.918 129.364 129.365 129.364 71.446 0 129.364-57.918 129.364-129.364 0-71.447-57.918-129.365-129.364-129.365ZM416.627 117.604c0 16.696-13.535 30.23-30.231 30.23-16.695 0-30.23-13.534-30.23-30.23 0-16.696 13.535-30.23 30.23-30.23 16.696 0 30.231 13.534 30.231 30.23Z"
                                            transform="translate(44 43.838) scale(1.01619)"
                                            fill="#ffffff"
                                            fill-rule="nonzero"
                                            class="fill-030404"></path>
                                    </svg>
                                </div>
                                <div class="text-sm">ezzora.official</div>
                            </div>
                            <div class="flex">
                                <div class="w-5 mr-2 mb-2">
                                    <svg
                                        viewBox="0 0 448 512"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"
                                            fill="#ffffff"
                                            class="fill-000000"></path>
                                    </svg>
                                </div>
                                <div class="text-sm">ezzora.official</div>
                            </div>
                            <div class="flex">
                                <div class="w-5 mr-2 mb-2">
                                    <svg
                                        viewBox="0 0 512 512"
                                        xml:space="preserve"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        stroke-linejoin="round"
                                        stroke-miterlimit="2">
                                        <path
                                            d="M501.299 132.766c-5.888-22.03-23.234-39.377-45.264-45.264-39.932-10.701-200.037-10.701-200.037-10.701s-160.105 0-200.038 10.701c-22.025 5.887-39.376 23.234-45.264 45.264C0 172.694 0 256.002 0 256.002s0 83.308 10.696 123.232c5.888 22.03 23.239 39.381 45.264 45.268 39.933 10.697 200.038 10.697 200.038 10.697s160.105 0 200.037-10.697c22.03-5.887 39.376-23.238 45.264-45.268C512 339.31 512 256.002 512 256.002s0-83.308-10.701-123.236Z"
                                            fill="#ffffff"
                                            fill-rule="nonzero"
                                            class="fill-ed1f24"></path>
                                        <path
                                            d="m204.796 332.803 133.018-76.801-133.018-76.801v153.602Z"
                                            fill="#000000"
                                            fill-rule="nonzero"
                                            class="fill-ffffff"></path>
                                    </svg>
                                </div>
                                <div class="text-sm">ezzora.official</div>
                            </div>
                        </div>
                    </div>
                    <div class="w-[31%]">
                        <div class="text-2xl mb-5">Help Desk</div>
                        <div class="text-sm mb-2">FAQ</div>
                        <div class="text-sm mb-2">Refund Policy</div>
                        <div class="text-sm mb-2">Privacy</div>
                        <div class="text-2xl mt-5 mb-5">Customer Services</div>
                        <div class="">0822-7689-2222</div>
                    </div>
                </div>
                <div class="text-2xl mb-5 text-center">Find Us</div>
            </div>
        </div> -->
    </AppLayout>
</template>
<script>
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            activeDiv: null,
            activeVideo: 1,
        }
    },
    methods: {
        toggleVideo(i) {
            this.activeVideo = i
        },
        toggleClass(i) {
            if (this.activeDiv === i) {
                this.activeDiv = null
            } else {
                // Jika tidak, aktifkan div yang diklik
                this.activeDiv = i
            }
        },
    },
}
</script>
<style>
.curved-c {
    clip-path: circle(0% at 0 50%);
}
.active {
    z-index: 20;
    transition-duration: 2s;
    clip-path: circle(110vw at 0 50%);
}
</style>
