<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { Tabs } from 'flowbite'
import { ref, onBeforeMount } from 'vue'
import 'swiper/css'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'

const storeProduct = useProductStore()
const product = ref(null)
const router = useRouter()
onBeforeMount(async () => {
    await fetchProduct()
})
async function fetchProduct() {
    const route = useRoute()
    const slug = ref(route.params.slug)
    const productId = ref(route.params.id)
    await storeProduct.productById(slug.value, productId.value)
    console.log(storeProduct.singleProduct)
    if (
        !storeProduct.singleProduct ||
        Object.keys(storeProduct.singleProduct).length === 0
    ) {
        router.replace('/404')
    } else {
        product.value = storeProduct.singleProduct
    }
}

const productgallery = ref(1)
const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}
const swiperConfig = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}
const modules = swiperModules
</script>
<template>
    <AppLayout>
        <div class="flex flex-row w-[1120px] bg-white mx-auto">
            <div class="flex flex-col gap-2 w-[40%] h-full py-6 p-4">
                <div
                    v-for="i in 6"
                    :key="i"
                    :class="{
                        block: productgallery === i,
                        hidden: productgallery !== i,
                    }"
                    class="w-full h-96 rounded-sm">
                    <v-img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F175%2F452%2Fnon_2x%2Fwhite-cream-jar-bottle-beauty-cosmetic-blank-mockup-3d-illustration-free-png.png&f=1&nofb=1&ipt=fa54a50dcaf23d1ca8ded9f4daed07a9259ee9373c9933b46731843ffd37b128&ipo=images"
                        aspect-ratio="1">
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
                <div class="w-full h-20">
                    <swiper
                        :modules="swiperModules"
                        :breakpoints="{
                            '640': {
                                slidesPerView: 5,
                                spaceBetween: 2,
                            },
                            '768': {
                                slidesPerView: 5,
                                spaceBetween: 2,
                            },
                            '1024': {
                                slidesPerView: 5,
                                spaceBetween: 2,
                            },
                        }"
                        @swiper="swiperJs"
                        :navigation="swiperConfig.navigation">
                        <swiper-slide v-for="n in 6" :key="n">
                            <button
                                @click="productgallery = n"
                                :class="{
                                    ' border-red-600': productgallery === n,
                                    ' border-transparent': productgallery != n,
                                }"
                                class="w-full h-full border hover:border-red-600 rounded-sm duration-300">
                                <v-img
                                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F175%2F452%2Fnon_2x%2Fwhite-cream-jar-bottle-beauty-cosmetic-blank-mockup-3d-illustration-free-png.png&f=1&nofb=1&ipt=fa54a50dcaf23d1ca8ded9f4daed07a9259ee9373c9933b46731843ffd37b128&ipo=images"
                                    aspect-ratio="1">
                                    <template v-slot:placeholder>
                                        <div
                                            class="w-full h-full flex justify-center items-center">
                                            <v-progress-circular
                                                color=""
                                                indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </button>
                        </swiper-slide>
                        <div
                            class="swiper-button-prev bg-black/25 py-3 px-1 flex justify-center items-center cursor-pointer absolute top-1/2 -translate-y-1/2 left-0 z-20">
                            <i class="fa-solid fa-chevron-left text-white"></i>
                        </div>
                        <div
                            class="swiper-button-next bg-black/25 py-3 px-1 flex justify-center items-center cursor-pointer absolute top-1/2 -translate-y-1/2 right-0 z-20">
                            <i class="fa-solid fa-chevron-right text-white"></i>
                        </div>
                    </swiper>
                </div>
            </div>
            <div class="w-[60%] h-full py-6 p-4 gap-2 flex flex-col">
                <p class="text-xl font-medium">
                    {{ product ? product.product_name : '' }}
                </p>
                <div class="flex flex-row items-center gap-2">
                    <p
                        class="text-xs underline underline-offset-4 text-gray-500">
                        5.0
                    </p>
                    <div class="flex flex-row gap-0.5">
                        <i
                            v-for="n in 5"
                            :key="n"
                            class="fa-solid fa-star text-yellow-300 text-xs"></i>
                    </div>
                </div>
                <div
                    class="flex justify-between w-full py-1 px-5 bg-red-600 text-white items-center">
                    <p class="tracking-wider text-lg font-medium">
                        <span class="font-semibold">Flash</span>Sale
                    </p>
                    <div class="flex flex-row gap-2">
                        <p>ENDS IN</p>
                        <div class="flex flex-row gap-1 font-medium">
                            <p class="bg-black px-1">00</p>
                            <p class="bg-black px-1">00</p>
                            <p class="bg-black px-1">00</p>
                        </div>
                    </div>
                </div>
                <div
                    class="flex w-full bg-[#f4f4f4] flex-row gap-3 py-3 -mt-2 px-5">
                    <p class="line-through text-gray-500">Rp.200.000</p>
                    <p class="text-2xl font-medium">Rp.50.000</p>
                </div>
                <div class="flex flex-col w-full py-7 px-5 gap-6 text-[13px]">
                    <!-- Voucher -->
                    <div class="flex flex-row w-full">
                        <div class="w-1/5 min-w-[20%] flex items-center">
                            <p class="text-gray-600">Shop Vouchers</p>
                        </div>
                        <div class="w-auto"></div>
                    </div>
                    <!-- Return -->
                    <div class="flex flex-row w-full">
                        <div class="w-1/5 min-w-[20%] flex items-center">
                            <p class="text-gray-600">Return</p>
                        </div>
                        <div class="w-auto">Free Returns</div>
                    </div>
                    <!-- Protection -->
                    <div class="flex flex-row w-full">
                        <div class="w-1/5 min-w-[20%] flex items-center">
                            <p class="text-gray-600">Protection</p>
                        </div>
                        <div class="w-auto flex flex-row gap-4">
                            <p class="w-1/5 flex flex-wrap items-center">
                                Product Assurance Protection
                            </p>
                            <p
                                class="w-5/5 flex flex-wrap text-blue-600 items-center">
                                Protecting you against inconvinience arising
                                from the usage/consumption of the product
                            </p>
                        </div>
                    </div>
                    <!-- Quantity -->
                    <div class="flex flex-row w-full">
                        <div class="w-1/5 min-w-[20%] flex items-center">
                            <p class="text-gray-600">Quantity</p>
                        </div>
                        <div class="w-auto flex flex-row gap-2">
                            <input
                                class="h-7 w-16 text-sm focus:ring-transparent border-gray-300 focus:border-gray-300"
                                type="number"
                                name=""
                                min="0"
                                id="" />
                            <p class="text-gray-600 flex items-center">
                                tersisa 458 buah
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row text-[13px] px-5 gap-2">
                    <button
                        class="py-3 px-4 flex flex-row gap-2 rounded-sm bg-red-100 border border-red-600 text-red-600 hover:bg-red-50 duration-300">
                        <div class="w-5 h-5">
                            <svg
                                viewBox="0 0 256 256"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect fill="none" height="100%" width="100%" />
                                <path
                                    d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
                                    fill="none"
                                    stroke="red"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16" />
                                <circle
                                    cx="80"
                                    cy="204"
                                    fill="none"
                                    r="20"
                                    stroke="red"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16" />
                                <circle
                                    cx="184"
                                    cy="204"
                                    fill="none"
                                    r="20"
                                    stroke="red"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16" />
                                <path
                                    d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
                                    fill="none"
                                    stroke="red"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16" />
                            </svg>
                        </div>
                        <p>Add to Cart</p>
                    </button>
                    <button
                        class="py-3 px-4 rounded-sm bg-red-600 text-white hover:bg-red-500 duration-300">
                        <p>Buy Now</p>
                    </button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
