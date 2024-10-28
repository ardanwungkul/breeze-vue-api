<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { useCartStore } from '@/stores/cart'
import {
    computed,
    nextTick,
    onBeforeMount,
    onMounted,
    ref,
    watchEffect,
} from 'vue'
import { useUsers } from '@/stores/user'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import '@/assets/css/vuetify.css'
import CryptoJS from 'crypto-js'
import { useRouter } from 'vue-router'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const router = useRouter()
const storeCart = useCartStore()
const storeUser = useUsers()
const carts = ref([])
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
const selectedAll = ref(false)
const processing = ref(false)
const totalProduct = computed(() => {
    return carts.value.filter(cart => cart.status === true).length
})
const totalPrice = computed(() => {
    return carts.value
        .filter(cart => cart.status === true)
        .reduce((total, cart) => {
            return (
                total +
                cart.quantity *
                    (cart.bundling
                        ? cart.bundling.price
                        : cart.product.product_price)
            )
        }, 0)
})

onBeforeMount(() => {
    if (storeUser.authUser) {
        if (!storeUser.hasUserData) {
            storeUser.getData()
        }
    }
})
onMounted(async () => {
    processing.value = true
    await storeCart.cartAll(storeUser.userData.id, processing)
    fetchData()
})
const fetchData = async () => {
    carts.value = storeCart.carts
    carts.value = carts.value.map(cart => {
        return {
            ...cart,
            status: false,
        }
    })
}
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const selectAll = async () => {
    carts.value = carts.value.map(cart => {
        return { ...cart, status: selectedAll.value }
    })
}
const editQuantity = async cart => {
    console.log(cart)

    processing.value = true
    await nextTick()
    const formData = new FormData()
    formData.append('carts_id', cart.id)
    formData.append('quantity', cart.quantity)
    await storeCart.changeQuantity(formData, processing)
}

