<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import 'swiper/css'
import {
    ref,
    onBeforeMount,
    onMounted,
    watchEffect,
    computed,
    watch,
} from 'vue'
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
import { useCouriers } from '@/stores/couriers'

const processing = ref(false)
const storePayment = usePaymentStore()
const storeCart = useCartStore()
const storeAddress = useAddressStore()
const storeCourier = useCouriers()
const storeUser = useUsers()
const route = useRoute()
const address = ref([])
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const courierDialog = ref(false)
const activeCourier = ref([])

const couriers = ref([])
const tempSelectedCouriers = ref(null)
const selectedCouriers = ref(null)

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
const totalPrice = computed(() => {
    return (
        subTotalPrice.value +
        1000 +
        (selectedCouriers.value ? selectedCouriers.value.price : 0)
    )
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
    fetchActiveCouriers()
})

const fetchActiveCouriers = async () => {
    await storeCourier.getCouriers()
    activeCourier.value = storeCourier.couriers.filter(cr => {
        return cr.courier_status == true
    })
}

const fetchProduct = async () => {
    carts.value = storeCart.carts
}
const fetchAddress = async () => {
    address.value = storeAddress.address
}
const selectedAddress = computed(() => {
    return address.value.find(ad => ad.isDefault)
})
watch(selectedAddress, (newAddress, oldAddress) => {
    if (newAddress !== oldAddress) {
        couriers.value = []
        selectedCouriers.value = null
        tempSelectedCouriers.value = null
    }
})

const checkout = async () => {
    if (!selectedAddress.value) {
        setErrors.value = Object.values(['Please Select Address First.']).flat()
    } else if (!selectedCouriers.value) {
        setErrors.value = Object.values([
            'Please Select Couriers First.',
        ]).flat()
    } else {
        const formData = new FormData()
        formData.append('user_id', storeUser.userData.id)
        formData.append('address_id', selectedAddress.value.id)
        carts.value.forEach(cart => {
            formData.append('carts[]', cart.id)
        })
        formData.append('courier_name', selectedCouriers.value.courier_name)
        formData.append('courier_code', selectedCouriers.value.courier_code)
        formData.append(
            'courier_service_name',
            selectedCouriers.value.courier_service_name,
        )
        formData.append(
            'courier_service_code',
            selectedCouriers.value.courier_service_code,
        )
        formData.append('courier_price', selectedCouriers.value.price)
        await storePayment.checkout(formData, processing)
    }
}
watchEffect(() => {
    fetchAddress()
    fetchProduct()
})

