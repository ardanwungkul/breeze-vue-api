<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { useProductStore } from '@/stores/product'
import { ref, onMounted } from 'vue'

const storeProduct = useProductStore()
const products = ref([])
const props = defineProps({
    value: String,
})

onMounted(async () => {
    await fetchProducts()
})

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

async function fetchProducts() {
    await storeProduct.productAll()
    const allProducts = storeProduct.allProduct

    products.value = allProducts.map(product => ({
        product_name: product.product_name,
        id: product.id,
        subcategory: product.subcategory,
        product_price: product.product_price,
        product_slug: product.product_slug,
        product_type: product.product_type,
        product_image:
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/images/product/' +
            product.product_image,
        subcategory_id: product.subcategory_id,
        product_promo_price: product.product_promo_price,
    }))
    if (props.value == 'on_sale') {
        products.value = products.value.filter(product => {
            return product.product_promo_price
        })
    }
}

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
    <swiper
        v-if="products.length > 0"
        :modules="swiperModules"
        :loop="false"
        :breakpoints="{
            '0': {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            '640': {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            '768': {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            '1024': {
                slidesPerView: 6,
                spaceBetween: 10,
            },
        }"
        @swiper="swiperJs"
        :navigation="swiperConfig.navigation">
        <swiper-slide
            v-for="(item, index) in products"
            :key="index"
            class="h-auto">
            <div
                class="flex flex-col items-center bg-[#f4f0ed] rounded-lg overflow-hidden shadow-lg h-full">
                <div class="w-full">
                    <v-img
                        :src="item?.product_image"
                        class="!w-full"
                        cover
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
                <div
                    class="p-3 w-full flex flex-col gap-1 justify-between h-full">
                    <div class="flex justify-between items-center w-full gap-2">
                        <router-link
                            :to="{
                                name: 'product.detail',
                                params: {
                                    slug: item?.product_slug,
                                    id: item?.id,
                                },
                            }">
                            <p
                                class="font-normal line-clamp-2 leading-4 text-sm">
                                {{ item?.product_name }}
                            </p>
                        </router-link>
                    </div>
                    <div>
                        <div
                            v-if="item?.product_promo_price"
                            class="flex items-center justify-between gap-2">
                            <p
                                class="text-xs !leading-none pt-1 line-through text-typography-2">
                                Rp. {{ formatPrice(item?.product_promo_price) }}
                            </p>
                            <div class="flex items-center gap-1">
                                <p class="text-xs text-typography-2">
                                    -
                                    {{
                                        parseInt(
                                            ((parseInt(
                                                item?.product_promo_price,
                                            ) -
                                                parseInt(item?.product_price)) /
                                                parseInt(
                                                    item?.product_promo_price,
                                                )) *
                                                100,
                                        )
                                    }}%
                                </p>
                                <i
                                    class="fa-solid fa-tags text-xs text-typography-2"></i>
                            </div>
                        </div>
                        <p class="text-base font-semibold whitespace-nowrap">
                            Rp.
                            {{ formatPrice(item?.product_price) }}
                        </p>
                        <p class="text-xs text-start w-full text-gray-600">
                            for
                            {{
                                item?.product_type == 'day' ? 'daily' : 'night'
                            }}
                            skin
                        </p>
                    </div>
                </div>
            </div>
        </swiper-slide>
        <div class="flex justify-center gap-2 mt-5">
            <div
                class="swiper-button-prev bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                <i class="fa-solid fa-chevron-left text-[#807d7d]"></i>
            </div>
            <div
                class="swiper-button-next bg-[#f4f0ed] p-3 flex justify-center items-center cursor-pointer">
                <i class="fa-solid fa-chevron-right text-[#807d7d]"></i>
            </div>
        </div>
    </swiper>
    <div
        v-if="products.length == 0"
        class="h-[144px] flex items-center justify-center">
        <p class="capitalize text-center font-bold text-typography-2">
            No product available
        </p>
    </div>
</template>
