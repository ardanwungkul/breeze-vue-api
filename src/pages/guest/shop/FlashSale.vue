<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { ref, onMounted } from 'vue'
import { DateTime, Duration } from 'luxon'

const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}
const swiperConfig = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const backendURl = ref(import.meta.env.VITE_PUBLIC_BACKEND_URL)

const flashSales = ref([])
const flashSaleNow = ref(null)
const timeLeft = ref({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
})
const products = ref([])

const now = DateTime.now()
const props = defineProps({
    flash_sale: Object,
})

onMounted(async () => {
    flashSales.value = props.flash_sale

    const ongoingSales = props.flash_sale
        .filter(sale => {
            const saleFrom = DateTime.fromFormat(
                sale.flash_sale_from,
                'yyyy-MM-dd HH:mm:ss',
            )
            const saleUntil = DateTime.fromFormat(
                sale.flash_sale_until,
                'yyyy-MM-dd HH:mm:ss',
            )
            const isOngoing = saleFrom <= now && saleUntil >= now

            return isOngoing
        })
        .sort(
            (a, b) =>
                DateTime.fromFormat(
                    a.flash_sale_from,
                    'yyyy-MM-dd HH:mm:ss',
                ).toMillis() -
                DateTime.fromFormat(
                    b.flash_sale_from,
                    'yyyy-MM-dd HH:mm:ss',
                ).toMillis(),
        )
    flashSaleNow.value = ongoingSales.length > 0 ? ongoingSales[0] : null
    if (flashSaleNow.value) {
        const endTime = DateTime.fromFormat(
            flashSaleNow.value.flash_sale_until,
            'yyyy-MM-dd HH:mm:ss',
        )

        const updateTimeLeft = () => {
            const now = DateTime.now()
            const remaining = endTime.diff(now, [
                'days',
                'hours',
                'minutes',
                'seconds',
            ])
            timeLeft.value = {
                days: remaining.days,
                hours: remaining.hours,
                minutes: remaining.minutes,
                seconds: String(Math.floor(remaining.seconds)).padStart(2, '0'),
            }
            if (remaining <= Duration.fromObject({ seconds: 1 })) {
                clearInterval(countdownInterval)
                flashSaleNow.value = ''
            }
        }

        updateTimeLeft()
        const countdownInterval = setInterval(updateTimeLeft, 1000)
    }
    products.value = flashSaleNow.value?.flash_sale_product.filter(
        item => item.flash_sale_status == true,
    )
})
</script>
<template>
    <div class="w-full" v-if="flashSaleNow && products?.length > 0">
        <div
            class="w-full pt-4 pb-10 md:max-w-[1320px] mx-auto relative space-y-4">
            <div class="space-y-3 z-20 relative">
                <div
                    class="flex justify-start ml-4 text-2xl font-semibold text-orange-600 uppercase items-center pt-3">
                    <p>FLASH SALE {{ flashSaleNow?.flash_sale_title }}</p>
                </div>
                <div
                    class="bg-orange-600 w-min py-2 px-4 rounded-r-xl text-white shadow-lg">
                    <div class="flex gap-3">
                        <p class="whitespace-nowrap">Ends in</p>
                        <div class="flex gap-1">
                            <div
                                class="bg-dark-primary-2 w-6 text-ezzora-100 rounded flex items-center justify-center">
                                <p class="text-xs font-semibold">
                                    {{ timeLeft.days }}
                                </p>
                            </div>
                            <div
                                class="bg-dark-primary-2 w-6 text-ezzora-100 rounded flex items-center justify-center">
                                <p class="text-xs font-semibold">
                                    {{ timeLeft.hours }}
                                </p>
                            </div>
                            <div
                                class="bg-dark-primary-2 w-6 text-ezzora-100 rounded flex items-center justify-center">
                                <p class="text-xs font-semibold">
                                    {{ timeLeft.minutes }}
                                </p>
                            </div>
                            <div
                                class="bg-dark-primary-2 w-6 text-ezzora-100 rounded flex items-center justify-center">
                                <p class="text-xs font-semibold">
                                    {{ timeLeft.seconds }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full relative z-10 px-5">
                <swiper
                    class="max-w-full mb-2"
                    :breakpoints="{
                        '640': {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        '768': {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        '1024': {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }"
                    :loop="false"
                    :modules="swiperModules"
                    @swiper="swiperJs">
                    <swiper-slide
                        v-for="(item, index) in products"
                        :key="index">
                        <div
                            v-if="item.flash_sale_status"
                            class="flex flex-col justify-center items-center bg-ezzora-100 border shadow-lg mb-10 rounded-md overflow-hidden">
                            <div class="h-[144px] w-full">
                                <v-img
                                    :src="
                                        backendURl +
                                        '/storage/images/product/' +
                                        item.product.product_image
                                    "
                                    class="min-h-full w-full object-contain lazyload">
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
                            <div class="p-4 w-full bg-light-primary-1">
                                <div class="w-full">
                                    <router-link
                                        :to="{
                                            name: 'product.detail',
                                            params: {
                                                slug: item.product.product_slug,
                                                id: item.product.id,
                                            },
                                        }">
                                        <p class="font-medium line-clamp-1">
                                            {{ item.product.product_name }}
                                        </p>
                                    </router-link>
                                </div>
                                <div class="flex items-end">
                                    <div class="w-full">
                                        <div
                                            class="flex items-center gap-2 mt-3">
                                            <p
                                                class="text-xs whitespace-nowrap text-gray-500 line-through">
                                                Rp{{
                                                    formatPrice(
                                                        item.product
                                                            .product_price,
                                                    )
                                                }}
                                            </p>
                                            <div class="bg-orange-100">
                                                <p
                                                    class="text-xs text-orange-600 px-1">
                                                    -{{
                                                        item.flash_sale_percentage
                                                    }}%
                                                </p>
                                            </div>
                                        </div>
                                        <p
                                            class="text-xl text-orange-600 font-semibold whitespace-nowrap">
                                            <span class="text-sm font-light">
                                                Rp.</span
                                            >
                                            {{
                                                formatPrice(
                                                    item.flash_sale_price,
                                                )
                                            }}
                                        </p>
                                    </div>
                                    <router-link
                                        :to="{
                                            name: 'product.detail',
                                            params: {
                                                slug: item.product.product_slug,
                                                id: item.product.id,
                                            },
                                        }">
                                        <p
                                            class="font-medium whitespace-nowrap bg-orange-600 text-white rounded-lg px-3 py-1 text-sm">
                                            Buy Now
                                        </p>
                                    </router-link>
                                </div>
                                <v-progress-linear
                                    :model-value="
                                        (item.flash_sale_sold /
                                            item.flash_sale_stock) *
                                        100
                                    "
                                    class="mt-3 rounded-lg text-xs text-orange-600 !bg-orange-100"
                                    :height="25">
                                    <template v-slot:default="{ value }">
                                        <span
                                            class="text-white"
                                            v-if="
                                                item.flash_sale_stock -
                                                    item.flash_sale_sold !==
                                                0
                                            "
                                            >{{
                                                item.flash_sale_stock -
                                                item.flash_sale_sold
                                            }}
                                            Stock Available</span
                                        >
                                        <span
                                            class="text-white"
                                            v-if="
                                                item.flash_sale_stock -
                                                    item.flash_sale_sold ==
                                                0
                                            ">
                                            Out Of Stock</span
                                        >
                                    </template>
                                </v-progress-linear>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div
                class="absolute bg-gradient-to-b from-ezzora-100 to-ezzora-50 top-0 h-40 w-full z-0 rounded"></div>
        </div>
    </div>
</template>