const searchCourierRates = async () => {
    if (!selectedAddress.value) {
        setErrors.value = Object.values(['Please Select Address First.']).flat()
    } else {
        if (couriers.value.length <= 0) {
            const formData = new FormData()

            formData.append('origin_area_id', '6763c83cb5d5980012374410')
            formData.append(
                'destination_area_id',
                selectedAddress.value.location_id,
            )
            formData.append('origin_latitude', -6.965101234471844)
            formData.append('origin_longitude', 107.63886094093324)
            formData.append(
                'destination_latitude',
                selectedAddress.value.latitude,
            )
            formData.append(
                'destination_longitude',
                selectedAddress.value.longitude,
            )
            formData.append('origin_postal_code', 40287)
            formData.append(
                'destination_postal_code',
                selectedAddress.value.post_code,
            )
            formData.append(
                'couriers',
                activeCourier.value
                    .map(courier => courier.courier_code)
                    .join(','),
            )
            carts.value.forEach((item, index) => {
                formData.append(
                    `items[${index}][name]`,
                    item.product.product_name,
                )
                formData.append(
                    `items[${index}][weight]`,
                    item.product.product_weight,
                )
                formData.append(`items[${index}][quantity]`, item.quantity)
                formData.append(
                    `items[${index}][value]`,
                    item.product.product_price,
                )
            })
            
            await storeAddress.getRate(formData, processing, couriers)
        }

        courierDialog.value = true
    }
}
async function onSelectCouriers() {
    if (tempSelectedCouriers.value !== null) {
        selectedCouriers.value = tempSelectedCouriers.value
        courierDialog.value = false
    } else {
        setErrors.value = Object.values([
            'Please Select Couriers First!.',
        ]).flat()
    }
}
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
                                <p>
                                    {{ selectedAddress?.name }}
                                </p>
                                <p>
                                    {{ selectedAddress?.phone_number }}
                                </p>
                            </div>
                            <div class="col-span-4 text-sm">
                                {{ selectedAddress?.detail }},
                                {{ selectedAddress?.province }},
                                {{ selectedAddress?.city }},
                                {{ selectedAddress?.subdistrict }},
                                {{ selectedAddress?.post_code }},
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
                                            <div class="rounded-sm">
                                                <v-img
                                                    :src="
                                                        backendUrl +
                                                        '/storage/images/product/' +
                                                        cart.product
                                                            .product_image
                                                    "
                                                    class="!h-24 !w-24 rounded-lg"
                                                    contain>
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
                                            <div class="space-y-1">
                                                <p class="line-clamp-3">
                                                    {{
                                                        cart.product
                                                            .product_name
                                                    }}
                                                </p>
                                                <div class=" flex flex-wrap gap-3">
                                                    <v-menu
                                                        open-on-hover
                                                        :location="'bottom'">
                                                        <template
                                                            v-slot:activator="{
                                                                props,
                                                            }">
                                                            <p
                                                                v-bind="props"
                                                                v-if="
                                                                    cart.bundling
                                                                "
                                                                class="border rounded px-3 py-1 cursor-pointer w-min whitespace-nowrap">
                                                                {{
                                                                    cart
                                                                        .bundling
                                                                        .name
                                                                }}
                                                            </p>
                                                        </template>

                                                        <div class="py-1">
                                                            <div
                                                                class="bg-light-primary-1 border p-3 rounded-lg max-w-xl shadow-lg">
                                                                <div
                                                                    class="divide-y">
                                                                    <div
                                                                        v-for="(
                                                                            p, i
                                                                        ) in cart
                                                                            .bundling
                                                                            .item"
                                                                        :key="
                                                                            i
                                                                        ">
                                                                        <router-link
                                                                            :to="{
                                                                                name: 'product.detail',
                                                                                params: {
                                                                                    slug: p
                                                                                        ?.product
                                                                                        ?.product_slug,
                                                                                    id: p
                                                                                        ?.product
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
                                                                                        p
                                                                                            .product
                                                                                            .product_image
                                                                                    "
                                                                                    alt="" />
                                                                            </div>
                                                                            <p
                                                                                class="line-clamp-1 text-sm">
                                                                                {{
                                                                                    p
                                                                                        .product
                                                                                        .product_name
                                                                                }}
                                                                            </p>
                                                                        </router-link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </v-menu>
                                                    <div v-if="cart.is_pre_order" class="border border-secondary-2 text-secondary-2 rounded px-3 py-1 cursor-pointer w-min whitespace-nowrap">
                                                        Pre-order
                                                    </div>
                                                </div>
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
                            <div class="flex justify-between">
                                <div class="flex gap-5">
                                    <p class="font-medium">Shipping options:</p>
                                    <div>
                                        <p class="font-medium text-xl">
                                            {{ selectedCouriers?.courier_name }}
                                        </p>
                                        <p class="text-sm">
                                            {{
                                                selectedCouriers?.courier_service_name
                                            }}
                                        </p>
                                        <p
                                            class="text-xs text-gray-400"
                                            v-if="selectedCouriers">
                                            Shipment Duration Range
                                            {{ selectedCouriers?.duration }}
                                        </p>
                                    </div>
                                    <div>
                                        <v-dialog
                                            v-model="courierDialog"
                                            class="max-w-3xl">
                                            <template
                                                v-slot:activator="{
                                                    props: activatorProps,
                                                }">
                                                <button
                                                    v-bind="activatorProps"
                                                    @click="
                                                        searchCourierRates()
                                                    "
                                                    type="button"
                                                    class="text-blue-500 text-sm">
                                                    Change
                                                </button>
                                            </template>

                                            <v-card
                                                class="invisible-scrollbar relative !rounded-lg">
                                                <div
                                                    class="sticky top-0 p-5 border flex justify-between items-center bg-white">
                                                    <p
                                                        class="text-lg font-medium">
                                                        Shipping Options
                                                    </p>
                                                    <button
                                                        class="w-8 border rounded-full h-8 text-gray-700 hover:text-white hover:bg-red-500 transition-colors duration-300"
                                                        @click="
                                                            courierDialog = false
                                                        ">
                                                        <i
                                                            class="fa-solid fa-x"></i>
                                                    </button>
                                                </div>
                                                <div class="p-5 space-y-5">
                                                    <div
                                                        v-if="
                                                            couriers?.length > 0
                                                        "
                                                        v-for="(
                                                            courier, index
                                                        ) in couriers"
                                                        :key="index">
                                                        <div
                                                            :class="
                                                                tempSelectedCouriers ==
                                                                courier
                                                                    ? 'bg-ezzora-100'
                                                                    : ''
                                                            "
                                                            class="border rounded-lg shadow-lg">
                                                            <input
                                                                v-model="
                                                                    tempSelectedCouriers
                                                                "
                                                                :value="courier"
                                                                type="radio"
                                                                name="selectedCouriers"
                                                                class="hidden"
                                                                :id="
                                                                    'couriers-' +
                                                                    index
                                                                " />
                                                            <label
                                                                :for="
                                                                    'couriers-' +
                                                                    index
                                                                ">
                                                                <div
                                                                    class="grid grid-cols-5 gap-3 text-xs p-3">
                                                                    <div
                                                                        class="flex items-center justify-center">
                                                                        <img
                                                                            class="w-20"
                                                                            :src="
                                                                                '/assets/images/couriers/' +
                                                                                courier.courier_code +
                                                                                '.png'
                                                                            "
                                                                            alt="Courier Image" />
                                                                    </div>
                                                                    <div
                                                                        class="flex flex-col">
                                                                        <p
                                                                            class="font-bold text-center">
                                                                            Type
                                                                            of
                                                                            Service
                                                                        </p>
                                                                        <div
                                                                            class="flex items-center justify-center h-full py-2">
                                                                            <p
                                                                                class="text-center">
                                                                                {{
                                                                                    courier.courier_name
                                                                                }}
                                                                                {{
                                                                                    courier.courier_service_name
                                                                                }}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="flex flex-col">
                                                                        <p
                                                                            class="font-bold text-center">
                                                                            Estimated
                                                                            Shipping
                                                                        </p>
                                                                        <div
                                                                            class="flex items-center justify-center h-full py-2">
                                                                            <p
                                                                                class="text-center">
                                                                                {{
                                                                                    courier.duration
                                                                                }}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="flex flex-col">
                                                                        <p
                                                                            class="font-bold text-center">
                                                                            Description
                                                                        </p>
                                                                        <div
                                                                            class="flex items-center justify-center h-full py-2">
                                                                            <p
                                                                                class="text-center">
                                                                                {{
                                                                                    courier.description
                                                                                }}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="flex flex-col">
                                                                        <p
                                                                            class="font-bold text-center">
                                                                            Price
                                                                        </p>
                                                                        <div
                                                                            class="flex items-center justify-center h-full py-2">
                                                                            <p
                                                                                class="text-center">
                                                                                Rp.
                                                                                {{
                                                                                    formatPrice(
                                                                                        courier.price,
                                                                                    )
                                                                                }}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div
                                                        v-else
                                                        class="flex items-center justify-center">
                                                        <svg
                                                            role="status"
                                                            class="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                                </div>
                                                <div
                                                    class="sticky bottom-0 left-0 bg-white p-5 border-t">
                                                    <div
                                                        class="flex justify-between">
                                                        <button
                                                            type="button"
                                                            @click="
                                                                onSelectCouriers
                                                            "
                                                            class="bg-secondary-3 text-white py-2 px-4 rounded-md flex flex-row gap-2 duration-300 hover:opacity-80 text-sm">
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </v-card>
                                        </v-dialog>
                                    </div>
                                </div>
                                <p class="font-semibold">
                                    Rp.
                                    {{
                                        selectedCouriers
                                            ? formatPrice(
                                                  selectedCouriers.price,
                                              )
                                            : 0
                                    }}
                                </p>
                            </div>
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
                                    <p>Service Fee</p>
                                    <p class="text-right">Rp. 1000</p>
                                </div>
                                <!-- <div class="grid grid-cols-2 gap-10">
                                    <p>Voucher</p>
                                    <p class="text-right">-Rp. 0</p>
                                </div> -->
                                <div class="grid grid-cols-2 gap-10">
                                    <p>Shipping Costs</p>
                                    <p class="text-right">
                                        Rp.
                                        {{
                                            selectedCouriers
                                                ? formatPrice(
                                                      selectedCouriers.price,
                                                  )
                                                : 0
                                        }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2 gap-10">
                                    <p>Total</p>
                                    <p class="text-right text-2xl font-medium">
                                        Rp.
                                        {{ formatPrice(totalPrice) }}
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
