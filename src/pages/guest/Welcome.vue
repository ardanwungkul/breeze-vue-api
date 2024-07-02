<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import VanillaTilt from 'vanilla-tilt'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { Tabs } from 'flowbite'
import 'swiper/css'

const showingpacket = ref(false)
const showingform = ref(false)

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
const element = ref(null)
onMounted(() => {
    VanillaTilt.init(element.value, {
        reverse: true,
        max: 20,
        perspective: 300,
        easing: 'cubic-bezier(.03,.98,.52,.99)',
        scale: 1.1,
        speed: 400,
        transition: true,
        glare: true,
        reset: true,
    })
    const tabsElement = document.getElementById('tabs-flash-sale')
    const tabElements = [
        {
            id: 'new-product',
            triggerEl: document.querySelector('#new-product-tab'),
            targetEl: document.querySelector('#new-product'),
        },
        {
            id: 'on-sale',
            triggerEl: document.querySelector('#on-sale-tab'),
            targetEl: document.querySelector('#on-sale'),
        },
        {
            id: 'feature-product',
            triggerEl: document.querySelector('#feature-product-tab'),
            targetEl: document.querySelector('#feature-product'),
        },
    ]
    const options = {
        defaultTabId: 'new-product',
        activeClasses: 'text-black border-blue-600',
        inactiveClasses:
            'text-gray-400 hover:text-gray-600 border-gray-100 hover:border-gray-300',
    }
    const instanceOptions = {
        id: 'tabs-flash-sale',
        override: true,
    }
    new Tabs(tabsElement, tabElements, options, instanceOptions)
})
const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}
const swiperConfig = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}
const modules = swiperModules
const activeTab = ref('first')
</script>
<template>
    <AppLayout>
        <div class="pb-12">
            <!-- Packet -->
            <div
                :class="{
                    flex: showingpacket || showingform,
                    hidden: !showingpacket && !showingform,
                }"
                class="fixed justify-center items-center bg-black/50 top-0 left-0 w-screen min-h-screen z-30"></div>
            <div
                :class="{
                    'opacity-100 -translate-y-1/2': showingpacket,
                    'opacity-0 translate-y-full': !showingpacket,
                }"
                class="fixed top-1/2 left-1/2 -translate-x-1/2 w-full flex mt-7 duration-1000 flex-col max-w-[1320px] min-h-[90vh] bg-white rounded-lg pt-7 p-5 z-40">
                <div
                    class="w-full min-h-[75vh] flex flex-row shadow-md shadow-black/20 bg-white rounded-lg">
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
                        @swiper="swiperJs"
                        class="p-5">
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
                                <div class="text-xl font-medium mb-4">
                                    Rp. {{ i.harga }}
                                </div>
                                <div class="w-full justify-center mb-4">
                                    <button
                                        class="p-3 border rounded-xl font-bold duration-300 border-blue-600 focus:bg-blue-600/30 hover:bg-blue-600/30">
                                        Select Packet
                                    </button>
                                </div>
                                <div class="border-t border-b p-4">
                                    <div
                                        v-for="i in 8"
                                        :key="i"
                                        class="max-h-full overflow-auto flex flex-row justify-center gap-2 mb-4">
                                        <div class="w-3 flex items-center">
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
                                        <div class="font-semibold text-sm">
                                            plakat
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="w-full flex mt-4 justify-center flex-row gap-4">
                    <button
                        @click="showingpacket = !showingpacket"
                        class="p-2 bg-blue-600 hover:bg-blue-800 duration-300 rounded-lg text-white">
                        Cancel
                    </button>
                    <button
                        @click="
                            ;(showingpacket = !showingpacket),
                                (showingform = !showingform)
                        "
                        class="p-2 bg-blue-600 hover:bg-blue-800 duration-300 rounded-lg text-white">
                        Submit
                    </button>
                </div>
            </div>
            <div
                :class="{
                    'opacity-100 -translate-y-1/2': showingform,
                    'opacity-0 translate-y-full': !showingform,
                }"
                class="fixed top-1/2 left-1/2 -translate-x-1/2 w-full flex mt-7 duration-1000 flex-col max-w-[900px] min-h-[90vh] bg-white rounded-lg pt-12 p-10 z-40">
                <div
                    class="w-full min-h-[65vh] max-h-[65vh] flex flex-col overflow-auto bg-white rounded-lg text-base font-normal px-2">
                    <div class="text-2xl mb-4">Upgrade your plan</div>
                    <div class="text-gray-500 mb-7">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Cum alias nam error.
                    </div>
                    <div class="grid grid-cols-2 gap-8 mb-7">
                        <div class="flex flex-col">
                            <label class="text-blue-600 font-medium mb-2" for=""
                                >Name</label
                            >
                            <input
                                class="border border-gray-300 duration-300 rounded-lg"
                                type="text" />
                        </div>
                        <div class="flex flex-col">
                            <label class="text-blue-600 font-medium mb-2" for=""
                                >Address</label
                            >
                            <input
                                class="border border-gray-300 duration-300 rounded-lg"
                                type="text" />
                        </div>
                        <div class="flex flex-col">
                            <label class="text-blue-600 font-medium mb-2" for=""
                                >NIK</label
                            >
                            <input
                                class="border border-gray-300 duration-300 rounded-lg"
                                type="text" />
                        </div>
                        <div class="flex flex-col">
                            <label class="text-blue-600 font-medium mb-2" for=""
                                >Payment</label
                            >
                            <input
                                class="border border-gray-300 duration-300 rounded-lg"
                                type="text" />
                        </div>
                    </div>
                    <div class="">
                        <div class="font-medium my-5">Bank Transfer</div>
                        <div class="grid grid-cols-2 gap-8">
                            <div class="flex flex-col">
                                <label class="font-medium mb-2" for=""
                                    >Bank Name</label
                                >
                                <input
                                    class="border border-gray-300 duration-300 rounded-lg"
                                    type="text" />
                            </div>
                            <div class="flex flex-col">
                                <label class="font-medium mb-2" for=""
                                    >Account Number</label
                                >
                                <input
                                    class="border border-gray-300 duration-300 rounded-lg"
                                    type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="font-medium mb-2 col-span-2 mt-5">E-Money</div>
                    <div
                        v-for="i in 5"
                        :key="i"
                        class="border-b flex flex-row items-center">
                        <div class="w-7 h-7"></div>
                        <input
                            type="text"
                            class="border-none focus:ring-transparent"
                            placeholder="No Ovo" />
                    </div>
                    <div class="font-medium mt-10 mb-5">
                        Choose your Supplier (max 5)
                    </div>
                    <div class="w-full flex flex-row gap-5">
                        <select
                            class="rounded-lg focus:ring-0 border focus:border-gray-300 border-gray-300"
                            name=""
                            id="">
                            <option value="">Provinsi</option>
                        </select>
                        <select
                            class="rounded-lg focus:ring-0 border focus:border-gray-300 border-gray-300"
                            name=""
                            id="">
                            <option value="">Kota</option>
                        </select>
                        <div
                            class="rounded-lg flex flex-row border border-gray-300 focus:ring-4 focus:ring-blue-600/50 items-center">
                            <input
                                type="text"
                                class="rounded-lg focus:ring-transparent border-0" />
                            <div class="w-6 h-6 mr-3">
                                <svg
                                    enable-background="new 0 0 32 32"
                                    id="Glyph"
                                    version="1.1"
                                    viewBox="0 0 32 32"
                                    xml:space="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <path
                                        d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                                        id="XMLID_223_" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-8 mt-10">
                        <div
                            v-for="i in 4"
                            :key="i"
                            class="p-5 border rounded-lg">
                            <div class="font-semibold mb-2">Cantik shop</div>
                            <div class="text-sm text-gray-600">
                                Address : Jl.Apa aja
                            </div>
                            <div
                                class="text-sm text-gray-600 my-4 flex flex-row gap-1 items-center">
                                <div class="">Rating :</div>
                                <i
                                    v-for="n in 5"
                                    :key="n"
                                    class="fa-solid fa-star text-yellow-300 text-xs"></i>
                            </div>
                            <div class="w-full flex justify-center">
                                <input
                                    class="rounded border-2 w-4 h-4"
                                    type="checkbox"
                                    name=""
                                    id="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-2 px-2 flex flex-row items-center gap-2">
                    <input
                        class="rounded border-2 w-4 h-4"
                        type="checkbox"
                        name=""
                        id="" />
                    <div class="">
                        Term and Condition: Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Amet laudantium inventore
                        ex eos. Quas aliquid dolores quis laudantium impedit
                    </div>
                </div>
                <div class="flex pt-2 justify-end">
                    <button
                        @click="showingform = !showingform"
                        class="p-2 bg-blue-600 hover:bg-blue-800 duration-300 rounded-lg text-white">
                        Submit
                    </button>
                </div>
            </div>

            <!-- Title -->
            <div class="w-full relative h-[calc(100vh-57px)]">
                <img
                    src="@/assets/images/cosmetic.jpeg"
                    class="absolute top-[-57px] left-0 w-full h-screen object-cover z-10"
                    alt="" />
                <div
                    class="w-full h-screen flex items-center z-20 absolute top-[-57px]">
                    <div class="mx-auto w-full max-w-[1120px] relative">
                        <div
                            class="flex flex-col sm:w-2/3 md:w-[45%] sm:px-3 w-full">
                            <div
                                class="text-[40px] font-extralight leading-[1.2] mb-9 text-center sm:text-start">
                                Natural Cosmetics for gentle skincare
                            </div>
                            <div
                                class="flex justify-center sm:justify-start w-full">
                                <RouterLink
                                    :to="{ name: 'shop' }"
                                    class="text-base font-normal px-3 py-[6px] border duration-300 border-neutral-400 hover:border-transparent">
                                    Shop Now
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-[1120px] mx-auto px-3 sm:px-3 xl:px-0">
                <!-- Best Seller -->
                <div class="w-full py-9 md:grid md:grid-cols-3 md:gap-5">
                    <div class="mb-4 md:mb-0">
                        <div
                            class="text-[28px] font-extralight mb-4 text-center md:text-start">
                            BestSellers
                        </div>
                        <div
                            class="text-base mb-10 font-normal text-center md:text-start">
                            A Wide range of face wash body care cosmetics that
                            will not Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Odit molestiae repudiandae
                            voluptate.
                        </div>
                        <div class="flex justify-center md:justify-start">
                            <RouterLink
                                to="#"
                                class="py-[6px] px-3 border text-base duration-300 border-gray-300 hover:border-transparent">
                                Shop All
                            </RouterLink>
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <swiper
                            :modules="swiperModules"
                            :loop="true"
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
                            :autoplay="{
                                delay: 3000,
                            }"
                            @swiper="swiperJs"
                            :navigation="swiperConfig.navigation">
                            <swiper-slide v-for="n in 10" :key="n">
                                <div
                                    class="flex flex-col justify-center items-center bg-[#f4f0ed] rounded-md p-4">
                                    <img
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F175%2F452%2Fnon_2x%2Fwhite-cream-jar-bottle-beauty-cosmetic-blank-mockup-3d-illustration-free-png.png&f=1&nofb=1&ipt=fa54a50dcaf23d1ca8ded9f4daed07a9259ee9373c9933b46731843ffd37b128&ipo=images"
                                        class="h-[144px]"
                                        alt="" />
                                    <div
                                        class="flex justify-between items-center w-full gap-2">
                                        <p class="font-medium line-clamp-1">
                                            Night Cream {{ n }}
                                        </p>
                                        <p class="text-xs whitespace-nowrap">
                                            Rp. 200.000
                                        </p>
                                    </div>
                                    <p
                                        class="text-xs text-start w-full text-gray-600 mt-2">
                                        for daily skin
                                    </p>
                                </div>
                            </swiper-slide>
                            <div class="flex justify-center gap-2 mt-5">
                                <div
                                    class="swiper-button-prev bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                                    <i
                                        class="fa-solid fa-chevron-left text-[#807d7d]"></i>
                                </div>
                                <div
                                    class="swiper-button-next bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                                    <i
                                        class="fa-solid fa-chevron-right text-[#807d7d]"></i>
                                </div>
                            </div>
                        </swiper>
                    </div>
                </div>

                <!-- Flash Sale Button -->
                <div class="mb-4 border-gray-200 dark:border-gray-700">
                    <ul
                        class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 gap-3"
                        id="tabs-flash-sale"
                        role="tablist">
                        <li role="presentation">
                            <button
                                class="uppercase sm:text-xl text-sm"
                                id="new-product-tab"
                                type="button"
                                role="tab"
                                aria-controls="new-product"
                                aria-selected="false">
                                New Products
                            </button>
                        </li>
                        <li role="presentation">
                            <button
                                class="uppercase sm:text-xl text-sm"
                                id="on-sale-tab"
                                type="button"
                                role="tab"
                                aria-controls="on-sale"
                                aria-selected="false">
                                On Sale
                            </button>
                        </li>
                        <li role="presentation">
                            <button
                                class="uppercase sm:text-xl text-sm"
                                id="feature-product-tab"
                                type="button"
                                role="tab"
                                aria-controls="feature-product"
                                aria-selected="false">
                                Feature Products
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- Flash Sale -->
                <div id="tabFlashSale">
                    <div
                        class="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                        id="new-product"
                        role="tabpanel"
                        aria-labelledby="new-product-tab">
                        <swiper
                            :modules="swiperModules"
                            :loop="true"
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
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }"
                            @swiper="swiperJs"
                            :navigation="swiperConfig.navigation">
                            <swiper-slide v-for="n in 10" :key="n">
                                <div
                                    class="flex flex-col justify-center items-center bg-[#f4f0ed] rounded-md p-4">
                                    <img
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F175%2F452%2Fnon_2x%2Fwhite-cream-jar-bottle-beauty-cosmetic-blank-mockup-3d-illustration-free-png.png&f=1&nofb=1&ipt=fa54a50dcaf23d1ca8ded9f4daed07a9259ee9373c9933b46731843ffd37b128&ipo=images"
                                        class="h-[144px]"
                                        alt="" />
                                    <div
                                        class="flex justify-between items-center w-full gap-2">
                                        <p class="font-medium line-clamp-1">
                                            New Products {{ n }}
                                        </p>
                                        <p class="text-xs whitespace-nowrap">
                                            Rp. 200.000
                                        </p>
                                    </div>
                                    <p
                                        class="text-xs text-start w-full text-gray-600 mt-2">
                                        for daily skin
                                    </p>
                                </div>
                            </swiper-slide>
                            <div class="flex justify-center gap-2 mt-5">
                                <div
                                    class="swiper-button-prev bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                                    <i
                                        class="fa-solid fa-chevron-left text-[#807d7d]"></i>
                                </div>
                                <div
                                    class="swiper-button-next bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                                    <i
                                        class="fa-solid fa-chevron-right text-[#807d7d]"></i>
                                </div>
                            </div>
                        </swiper>
                    </div>
                    <div
                        class="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                        id="on-sale"
                        role="tabpanel"
                        aria-labelledby="on-sale-tab">
                        <swiper
                            :modules="swiperModules"
                            :loop="true"
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
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }"
                            @swiper="swiperJs"
                            :navigation="swiperConfig.navigation">
                            <swiper-slide v-for="n in 10" :key="n">
                                <div
                                    class="flex flex-col justify-center items-center bg-[#f4f0ed] rounded-md p-4">
                                    <img
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F175%2F452%2Fnon_2x%2Fwhite-cream-jar-bottle-beauty-cosmetic-blank-mockup-3d-illustration-free-png.png&f=1&nofb=1&ipt=fa54a50dcaf23d1ca8ded9f4daed07a9259ee9373c9933b46731843ffd37b128&ipo=images"
                                        class="h-[144px]"
                                        alt="" />
                                    <div
                                        class="flex justify-between items-center w-full gap-2">
                                        <p class="font-medium line-clamp-1">
                                            On Sale {{ n }}
                                        </p>
                                        <p class="text-xs whitespace-nowrap">
                                            Rp. 200.000
                                        </p>
                                    </div>
                                    <p
                                        class="text-xs text-start w-full text-gray-600 mt-2">
                                        for daily skin
                                    </p>
                                </div>
                            </swiper-slide>
                            <div class="flex justify-center gap-2 mt-5">
                                <div
                                    class="swiper-button-prev bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                                    <i
                                        class="fa-solid fa-chevron-left text-[#807d7d]"></i>
                                </div>
                                <div
                                    class="swiper-button-next bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                                    <i
                                        class="fa-solid fa-chevron-right text-[#807d7d]"></i>
                                </div>
                            </div>
                        </swiper>
                    </div>
                    <div
                        class="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                        id="feature-product"
                        role="tabpanel"
                        aria-labelledby="feature-product-tab">
                        <swiper
                            :modules="swiperModules"
                            :loop="true"
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
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                            }"
                            @swiper="swiperJs"
                            :navigation="swiperConfig.navigation">
                            <swiper-slide v-for="n in 10" :key="n">
                                <div
                                    class="flex flex-col justify-center items-center bg-[#f4f0ed] rounded-md p-4">
                                    <img
                                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F175%2F452%2Fnon_2x%2Fwhite-cream-jar-bottle-beauty-cosmetic-blank-mockup-3d-illustration-free-png.png&f=1&nofb=1&ipt=fa54a50dcaf23d1ca8ded9f4daed07a9259ee9373c9933b46731843ffd37b128&ipo=images"
                                        class="h-[144px]"
                                        alt="" />
                                    <div
                                        class="flex justify-between items-center w-full gap-2">
                                        <p class="font-medium line-clamp-1">
                                            Feature Products {{ n }}
                                        </p>
                                        <p class="text-xs whitespace-nowrap">
                                            Rp. 200.000
                                        </p>
                                    </div>
                                    <p
                                        class="text-xs text-start w-full text-gray-600 mt-2">
                                        for daily skin
                                    </p>
                                </div>
                            </swiper-slide>
                            <div class="flex justify-center gap-2 mt-5">
                                <div
                                    class="swiper-button-prev bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                                    <i
                                        class="fa-solid fa-chevron-left text-[#807d7d]"></i>
                                </div>
                                <div
                                    class="swiper-button-next bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                                    <i
                                        class="fa-solid fa-chevron-right text-[#807d7d]"></i>
                                </div>
                            </div>
                        </swiper>
                    </div>
                </div>

                <!-- 3D Products -->
                <div class="md:grid md:grid-cols-2 gap-3">
                    <div
                        class="bg-[#f1eee9] rounded-md p-2 max-h-[400px] flex items-center justify-center">
                        <img
                            src="@/assets/images/3d-product.png"
                            alt=""
                            ref="element"
                            class="object-contain w-full h-full"
                            style="
                                transform-style: preserve-3d;
                                transform: perspective(1000px);
                                position: relative;
                            " />
                    </div>
                    <div class="bg-[#f1eee9] rounded-md p-2 max-h-[400px]">
                        <div class="bg-white w-full p-12 h-full">
                            <p class="text-center text-[28px] font-medium mb-3">
                                AFTERSHAVE SHALON
                            </p>
                            <div class="flex justify-center gap-1 mb-1">
                                <i
                                    v-for="n in 5"
                                    :key="n"
                                    class="fa-solid fa-star text-yellow-300 text-xs"></i>
                            </div>
                            <p class="text-center mb-5">Rp.200.000</p>
                            <p class="text-xs text-center mb-6">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Similique, enim. Nihil
                                repudiandae odit totam maiores blanditiis. Magni
                                ea vel,iure perspiciatis dignissimos..
                            </p>
                            <div class="flex w-full gap-[10px] justify-center">
                                <div
                                    v-for="n in 4"
                                    :key="n"
                                    class="rounded-full border-2 border-[#f1eee9] w-[84px] h-[84px] flex items-center justify-center">
                                    <div class="flex flex-col">
                                        <p
                                            class="text-xs text-gray-600 text-center">
                                            0
                                        </p>
                                        <p
                                            class="text-xs text-gray-600 text-center">
                                            day
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Discount -->
            <div
                class="w-full bg-[#f1eee9] min-h-[47vh] mt-10 flex-col flex justify-center items-center gap-3">
                <p class="text-[28px] font-extralight">
                    GET <span class="text-gray-400">10%</span> DISCOUNT
                </p>
                <p class="sm:max-w-[50vw] text-center text-gray-600">
                    Subcribe to the TheFace mailing list to receive update on
                    mnew arrivals, special offers and other discount
                    information.
                </p>
                <RouterLink
                    to="#"
                    class="py-[6px] px-3 border text-base duration-300 border-gray-300 hover:border-transparent">
                    Subscribe
                </RouterLink>
            </div>

            <!-- Individual Care -->
            <div class="max-w-[1120px] mx-auto">
                <div class="py-10 lg:flex">
                    <div
                        class="bg-[#f1f0ec] lg:h-[500px] lg:w-1/2 flex-col flex justify-center py-28 lg:px-24 px-3 relative">
                        <p
                            class="text-[28px] font-extralight mb-3 text-center lg:text-start">
                            Individual care
                        </p>
                        <p class="mb-10 text-center lg:text-start">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Fuga, recusandae in quasi possimus eum
                            excepturi expedita autem, totam aliquam
                            reprehenderit molestias tenetur. Omnis modi ea
                            exercitationem natus suscipit vero et.
                        </p>
                        <div class="flex justify-center lg:justify-start">
                            <RouterLink
                                to="#"
                                class="py-[6px] px-3 border text-base duration-300 border-gray-300 hover:border-transparent w-min whitespace-nowrap">
                                View More
                            </RouterLink>
                        </div>
                    </div>
                    <div
                        class="top-0 h-[500px] relative lg:flex items-center hidden">
                        <img
                            src="@/assets/images/individualcare.jpg"
                            class="h-80 w-full object-cover z-10 -translate-x-20"
                            alt="" />
                    </div>
                </div>

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
                                    <p
                                        class="text-blue-700 uppercase font-bold">
                                        Jessica Milla
                                    </p>
                                </div>
                            </swiper-slide>
                        </swiper>
                        <div class="flex justify-center mt-10">
                            <button
                                @click="showingpacket = !showingpacket"
                                class="rounded-md tracking-widest uppercase font-semibold text-gray-700 transition-all duration-500 hover:bg-[#f8f8f6] hover:shadow px-10 py-2">
                                Let's Become Partners!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
