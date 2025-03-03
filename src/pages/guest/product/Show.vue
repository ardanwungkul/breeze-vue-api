<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ref, onBeforeMount, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import Loading from '@/components/Loading.vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import '@/assets/css/vuetify.css'
import { useCartStore } from '@/stores/cart'
import { useUsers } from '@/stores/user'
import ValidationErrors from '@/components/ValidationErrors.vue'

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const variant = ref(null)
const isLoading = ref(true)
const storeProduct = useProductStore()
const storeCart = useCartStore()
const storeUser = useUsers()
const product = ref(null)
const router = useRouter()
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
const processing = ref(false)
const defaultPrice = ref()
const form = ref({
    quantity: 1,
})
const productStock = computed(() => {
    if (variant.value !== null && variant.value) {
        let minValue = Infinity

        variant.value.item.forEach(v => {
            const values = v.product.stock.filter(p => {
                return p.product_stock_status == 'warehouse'
            }).length
            console.log(values)

            if (values < minValue) {
                minValue = values
            }
        })
        minValue = minValue === Infinity ? 0 : minValue
        return minValue
    } else {
        return product.value.stock.filter(p => {
            return p.product_stock_status == 'warehouse'
        }).length
    }
})
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const total = computed(() => {
    return (
        form.value.quantity *
        (variant.value
            ? variant.value.price
            : product
            ? product.value.product_price
            : 0)
    )
})

onBeforeMount(async () => {
    if (storeUser.authUser) {
        if (!storeUser.hasUserData) {
            storeUser.getData()
        }
    }
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
        defaultPrice.value = product.value.product_price
        isLoading.value = storeProduct.loading
    }
}

const addToCart = async () => {
    const formData = new FormData()
    formData.append('quantity', form.value.quantity)
    formData.append('user_id', storeUser.userData.id)
    formData.append('product_id', product.value.id)
    if (variant.value && variant.value !== null) {
        formData.append('bundling_id', variant.value.id)
    }

    await storeCart.addCart(formData, setErrors, isLoading)
}
const buyNow = async () => {
    const formData = new FormData()
    formData.append('quantity', form.value.quantity)
    formData.append('user_id', storeUser.userData.id)
    formData.append('product_id', product.value.id)
    if (variant.value && variant.value !== null) {
        formData.append('bundling_id', variant.value.id)
    }

    await storeCart.buyNow(formData, setErrors, isLoading)
}
const addPreOrder = async () => {
    const formData = new FormData()
    formData.append('quantity', form.value.quantity)
    formData.append('user_id', storeUser.userData.id)
    formData.append('product_id', product.value.id)
    formData.append('is_pre_order', true)
    if (variant.value && variant.value !== null) {
        formData.append('bundling_id', variant.value.id)
    }

    await storeCart.addCart(formData, setErrors, isLoading)
}

