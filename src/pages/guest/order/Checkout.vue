<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import 'swiper/css'
import { ref, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import Loading from '@/components/Loading.vue'
import '@/assets/css/vuetify.css'
import CryptoJS from 'crypto-js'
import { useCartStore } from '@/stores/cart'
import ListUserAddress from '@/components/dialog/ListUserAddress.vue'
import { useAddressStore } from '@/stores/address'
import { useUsers } from '@/stores/user'
import { usePaymentStore } from '@/stores/payment'
import ValidationErrors from '@/components/ValidationErrors.vue'

const processing = ref(false)
const storePayment = usePaymentStore()
const storeCart = useCartStore()
const storeAddress = useAddressStore()
const storeUser = useUsers()
const route = useRoute()
const address = ref([])
const setErrors = ref([])
const errors = computed(() => setErrors.value)

const secretKey = 'ezzorasecretkey'
const encryptedData = route.params.data
const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(
    CryptoJS.enc.Utf8,
)
const ids = JSON.parse(decryptedData)
const carts = ref([])
const subTotalPrice = computed(() => {
    return carts.value.reduce((total, cart) => {
        return (
            total +
            cart.quantity *
                (cart.bundling
                    ? cart.bundling.price
                    : cart.product.product_price)
        )
    }, 0)
})
const isLoading = ref(true)
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL

onBeforeMount(async () => {
    if (storeUser.authUser) {
        if (!storeUser.hasUserData) {
            storeUser.getData()
        }
    }
    await fetchProduct()
})

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

onMounted(async () => {
    const formGetCart = new FormData()
    ids.map(id => {
        formGetCart.append('ids[]', id)
    })

    await storeCart.getDataByMultipleId(formGetCart, isLoading)
    await storeAddress.getData(storeUser.userData.id)
    fetchAddress()
    fetchProduct()
})

const fetchProduct = async () => {
    carts.value = storeCart.carts
}
const fetchAddress = async () => {
    address.value = storeAddress.address
}
const selectedAddress = computed(() => {
    return address.value.find(ad => ad.isDefault)
})

const checkout = async () => {
    if (!selectedAddress.value) {
        setErrors.value = Object.values(['Please Select Address First.']).flat()
    } else {
        const formData = new FormData()
        formData.append('user_id', storeUser.userData.id)
        carts.value.forEach(cart => {
            formData.append('carts[]', cart.id)
        })
        await storePayment.checkout(formData, processing)
    }
}
watchEffect(() => {
    fetchAddress()
    fetchProduct()
})
</script>
<template>
    <AppLayout>
        <ValidationErrors class="w-full" :errors="errors" />
        <Loading :isLoading="isLoading" />
        <div class="px-10 py-5">
            <div class="w-full max-w-[1080px] mx-auto space-y-6">
                <!-- Address -->
                <div
                    class="flex bg-white mx-auto rounded-lg shadow-lg gap-3 w-full relative overflow-hidden">
                    <div
                        class="absolute w-full h-1"
                        style="
                            background-image: repeating-linear-gradient(
                                45deg,
                                #6fa6d6,
                                #6fa6d6 33px,
                                transparent 0,
                                transparent 41px,
                                #f18d9b 0,
                                #f18d9b 74px,
                                transparent 0,
                                transparent 82px
                            );
                        "></div>
                    <div class="w-full px-6 py-6 space-y-6">
                        <div class="flex items-center justify-between">
                            <div class="flex gap-3 items-center text-lg">
                                <i class="fa-solid fa-location-dot"></i>
                                <p class="font-medium">Delivery Address</p>
                            </div>
                            <div class="text-sm flex justify-end items-start">
                                <ListUserAddress />
                            </div>
                        </div>
                        <div
                            class="w-full grid grid-cols-6"
                            v-if="selectedAddress">
                            <div
                                class="text-wrap font-semibold col-span-1 text-sm">
                                {{ selectedAddress?.name }}
                                {{ selectedAddress?.phone_number }}
                            </div>
                            <div class="col-span-4 text-sm">
                                {{ selectedAddress?.detail }},
                                {{ selectedAddress?.province?.name }},
                                {{ selectedAddress?.city?.name }},
                                {{ selectedAddress?.subdistrict?.name }},
                                {{ selectedAddress?.village?.name }},
                                {{ selectedAddress?.post_code?.post_code }},
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Product -->
                <div
                    class="flex bg-white mx-auto rounded-lg shadow-lg gap-3 w-full relative">
                    <div class="w-full px-6 py-6 divide-y-2">
                        <div class="w-full">
                            <div class="w-full grid grid-cols-3 border-b pb-6">
                                <p class="font-medium col-span-2">
                                    Ordering Product
                                </p>
                                <div
                                    class="w-full grid grid-cols-3 text-right text-sm text-neutral-400 items-center">
                                    <div class="w-full">Unit Price</div>
                                    <div class="w-full">Quantity</div>
                                    <div class="w-full">Item Subtotal</div>
                                </div>
                            </div>
                            <div class="py-3">
                                <div
                                    v-for="(cart, index) in carts"
                                    :key="index">
                                    <div
                                        class="grid w-full grid-cols-3 py-6"
                                        :class="[
                                            'stripe-item',
                                            index % 2 === 0
                                                ? 'bg-ezzora-50'
                                                : '',
                                        ]">
                                        <div
                                            class="text-sm pl-6 flex flex-row gap-4 col-span-2">
                                            <div
                                                class="min-w-10 aspect-square overflow-hidden rounded-sm">
                                                <v-img
                                                    :src="
                                                        backendUrl +
                                                        '/storage/images/product/' +
                                                        cart.product
                                                            .product_image
                                                    "
                                                    class="!aspect-square w-full rounded-sm"
                                                    cover>
                                                    <template
                                                        v-slot:placeholder>
                                                        <div
                                                            class="w-full flex justify-center items-center h-full">
                                                            <v-progress-circular
                                                                color=""
                                                                indeterminate></v-progress-circular>
                                                        </div>
                                                    </template>
                                                </v-img>
                                            </div>
                                            <div>
                                                <P class="line-clamp-1">{{
                                                    cart.product.product_name
                                                }}</P>
                                                <P></P>
                                            </div>
                                        </div>
                                        <div
                                            class="w-full grid grid-cols-3 text-right text-sm items-center">
                                            <div class="w-full">
                                                Rp.
                                                {{
                                                    cart.bundling
                                                        ? formatPrice(
                                                              cart.bundling
                                                                  .price,
                                                          )
                                                        : formatPrice(
                                                              cart.product
                                                                  .product_price,
                                                          )
                                                }}
                                            </div>
                                            <div class="w-full">
                                                {{ cart.quantity }}
                                            </div>
                                            <div class="w-full font-semibold">
                                                Rp.
                                                {{
                                                    cart.bundling
                                                        ? formatPrice(
                                                              cart.bundling
                                                                  .price *
                                                                  cart.quantity,
                                                          )
                                                        : formatPrice(
                                                              cart.product
                                                                  .product_price *
                                                                  cart.quantity,
                                                          )
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-6">
                            <p class="font-medium">Voucher</p>
                        </div>
                    </div>
                </div>
                <!-- Payment Total -->
                <div
                    class="flex bg-white mx-auto rounded-lg shadow-lg gap-3 w-full relative">
                    <div class="w-full px-6 py-6 space-y-8 divide-y-2">
                        <div class="w-full flex justify-end">
                            <div
                                class="flex flex-col gap-2 text-sm text-neutral-600">
                                <div class="grid grid-cols-2 gap-10">
                                    <p>Subtotal</p>
                                    <p class="text-right">
                                        Rp.
                                        {{ formatPrice(subTotalPrice) }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 gap-10">
                                    <p>Voucher</p>
                                    <p class="text-right">-Rp. 0</p>
                                </div>
                                <div class="grid grid-cols-2 gap-10">
                                    <p>Total</p>
                                    <p class="text-right text-2xl font-medium">
                                        Rp.
                                        {{ formatPrice(subTotalPrice) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex justify-end pt-6">
                            <button
                                @click="checkout()"
                                class="bg-secondary-3 text-white py-2 px-4 rounded-md flex flex-row gap-2 duration-300 hover:opacity-80 text-sm">
                                <div class="w-5 h-5">
                                    <i class="fa-regular fa-cart-shopping"></i>
                                </div>
                                <p>Checkout</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
