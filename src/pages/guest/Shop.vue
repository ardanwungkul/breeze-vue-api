<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import skincare6 from '@/assets/images/skincare6.png'

import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'

import MainBanner from '@/pages/guest/shop/MainBanner.vue'
import SecondaryBanner from '@/pages/guest/shop/SecondaryBanner.vue'
import SideBanner from '@/pages/guest/shop/SideBanner.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import FilterCategories from '@/pages/guest/shop/FilterCategories.vue'

const reseller = ref([
    {
        index: 1,
        shop: 'Beauty Shop',
    },
    {
        index: 2,
        shop: 'toko b',
    },
    {
        index: 3,
        shop: 'toko c',
    },
    {
        index: 4,
        shop: 'toko d',
    },
])

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
        <MainBanner />
        <!-- Banner -->
        <div class="w-full py-8 px-4 md:px-8 lg:px-0 md:py-16">
            <div
                class="flex flex-col mx-auto w-full max-w-[100vw] md:max-w-[1320px] relative">
                <SecondaryBanner />
                <div class="justify-center max-w-[60%] md:max-w-[25%] px-4">
                    <div
                        class="flex justify-center mb-2 text-2xl font-semibold text-red-600">
                        FLASH SALE
                    </div>
                    <div
                        class="flex justify-center mb-2 text-xl font-light text-gray-500 flex-row gap-10">
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
                class="flex flex-col justify-center mx-auto w-full max-w-[1140px] px-4 md:px-16 relative">
                <swiper
                    class="max-w-full mb-2"
                    :breakpoints="{
                        '640': {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        '768': {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        '1024': {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }"
                    :loop="true"
                    :modules="swiperModules"
                    @swiper="swiperJs">
                    <swiper-slide v-for="i in 5" :key="i">
                        <div
                            style="background-color: rgb(237, 241, 255)"
                            class="w-full flex flex-row py-4">
                            <div
                                class="w-1/3 text-center flex flex-col justify-center items-center ml-9">
                                <div
                                    class="flex justify-center items-center mb-2">
                                    New Product Upto 50% off
                                </div>
                                <div
                                    class="flex overflow-hidden text-sm rounded-full w-full bg-gray-400 relative">
                                    <div
                                        style="width: 30%"
                                        class="bg-semupink absolute h-10 top-0 left-0"></div>
                                    <div
                                        class="text-white w-full text-center py-1 relative">
                                        300 Terjual
                                    </div>
                                </div>
                            </div>
                            <div
                                class="w-1/2 max-h-32 py-2 flex justify-center">
                                <v-img
                                    :src="skincare6"
                                    aspect-ratio="1"
                                    class="min-w-full min-h-full">
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
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- Search Item -->
        <div class="w-full px-0 md:px-8 lg:px-0 pb-16">
            <div
                class="flex flex-col justify-center mx-auto w-full max-w-[1320px] relative">
                <div class="w-full flex flex-col md:flex-row gap-5 sm:gap-0">
                    <!-- filter desktop -->
                    <div class="hidden md:block w-1/4 md:pl-4 2xl:pl-0">
                        <div class="border p-4">
                            <div class="font-medium mb-2">Filter by Price</div>
                            <input
                                v-model="price"
                                id="medium-range"
                                type="range"
                                min="0"
                                max="300000"
                                value="0"
                                class="w-full h-1 bg-gray-400 border-none accent-slate-700 rounded-lg cursor-pointer" />
                            <div class="mt-2 mb-6">Rp. {{ price }}</div>
                            <div class="font-medium mb-2">Filter By Rating</div>
                            <select
                                v-model.number="rating"
                                name=""
                                id=""
                                class="border-black/20 text-sm text-gray-600 bg-transparent py-2 focus:ring-transparent w-full hover:border-black/30 mb-2">
                                <option value="1star">Select Rating</option>
                                <option value="1">1 star</option>
                                <option value="2">2 star</option>
                                <option value="3">3 star</option>
                                <option value="4">4 star</option>
                                <option value="5">5 star</option>
                            </select>
                            <div class="flex flex-row mb-10">
                                <div
                                    v-for="i in rating"
                                    :key="i"
                                    class="w-5 h-5 flex">
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
                        </div>
                        <FilterCategories />
                        <div class="w-full mt-5 md:h-[500px] lg:h-[700px]">
                            <SideBanner />
                        </div>
                    </div>
                    <!-- Product -->
                    <div class="w-full md:w-3/4 flex flex-col">
                        <div
                            class="sticky top-14 bg-[#f8f8f6] flex p-4 md:px-5 md:py-2 flex-col md:flex-row md:gap-5 justify-between md:items-center mb-5 z-30">
                            <div class="mb-2 md:mb-0 flex flex-row max-h-10">
                                <input
                                    type="text"
                                    class="text-gray-600 border bg-transparent border-gray-200 focus:ring-transparent focus:border-gray-200"
                                    placeholder="Search by name" />
                                <button
                                    class="min-w-10 border flex justify-center items-center border-gray-200">
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
                                <div class="flex w-full justify-end md:hidden">
                                    <button
                                        @click="togglefilter('yes')"
                                        class="flex w-6 h-6 justify-end md:hidden hover:scale-110 duration-200">
                                        <svg
                                            enable-background="new 0 0 32 32"
                                            id="Glyph"
                                            version="1.1"
                                            viewBox="0 0 32 32"
                                            xml:space="preserve"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <path
                                                fill="#D19C97"
                                                d="M29.815,6.168C29.484,5.448,28.783,5,27.986,5H4.014c-0.797,0-1.498,0.448-1.83,1.168  c-0.329,0.714-0.215,1.53,0.297,2.128c0,0,0.001,0.001,0.001,0.001L12,19.371V28c0,0.369,0.203,0.708,0.528,0.882  C12.676,28.961,12.838,29,13,29c0.194,0,0.387-0.057,0.555-0.168l6-4C19.833,24.646,20,24.334,20,24v-4.629l9.519-11.074  C30.031,7.698,30.145,6.882,29.815,6.168z"
                                                id="XMLID_276_" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <ul
                                class="flex flex-row flex-wrap md:flex-wrap-reverse md:justify-end">
                                <li v-for="i in reseller" :key="i.index">
                                    <button
                                        type="button"
                                        class="py-1 text-sm px-4 bg-customLightPurple focus:text-white focus:bg-semupink duration-200">
                                        {{ i.shop }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div
                            class="grid duration-300 px-4 md:px-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:mb-10">
                            <div
                                class="flex flex-col min-w-[32.2%] rounded-3xl overflow-hidden w-full shadow-lg shadow-black/20"
                                v-for="i in 8"
                                :key="i">
                                <div
                                    class="w-full flex justify-center p-5 items-center bg-brownshop h-40">
                                    <v-img
                                        :src="skincare6"
                                        aspect-ratio="1"
                                        class="min-w-full min-h-full">
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
                                            class="text-slate-500 text-xs md:text-normal flex flex-col">
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
                                            <div class="text-right lg:text-sm">
                                                Rp. 200.000
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="hidden lg:flex flex-col justify-center mx-auto w-full px-4 lg:px-5 md:max-w-[1320px] relative">
                            <div class="w-full flex flex-row gap-5">
                                <div class="w-full">
                                    <table class="w-full">
                                        <tr class="border-t">
                                            <td
                                                class="font-bold text-lg w-1/3 text-gray-500">
                                                Select Product
                                            </td>
                                            <td class="w-1/3 p-1 md:p-4">
                                                <select
                                                    class="w-full bg-transparent border border-gray-300 py-1"
                                                    name=""
                                                    id="">
                                                    <option value="">
                                                        Select Anyone/option
                                                    </option>
                                                </select>
                                            </td>
                                            <td class="w-1/3 p-1 md:p-4">
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
                                            <td class="w-1/3 p-1 md:p-4">
                                                <div
                                                    class="w-full md:w-4/6 mx-auto rounded-lg flex justify-center items-center h-40 md:h-52 bg-gray-600 overflow-hidden">
                                                    <v-img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                                        aspect-ratio="1"
                                                        class="min-h-full"
                                                        cover>
                                                        <template
                                                            v-slot:placeholder>
                                                            <div
                                                                class="w-full h-full flex justify-center items-center">
                                                                <v-progress-circular
                                                                    color=""
                                                                    indeterminate></v-progress-circular>
                                                            </div>
                                                        </template>
                                                    </v-img>
                                                </div>
                                            </td>
                                            <td class="w-1/3 p-1 md:p-4">
                                                <div
                                                    class="w-full md:w-4/6 mx-auto rounded-lg flex justify-center items-center h-40 md:h-52 bg-gray-600 overflow-hidden">
                                                    <v-img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                                                        aspect-ratio="1"
                                                        class="min-h-full"
                                                        cover>
                                                        <template
                                                            v-slot:placeholder>
                                                            <div
                                                                class="w-full h-full flex justify-center items-center">
                                                                <v-progress-circular
                                                                    color=""
                                                                    indeterminate></v-progress-circular>
                                                            </div>
                                                        </template>
                                                    </v-img>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="border-t">
                                            <td
                                                class="font-bold text-lg w-1/3 text-gray-500">
                                                Product Price
                                            </td>
                                            <td class="w-1/3 text-gray-500 p-4">
                                                N/A
                                            </td>
                                            <td class="w-1/3 text-gray-500 p-4">
                                                N/A
                                            </td>
                                        </tr>
                                        <tr class="border-t">
                                            <td
                                                class="font-bold text-lg w-1/3 text-gray-500">
                                                Product Description
                                            </td>
                                            <td class="w-1/3 text-gray-500 p-4">
                                                N/A
                                            </td>
                                            <td class="w-1/3 text-gray-500 p-4">
                                                N/A
                                            </td>
                                        </tr>
                                        <tr class="border-t">
                                            <td
                                                class="font-bold text-lg w-1/3 text-gray-500">
                                                Product Brand
                                            </td>
                                            <td class="w-1/3 text-gray-500 p-4">
                                                N/A
                                            </td>
                                            <td class="w-1/3 text-gray-500 p-4">
                                                N/A
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        :class="{
                            block: activefilter === 'yes',
                            ' hidden': activefilter !== 'yes',
                        }"
                        class="bg-black w-screen min-h-screen fixed top-0 left-0 z-30 opacity-40 duration-700"></div>
                    <div
                        :class="{
                            '': activefilter === 'yes',
                            'translate-y-full': activefilter !== 'yes',
                        }"
                        class="fixed bottom-0 left-0 border-t border-gray-500 rounded-t z-40 max-h-[70vh] p-4 md:p-0 md:hidden w-full duration-700 bg-[#f8f8f6]">
                        <div
                            class="w-full flex justify-center h-5 static top-0 mb-3">
                            <button
                                @click="togglefilter('no')"
                                class="max-w-6 max-h-6 duration-200 hover:scale-110">
                                <svg
                                    height="24px"
                                    id="Layer_1"
                                    style="enable-background: new 0 0 512 512"
                                    version="1.1"
                                    viewBox="0 0 512 512"
                                    width="24px"
                                    xml:space="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <path
                                        fill="#D19C97"
                                        d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z" />
                                </svg>
                            </button>
                        </div>
                        <div class="w-full h-[55vh] overflow-auto">
                            <div class="border p-4">
                                <div class="font-medium mb-2">
                                    Filter by Price
                                </div>
                                <input
                                    id="medium-range"
                                    type="range"
                                    min="0"
                                    max="300000"
                                    value="0"
                                    class="w-full h-1 bg-gray-400 border-none accent-slate-700 rounded-lg cursor-pointer" />
                                <div class="mt-2 mb-6">Rp.</div>
                                <div class="font-medium mb-2">
                                    Filter By Rating
                                </div>
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
                            <div class="border border-t-transparent py-4 mb-4">
                                <div class="font-medium mb-4 px-4">
                                    Categories
                                </div>
                                <!-- <div
                                    v-for="c in categories"
                                    :key="c"
                                    class="w-full">
                                    <div
                                        @click="toggleClass(c.index)"
                                        class="w-full flex flex-row px-4 py-2 justify-between border-b hover:text-darkbrownshop">
                                        <div class="">{{ c.category }}</div>
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
                                                <polyline
                                                    points="6 9 12 15 18 9" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div
                                        :class="{
                                            block: activeDiv === c.index,
                                            hidden: activeDiv !== c.index,
                                        }"
                                        class="bg-brownshop py-4">
                                        <button
                                            v-for="sb in c.subcategories"
                                            :key="sb"
                                            class="w-full py-1 px-4 text-left hover:bg-white">
                                            {{ sb.subcategory }}
                                        </button>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Select Product -->
        <div class="w-full lg:hidden px-4 md:px-8 lg:px-0 pb-16">
            <div
                class="flex flex-col justify-center mx-auto w-full px-4 md:max-w-[1320px] relative">
                <div class="w-full flex flex-row gap-5">
                    <div class="w-full">
                        <table class="w-full">
                            <tr class="border-t">
                                <td
                                    class="font-bold text-lg w-1/3 text-gray-500">
                                    Select Product
                                </td>
                                <td class="w-1/3 p-1 md:p-4">
                                    <select
                                        class="w-full bg-transparent border border-gray-300 py-1"
                                        name=""
                                        id="">
                                        <option value="">
                                            Select Anyone/option
                                        </option>
                                    </select>
                                </td>
                                <td class="w-1/3 p-1 md:p-4">
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
                                <td class="w-1/3 p-1 md:p-4">
                                    <div
                                        class="w-full md:w-4/6 mx-auto rounded-lg flex justify-center items-center h-32 md:h-52 lg:h-72 bg-gray-600 overflow-hidden">
                                        <v-img
                                            :src="'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'"
                                            aspect-ratio="1"
                                            class="min-w-full min-h-full"
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
                                </td>
                                <td class="w-1/3 p-1 md:p-4">
                                    <div
                                        class="w-full md:w-4/6 mx-auto rounded-lg flex justify-center items-center h-32 md:h-52 lg:h-72 bg-gray-600 overflow-hidden">
                                        <v-img
                                            :src="'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'"
                                            aspect-ratio="1"
                                            class="min-w-full min-h-full"
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
                class="flex flex-row items-center justify-between mx-auto p-8 md:p-16 w-full max-w-[1320px] relative">
                <div class="w-3/5 flex flex-col justify-start">
                    <div class="mb-5 text-sm md:text-base text-gray-500">
                        Hurry ip and get 25% discount
                    </div>
                    <div class="mb-3 text-lg md:text-3xl">
                        Deals of the week
                    </div>
                    <div class="text-gray-500 text-xs md:text-base mb-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dignissimos, nesciunt? Unde voluptas doloribus quia et.
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                    </div>
                    <div>
                        <button
                            class="text-sm py-1 px-2 md:text-base md:py-2 md:px-3 bg-red-600 duration-200 hover:bg-red-700 text-white">
                            Show Collection
                        </button>
                    </div>
                </div>
                <div
                    class="w-1/3 h-36 md:h-72 flex items-center justify-center">
                    <v-img
                        :src="skincare6"
                        aspect-ratio="1"
                        class="min-w-full min-h-full">
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
    </AppLayout>
</template>
<script>
export default {
    data() {
        return {
            price: 0,
            rating: 5,
            activefilter: 'no',
        }
    },
    methods: {
        togglefilter(i) {
            this.activefilter = i
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