const swiperJs = swiper => {}
</script>
<template>
    <AppLayout>
        <Loading :isLoading="isLoading" />
        <ValidationErrors class="w-full" :errors="errors" />
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
                                @click="
                                    ;(mainImage = mainImageDefault),
                                        (variant = null)
                                "
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
                        <swiper-slide
                            v-for="(bundling, index) in product?.bundling"
                            :key="index"
                            v-if="
                                product?.bundling?.length > 0 && bundling?.image
                            "
                            class="cursor-pointer flex items-center justify-center">
                            <v-img
                                @click="
                                    ;(variant = bundling),
                                        (mainImage =
                                            backendUrl +
                                            '/storage/images/product/bundling/' +
                                            product?.id +
                                            '/' +
                                            bundling?.image)
                                "
                                :src="
                                    backendUrl +
                                    '/storage/images/product/bundling/' +
                                    product?.id +
                                    '/' +
                                    bundling?.image
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
                    <div
                        class="flex flex-col w-full border-b !border-typography-2 !border-opacity-20 pb-2">
                        <p class="text-2xl font-medium">
                            Rp.
                            {{
                                variant
                                    ? formatPrice(variant.price)
                                    : formatPrice(product.product_price)
                            }}
                        </p>
                        <p
                            v-if="product.product_promo_price && !variant"
                            class="line-through text-sm text-typography-2">
                            Rp. {{ formatPrice(product.product_promo_price) }}
                        </p>
                    </div>

                    <div v-if="product?.bundling?.length > 0">
                        <p class="text-sm font-medium">
                            Select Bundlings Item:
                            <span class="text-typography-2">
                                {{ variant ? variant.name : 'None' }}
                            </span>
                        </p>
                        <div class="flex flex-wrap gap-2 text-xs py-3">
                            <div>
                                <input
                                    class="hidden peer"
                                    type="radio"
                                    id="defaultPrice"
                                    :value="null"
                                    v-model="variant"
                                    name="selectedVariant" />
                                <label
                                    class="border rounded-lg px-3 py-1 peer-checked:border-secondary-3 peer-checked:text-secondary-3 cursor-pointer"
                                    for="defaultPrice">
                                    None
                                </label>
                            </div>

                            <div
                                v-for="(item, index) in product.bundling"
                                :key="index">
                                <input
                                    class="hidden peer"
                                    :id="'variant-' + item.id"
                                    type="radio"
                                    name="selectedVariant"
                                    :value="item"
                                    v-model="variant" />
                                <v-menu open-on-hover :location="'bottom'">
                                    <template v-slot:activator="{ props }">
                                        <label
                                            v-bind="props"
                                            class="border rounded-lg px-3 py-1 peer-checked:border-secondary-3 peer-checked:text-secondary-3 cursor-pointer"
                                            :for="'variant-' + item.id">
                                            {{ item.name }}
                                        </label>
                                    </template>

                                    <div class="py-1">
                                        <div
                                            class="bg-light-primary-1 border p-3 rounded-lg max-w-xl shadow-lg">
                                            <div class="divide-y">
                                                <div
                                                    v-for="(p, i) in item.item"
                                                    :key="i">
                                                    <router-link
                                                        :to="{
                                                            name: 'product.detail',
                                                            params: {
                                                                slug: p.product
                                                                    ?.product_slug,
                                                                id: p?.product
                                                                    ?.id,
                                                            },
                                                        }"
                                                        target="_blank"
                                                        class="py-2 flex items-center gap-2 bg-light-primary-1 hover:bg-light-primary-2">
                                                        <div
                                                            class="w-10 flex-none">
                                                            <img
                                                                class="aspect-square !w-full rounded-lg object-cover"
                                                                :src="
                                                                    backendUrl +
                                                                    '/storage/images/product/' +
                                                                    p.product
                                                                        .product_image
                                                                "
                                                                alt="" />
                                                        </div>
                                                        <p
                                                            class="line-clamp-1 text-sm">
                                                            {{
                                                                p.product
                                                                    .product_name
                                                            }}
                                                        </p>
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </v-menu>
                            </div>
                        </div>
                    </div>
                    <fieldset
                        class="p-5 bg-ezzora-50 rounded-lg !text-sm border">
                        <legend
                            class="bg-ezzora-100 rounded-lg px-5 py-1 font-semibold border text-xs">
                            Details
                        </legend>

                        <p v-html="product.product_description"></p>
                    </fieldset>
                </div>
                <div class="w-full sticky top-20 py-6 px-4 h-full max-w-xs">
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
                                :min="productStock > 0 ? 1 : 0"
                                control-variant="split"></v-number-input>
                        </div>
                        <div>
                            <p class="text-typography-2 text-xs text-center">
                                Available
                                <span
                                    class="text-base font-medium text-typography-3"
                                    >{{ productStock }}</span
                                >
                                Stock
                            </p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-sm">Subtotal</p>
                            <p class="font-semibold">
                                Rp. <span>{{ formatPrice(total) }}</span>
                            </p>
                        </div>
                        <div
                            class="flex flex-col justify-between text-[13px] gap-2">
                            <form @submit.prevent="addToCart()" class="w-full">
                                <button
                                    :class="form.quantity > productStock ? 'opacity-60 cursor-not-allowed' : 'hover:bg-opacity-80'"
                                    :disabled="form.quantity > productStock"
                                    class="py-2 px-4 duration-300 flex items-center gap-2 w-full justify-center bg-ezzora-100 rounded-lg ">
                                    <div class="w-5 h-5">
                                        <i class="fa-regular fa-plus"></i>
                                    </div>
                                    <p>Add to Cart</p>
                                </button>
                            </form>
                            <form class="w-full" @submit.prevent="buyNow()">
                                <button
                                    :class="form.quantity > productStock ? 'opacity-60 cursor-not-allowed' : 'hover:bg-opacity-80'"
                                    :disabled="form.quantity > productStock"
                                    class="py-2 px-4 duration-300 flex items-center gap-2 w-full justify-center bg-secondary-3 text-typography-1 rounded-lg">
                                    <div class="w-5 h-5">
                                        <i
                                            class="fa-regular fa-cart-shopping"></i>
                                    </div>
                                    <p>Buy Now</p>
                                </button>
                            </form>
                            <form @submit.prevent="addPreOrder()" class="w-full">
                                <button
                                    class="py-2 px-4 duration-300 flex items-center gap-2 w-full justify-center bg-secondary-2 text-typography-1 rounded-lg hover:bg-opacity-80">
                                    <div class="w-5 h-5">
                                        <i class="fa-regular fa-plus"></i>
                                    </div>
                                    <p>Pre Order</p>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
