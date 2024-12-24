<script setup>
import { ref, onMounted } from 'vue'
import VanillaTilt from 'vanilla-tilt'
import { DateTime, Duration } from 'luxon'

const flashSales = ref([])
const flashSaleNow = ref(null)
const now = DateTime.now()
const timeLeft = ref({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
})
const props = defineProps({
    flash_sale: Object,
})
const products = ref([])
const backendURl = ref(import.meta.env.VITE_PUBLIC_BACKEND_URL)
const element = ref(null)
onMounted(async () => {
    flashSales.value = props.flash_sale

    const ongoingSales = props.flash_sale
        .filter(sale => {
            const saleFrom = DateTime.fromISO(sale.flash_sale_from)
            const saleUntil = DateTime.fromISO(sale.flash_sale_until)
            const isOngoing = saleFrom <= now && saleUntil >= now

            return isOngoing
        })
        .sort(
            (a, b) =>
                DateTime.fromISO(a.flash_sale_from).toMillis() -
                DateTime.fromISO(b.flash_sale_from).toMillis(),
        )
    flashSaleNow.value = ongoingSales.length > 0 ? ongoingSales[0] : null
    if (flashSaleNow.value) {
        const endTime = DateTime.fromISO(flashSaleNow.value.flash_sale_until)

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

    VanillaTilt.init(element.value, {
        reverse: true,
        max: 20,
        perspective: 300,
        easing: 'cubic-bezier(.03,.98,.52,.99)',
        scale: 1.1,
        speed: 400,
        transition: true,
        glare: false,
        reset: true,
    })
})
</script>
<template>
    <div class="md:grid md:grid-cols-2 gap-3" v-if="flashSaleNow">
        <div
            class="bg-[#f1eee9] rounded-md p-2 flex items-center justify-center">
            <div
                ref="element"
                class="object-contain w-full h-full"
                style="
                    transform-style: preserve-3d;
                    transform: perspective(1000px);
                    position: relative;
                ">
                <v-img
                    :src="
                        backendURl +
                        '/storage/images/product/3d/' +
                        products[0]?.product.id +
                        '/' +
                        products[0]?.product.product_image_3d
                    "
                    aspect-ratio="1"
                    class="min-h-full !max-w-[50%] mx-auto">
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
        <div class="bg-[#f1eee9] rounded-md p-2">
            <div class="bg-white w-full p-12 h-full">
                <p
                    class="text-center text-[28px] font-medium mb-3 line-clamp-2">
                    {{ products[0]?.product.product_name }}
                </p>
                <div class="flex justify-center gap-1 mb-1">
                    <i
                        v-for="n in 5"
                        :key="n"
                        class="fa-solid fa-star text-yellow-300 text-xs"></i>
                </div>
                <p class="text-center mb-5">
                    Rp.
                    {{ products[0]?.product.product_price }}
                </p>
                <p
                    class="text-xs mb-6 line-clamp-4"
                    v-html="products[0]?.product.product_description"></p>
                <div class="flex w-full gap-[10px] justify-center">
                    <div
                        v-for="(index, item) in timeLeft"
                        :key="index"
                        class="rounded-full border-2 border-[#f1eee9] w-[84px] h-[84px] flex items-center justify-center">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-600 text-center">
                                {{ index }}
                            </p>
                            <p class="text-xs text-gray-600 text-center">
                                {{ item }}
                            </p>
                        </div>
                    </div>
                </div>
                <router-link
                    :to="{
                        name: 'product.detail',
                        params: {
                            slug: products[0]?.product?.product_slug,
                            id: products[0]?.product?.id,
                        },
                    }"
                    class="w-full flex items-center gap-3 justify-center bg-ezzora-100 mt-5 rounded-lg py-2 px-3 shadow-lg text-sm text-typography-2 hover:!text-typography-3 hover:!bg-ezzora-50 transition-colors duration-200 font-medium">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>Buy Now</p>
                </router-link>
            </div>
        </div>
    </div>
</template>
