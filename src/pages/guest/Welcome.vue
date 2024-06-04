<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { Tabs } from 'flowbite'
import 'swiper/css'

onMounted(() => {
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
const activeTab = ref('first')
</script>
<template>
    <AppLayout>
        <!-- Title -->
        <div class="w-full relative h-[calc(100vh-57px)]">
            <img
                src="@/assets/images/cosmetic.jpeg"
                class="absolute top-[-57px] left-0 w-full h-screen object-cover z-10"
                alt="" />
            <div
                class="w-full h-screen flex items-center z-20 absolute top-[-57px]">
                <div class="mx-auto w-full max-w-[1120px] relative">
                    <div class="flex flex-col w-1/2">
                        <div
                            class="text-[40px] font-extralight leading-[1.2] mb-9">
                            Natural Cosmetics for gentle skincare
                        </div>
                        <div>
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

        <div class="max-w-[1120px] mx-auto">
            <!-- Best Seller -->
            <div class="w-full py-9 grid grid-cols-3 gap-5">
                <div>
                    <div class="text-[28px] font-extralight mb-4">
                        BestSellers
                    </div>
                    <div class="text-base mb-10 font-normal">
                        A Wide range of face wash body care cosmetics that will
                        not Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Odit molestiae repudiandae voluptate.
                    </div>
                    <RouterLink
                        to="#"
                        class="py-[6px] px-3 border text-base duration-300 border-gray-300 hover:border-transparent">
                        Shop All
                    </RouterLink>
                </div>
                <div class="col-span-2">
                    <swiper
                        :modules="swiperModules"
                        :loop="true"
                        :autoplay="{
                            delay: 3000,
                        }"
                        :slides-per-view="3"
                        :space-between="10"
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
                                    class="flex justify-between items-center w-full">
                                    <p class="font-medium">
                                        Night Cream {{ n }}
                                    </p>
                                    <p class="text-xs">Rp. 200.000</p>
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

            <!-- Flash Sale -->
            <div class="mb-4 border-gray-200 dark:border-gray-700">
                <ul
                    class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
                    id="tabs-flash-sale"
                    role="tablist">
                    <li class="mr-6" role="presentation">
                        <button
                            class="uppercase text-xl"
                            id="new-product-tab"
                            type="button"
                            role="tab"
                            aria-controls="new-product"
                            aria-selected="false">
                            New Products
                        </button>
                    </li>
                    <li class="mr-6" role="presentation">
                        <button
                            class="uppercase text-xl"
                            id="on-sale-tab"
                            type="button"
                            role="tab"
                            aria-controls="on-sale"
                            aria-selected="false">
                            On Sale
                        </button>
                    </li>
                    <li class="mr-6" role="presentation">
                        <button
                            class="uppercase text-xl"
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
            <div id="tabFlashSale">
                <div
                    class="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                    id="new-product"
                    role="tabpanel"
                    aria-labelledby="new-product-tab">
                    <swiper
                        :modules="swiperModules"
                        :loop="true"
                        :slides-per-view="4"
                        :space-between="10"
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
                                    class="flex justify-between items-center w-full">
                                    <p class="font-medium">
                                        New Products {{ n }}
                                    </p>
                                    <p class="text-xs">Rp. 200.000</p>
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
                        :slides-per-view="4"
                        :space-between="10"
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
                                    class="flex justify-between items-center w-full">
                                    <p class="font-medium">On Sale {{ n }}</p>
                                    <p class="text-xs">Rp. 200.000</p>
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
                        :slides-per-view="4"
                        :space-between="10"
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
                                    class="flex justify-between items-center w-full">
                                    <p class="font-medium">
                                        Feature Products {{ n }}
                                    </p>
                                    <p class="text-xs">Rp. 200.000</p>
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
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-[#f1eee9] rounded-md"></div>
                <div class="bg-[#f1eee9] rounded-md p-2">
                    <div class="bg-white w-full p-12">
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Similique, enim. Nihil repudiandae odit totam
                            maiores blanditiis. Magni ea vel,iure perspiciatis
                            dignissimos..
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
            <p class="max-w-[50vw] text-center text-gray-600">
                Subcribe to the TheFace mailing list to receive update on mnew
                arrivals, special offers and other discount information.
            </p>
            <RouterLink
                to="#"
                class="py-[6px] px-3 border text-base duration-300 border-gray-300 hover:border-transparent">
                Subscribe
            </RouterLink>
        </div>

        <!-- Individual Care -->
        <div class="max-w-[1120px] mx-auto">
            <div class="py-10 flex">
                <div
                    class="bg-[#f1f0ec] h-[500px] w-1/2 flex-col flex justify-center py-28 px-24 relative">
                    <p class="text-[28px] font-extralight mb-3">
                        Individual care
                    </p>
                    <p class="mb-10">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Fuga, recusandae in quasi possimus eum excepturi
                        expedita autem, totam aliquam reprehenderit molestias
                        tenetur. Omnis modi ea exercitationem natus suscipit
                        vero et.
                    </p>
                    <RouterLink
                        to="#"
                        class="py-[6px] px-3 border text-base duration-300 border-gray-300 hover:border-transparent w-min whitespace-nowrap">
                        View More
                    </RouterLink>
                </div>
                <div class="top-0 h-[500px] relative flex items-center">
                    <img
                        src="@/assets/images/individualcare.jpg"
                        class="h-80 w-full object-cover z-10 -translate-x-20"
                        alt="" />
                </div>
            </div>

            <div
                class="w-full rounded-md border p-5 bg-[#f4f0ed]"
                style="box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.2)">
                <swiper
                    :modules="modules"
                    :loop="true"
                    :autoplay="{
                        delay: 3000,
                    }"
                    :slides-per-view="3"
                    :space-between="50"
                    @swiper="swiperJs">
                    <swiper-slide v-for="n in 10" :key="n">
                        <div
                            class="flex flex-col justify-center items-center text-center gap-2">
                            <img
                                src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                                alt=""
                                class="w-20 h-20 object-cover rounded-full" />
                            <p class="text-gray-600">
                                Lorem ipsum dolor sit amet, consec adipiscing
                                elit. Nam eusem scelerisque tempor, varius quam
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
    </AppLayout>
</template>