const checkout = async () => {
    const secretKey = 'ezzorasecretkey'
    const originalData = carts.value
        .filter(cart => cart.status === true)
        .map(cart => cart.id)
    if (originalData.length > 0) {
        const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(originalData),
            secretKey,
        ).toString()
        router.push({
            name: 'checkout',
            params: {
                data: encryptedData,
            },
        })
    } else {
        setErrors.value = Object.values([
            'You must select at least 1 product.',
        ]).flat()
    }
}
const deleteCart = async id => {
    await storeCart.deleteCart(id, processing)
    fetchData()
}
const deleteSelectedCart = async id => {
    const originalData = carts.value
        .filter(cart => cart.status === true)
        .map(cart => cart.id)
    if (originalData.length > 0) {
        const formData = new FormData()
        originalData.forEach(crt => {
            formData.append('cart_id[]', crt)
        })
        await storeCart.deleteSelectedCart(formData, processing)
        fetchData()
    } else {
        setErrors.value = Object.values([
            'You must select at least 1 product.',
        ]).flat()
    }
}
</script>
<template>
    <AppLayout>
        <ValidationErrors class="w-full" :errors="errors" />
        <div class="p-5">
            <div class="max-w-6xl mx-auto w-full">
                <div class="flex justify-between items-center pb-3">
                    <div class="flex items-center gap-3">
                        <i
                            class="fa-solid fa-cart-shopping text-2xl font-semibold text-typography-2"></i>
                        <p class="text-2xl font-semibold text-typography-2">
                            Shopping Cart
                        </p>
                    </div>
                </div>
                <div class="rounded-lg bg-ezzora-100 shadow-lg p-5 space-y-5">
                    <div>
                        <div
                            class="grid grid-cols-6 gap-3 mb-3 bg-ezzora-50 rounded-lg py-3 px-3 shadow-lg font-semibold">
                            <div class="col-span-2 flex items-center gap-3">
                                <input
                                    v-model="selectedAll"
                                    type="checkbox"
                                    @change="selectAll"
                                    class="rounded border !border-typography-2" />
                                <p>Products</p>
                            </div>
                            <p class="text-center">Price</p>
                            <p class="text-center">Quantity</p>
                            <p class="text-center">Total Price</p>
                            <p class="text-center">Action</p>
                        </div>
                        <div class="bg-ezzora-50 rounded-lg shadow-lg !text-sm">
                            <div
                                v-for="(item, index) in carts"
                                :key="index"
                                class="px-3">
                                <div
                                    class="grid grid-cols-6 gap-3 py-3 border-b">
                                    <div class="col-span-2 flex gap-3">
                                        <input
                                            type="checkbox"
                                            v-model="item.status"
                                            class="rounded border !border-typography-2" />
                                        <div>
                                            <v-img
                                                :src="
                                                    backendUrl +
                                                    '/storage/images/product/' +
                                                    item.product.product_image
                                                "
                                                class="h-24 w-24 rounded-lg"
                                                contain>
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
                                            class="justify-between flex flex-col">
                                            <router-link
                                                :to="{
                                                    name: 'product.detail',
                                                    params: {
                                                        slug: item?.product
                                                            ?.product_slug,
                                                        id: item?.product?.id,
                                                    },
                                                }"
                                                class="line-clamp-3">
                                                {{ item.product.product_name }}
                                            </router-link>
                                            <p
                                                v-if="item.bundling"
                                                class="border rounded px-3 py-1">
                                                {{ item.bundling.name }}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        class="flex items-center justify-center">
                                        <p class="whitespace-nowrap">
                                            Rp.
                                            {{
                                                item.bundling
                                                    ? formatPrice(
                                                          item.bundling.price,
                                                      )
                                                    : formatPrice(
                                                          item.product
                                                              .product_price,
                                                      )
                                            }}
                                        </p>
                                    </div>
                                    <div
                                        class="flex items-center justify-center">
                                        <v-number-input
                                            :density="'compact'"
                                            @update:modelValue="
                                                editQuantity(item)
                                            "
                                            v-model="item.quantity"
                                            class="border rounded-lg overflow-hidden"
                                            hide-details
                                            :single-line="false"
                                            variant="solo-filled"
                                            :min="1"
                                            control-variant="split"></v-number-input>
                                    </div>
                                    <div
                                        class="flex items-center justify-center">
                                        <p class="whitespace-nowrap">
                                            Rp.
                                            {{
                                                item.bundling
                                                    ? formatPrice(
                                                          item.bundling.price *
                                                              item.quantity,
                                                      )
                                                    : formatPrice(
                                                          item.product
                                                              .product_price *
                                                              item.quantity,
                                                      )
                                            }}
                                        </p>
                                    </div>
                                    <div
                                        class="flex items-center justify-center">
                                        <ConfirmDelete
                                            :label="'Delete'"
                                            :type="'Cart'"
                                            :id="item.id"
                                            :method="deleteCart" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="sticky bottom-3 left-0 z-20 w-full flex justify-center mt-5">
                <div
                    class="max-w-6xl w-full bg-ezzora-100 rounded-lg p-5 shadow-lg flex justify-between items-center border">
                    <div class="flex gap-3">
                        <div class="flex items-center gap-2">
                            <input
                                v-model="selectedAll"
                                class="rounded border"
                                id="selectAll"
                                type="checkbox"
                                @change="selectAll" />
                            <label for="selectAll" class="cursor-pointer"
                                >Select All</label
                            >
                        </div>
                        <div class="border-l border-typography-2"></div>
                        <ConfirmDelete
                            buttonClass="!bg-transparent !text-typography-3 hover:!text-red-500"
                            :label="'Delete'"
                            id="0"
                            :type="'Selected Cart'"
                            :method="deleteSelectedCart" />
                    </div>
                    <div>
                        <svg
                            v-if="processing"
                            role="status"
                            class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                    </div>
                    <div class="flex justify-between items-center gap-3">
                        <div class="text-end">
                            <p class="text-xs">
                                Total (<span>{{ totalProduct }}</span> Products)
                            </p>
                            <p class="text-xs">
                                Rp.
                                <span class="text-lg font-semibold">
                                    {{ formatPrice(totalPrice) }}
                                </span>
                            </p>
                        </div>
                        <button
                            @click="checkout"
                            class="py-2 px-4 duration-300 flex items-center gap-2 justify-center bg-secondary-3 text-typography-1 rounded-lg hover:bg-opacity-80 text-sm">
                            <div class="w-5 h-5">
                                <i class="fa-regular fa-cart-shopping"></i>
                            </div>
                            <p>Checkout</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
