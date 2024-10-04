<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ref, onBeforeMount } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import Loading from '@/components/Loading.vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import '@/assets/css/vuetify.css'
import { computed } from 'vue'

const isLoading = ref(true)
const storeProduct = useProductStore()
const product = ref(null)
const router = useRouter()
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
const form = ref({
    quantity: 1,
})

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const total = computed(() => {
    return form.value.quantity * (product ? product.value.product_price : 0)
})

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
        <div class="px-10 py-5" v-if="product">
            <div
                class="flex flex-row bg-white mx-auto rounded-lg shadow-lg gap-3 w-full relative">
                <div
                    class="flex flex-col gap-2 h-full py-6 p-4 w-full max-w-sm flex-none sticky top-20">
                    <div
                        class="w-full rounded-sm overflow-hidden aspect-square">
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
                                class="!aspect-square w-full rounded-sm"
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
                    <div class="flex w-full flex-row gap-3">
                        <p class="text-2xl font-medium">
                            Rp.
                            {{
                                product
                                    ? formatPrice(product.product_price)
                                    : ''
                            }}
                        </p>
                    </div>
                    <fieldset
                        class="p-5 bg-ezzora-50 rounded-lg !text-sm border">
                        <legend
                            class="bg-ezzora-200 rounded-lg px-5 py-1 font-semibold border text-xs">
                            Details
                        </legend>

                        <p v-html="product.product_description"></p>
                    </fieldset>
                </div>
                <div class="w-full sticky top-20 py-6 px-4 h-full max-w-sm">
                    <div class="border rounded-lg p-3 space-y-3">
                        <p class="font-semibold">Set quantity and notes</p>
                        <div>
                            <v-number-input
                                :density="'compact'"
                                v-model="form.quantity"
                                class="border rounded-lg overflow-hidden"
                                hide-details
                                :single-line="false"
                                variant="solo-filled"
                                :min="1"
                                control-variant="split"></v-number-input>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-sm">Subtotal</p>
                            <p class="font-semibold">
                                Rp. <span>{{ formatPrice(total) }}</span>
                            </p>
                        </div>
                        <div
                            class="flex flex-row justify-between text-[13px] gap-2">
                            <button
                                class="py-2 px-4 duration-300 flex items-center gap-2 w-full justify-center bg-ezzora-100 rounded-lg hover:bg-opacity-80">
                                <div class="w-5 h-5">
                                    <i class="fa-regular fa-plus"></i>
                                </div>
                                <p>Add to Cart</p>
                            </button>
                            <RouterLink
                                :to="{
                                    name: 'checkout',
                                    params: {
                                        id: product.id,
                                        slug: useRoute().params.slug,
                                        qty: form.quantity,
                                        amount: total,
                                    },
                                }"
                                class="py-2 px-4 duration-300 flex items-center gap-2 w-full justify-center bg-secondary-3 text-typography-1 rounded-lg hover:bg-opacity-80">
                                <div class="w-5 h-5">
                                    <i class="fa-regular fa-cart-shopping"></i>
                                </div>
                                <p>Buy Now</p>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
