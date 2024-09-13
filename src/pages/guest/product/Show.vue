<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import Loading from '@/components/Loading.vue'

const isLoading = ref(true)
const storeProduct = useProductStore()
const product = ref(null)
const router = useRouter()
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

onBeforeMount(async () => {
    await fetchProduct()
})
const mainImage = ref()
const mainImageDefault = ref()

async function fetchProduct() {
    const route = useRoute()
    const slug = ref(route.params.slug)
    const productId = ref(route.params.id)
    await storeProduct.productBySlugId(slug.value, productId.value)
    if (
        !storeProduct.singleProduct ||
        Object.keys(storeProduct.singleProduct).length === 0
    ) {
        router.replace('/404')
    } else {
        product.value = storeProduct.singleProduct
        mainImage.value =
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/images/product/' +
            product.value.product_image
        mainImageDefault.value = mainImage.value
        isLoading.value = storeProduct.loading
    }
}

const swiperJs = swiper => {}
</script>
<template>
    <AppLayout>
        <Loading :isLoading="isLoading" />
        <div class="px-10 mt-5" v-if="product">
            <div
                class="flex flex-row bg-white mx-auto rounded-lg shadow-lg gap-5 w-full">
                <div
                    class="flex flex-col gap-2 h-full py-6 p-4 w-[35%] flex-none">
                    <div class="w-full rounded-sm aspect-square">
                        <v-img
                            :src="mainImage"
                            class="mx-auto"
                            aspect-ratio="1/1"
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
                    <swiper
                        :space-between="8"
                        :slides-per-view="5"
                        class="h-20 w-full"
                        @swiper="swiperJs">
                        <swiper-slide
                            class="cursor-pointer flex items-center justify-center">
                            <v-img
                                @click="mainImage = mainImageDefault"
                                :src="mainImageDefault"
                                class="!aspect-square w-full"
                                cover>
                                <template v-slot:placeholder>
                                    <div
                                        class="w-full flex justify-center items-center h-full">
                                        <v-progress-circular
                                            color=""
                                            indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                        </swiper-slide>
                        <swiper-slide
                            v-for="(item, index) in product?.gallery"
                            :key="index"
                            class="cursor-pointer flex items-center justify-center">
                            <v-img
                                @click="
                                    mainImage =
                                        backendUrl +
                                        '/storage/images/product/gallery/' +
                                        product?.id +
                                        '/' +
                                        item.product_image
                                "
                                :src="
                                    backendUrl +
                                    '/storage/images/product/gallery/' +
                                    product?.id +
                                    '/' +
                                    item.product_image
                                "
                                class="!aspect-square w-full"
                                cover>
                                <template v-slot:placeholder>
                                    <div
                                        class="w-full flex justify-center items-center h-full">
                                        <v-progress-circular
                                            color=""
                                            indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="h-full py-6 p-4 gap-2 flex flex-col w-full">
                    <p class="text-xl font-medium">
                        {{ product ? product.product_name : '' }}
                    </p>
                    <div class="flex items-center gap-2">
                        <div
                            class="flex gap-1 border-r border-gray-300 pr-3 py-1">
                            <i
                                v-for="n in 5"
                                :key="n"
                                class="fa-solid fa-star text-yellow-300 text-xs"></i>
                        </div>
                        <div
                            class="flex gap-1 border-r border-gray-300 pr-3 py-1">
                            <p class="text-gray-500 text-xs">
                                <span class="text-sm text-black">0</span>
                                Terjual
                            </p>
                        </div>
                    </div>
                    <div class="flex w-full flex-row gap-3 py-3">
                        <p class="text-2xl font-medium">
                            Rp.
                            {{
                                product
                                    ? formatPrice(product.product_price)
                                    : ''
                            }}
                        </p>
                    </div>
                    <div class="flex flex-row text-[13px] gap-2">
                        <button
                            class="py-3 px-4 duration-300 flex items-center gap-2 w-full justify-center bg-ezzora-100 rounded-lg">
                            <div class="w-5 h-5">
                                <i class="fa-regular fa-cart-shopping"></i>
                            </div>
                            <p>Add to Cart</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
