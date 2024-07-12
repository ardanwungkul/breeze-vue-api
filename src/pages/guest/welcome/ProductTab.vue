<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { useProductStore } from '@/stores/product'
import { ref, onMounted } from 'vue'

const storeProduct = useProductStore()
const products = ref([])
const props = defineProps({
    type: {
        type: String,
    },
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

    const newProducts = allProducts.filter(
        product => product.product_tag === props.type,
    )
    products.value = newProducts.map(product => ({
        product_name: product.product_name,
        id: product.id,
        subcategory: product.subcategory,
        product_price: product.product_price,
        product_stock: product.product_stock,
        product_tag: product.product_tag,
        product_slug: product.product_slug,
        product_image:
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/images/product/' +
            product.product_image,
        subcategory_id: product.subcategory_id,
    }))
}

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
        <swiper-slide v-for="product in products" :key="product.id">
            <div
                class="flex flex-col justify-center items-center bg-[#f4f0ed] rounded-md overflow-hidden">
                <div class="h-[144px] w-full">
                    <v-img
                        :src="product.product_image"
                        class="min-h-full w-full object-cover"
                        >
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
                <div class="p-4 w-full">
                    <div class="flex justify-between items-center w-full gap-2">
                        <router-link
                            :to="{
                                name: 'product.detail',
                                params: {
                                    slug: product.product_slug,
                                    id: product.id,
                                },
                            }">
                            <p class="font-medium line-clamp-1">
                                {{ product.product_name }}
                            </p>
                        </router-link>
                        <p class="text-xs whitespace-nowrap">
                            Rp. {{ formatPrice(product.product_price) }}
                        </p>
                    </div>
                    <p class="text-xs text-start w-full text-gray-600 mt-2">
                        for {{ product.subcategory.sub_category_name }}
                    </p>
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
</template>
