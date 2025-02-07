<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { usePaymentStore } from '@/stores/payment'
import Loading from '@/components/Loading.vue'
import { useRoute, useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'
import '@/assets/css/vuetify.css'

const route = useRoute()
const router = useRouter()
const storePayment = usePaymentStore()
const isLoading = ref(true)
const paymentId = ref(null)
const payment = ref({})
const secretKey = 'ezzorasecretkey'
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL

onBeforeMount(async () => {
    if (route.query.data) {
        const originalData = CryptoJS.enc.Base64.parse(
            route.query.data,
        ).toString(CryptoJS.enc.Utf8)
        const encryptedData = CryptoJS.AES.encrypt(
            originalData,
            secretKey,
        ).toString()
        const urlSafeData = encryptedData
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '')
        router.replace({
            name: 'purchase.detail',
            params: {
                id: urlSafeData,
            },
        })
    } else {
        const data = route.params.id
        const decryptedData = CryptoJS.AES.decrypt(
            data.replace(/-/g, '+').replace(/_/g, '/'),
            secretKey,
        ).toString(CryptoJS.enc.Utf8)
        paymentId.value = decryptedData

        await storePayment.paymentById(paymentId.value, isLoading)
        fetchData()
    }
})

watch(
    () => route.query.data,
    async (newData, oldData) => {
        const decryptedData = CryptoJS.AES.decrypt(
            route.params.id.replace(/-/g, '+').replace(/_/g, '/'),
            secretKey,
        ).toString(CryptoJS.enc.Utf8)

        paymentId.value = decryptedData
        await storePayment.paymentById(paymentId.value, isLoading)
        fetchData()
    },
)
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
}
function formatFullDate(dateString) {
    if (dateString) {
        if (!dateString || typeof dateString !== 'string') {
            return 'Invalid Date'
        }

        const isoDateString = dateString.includes('T')
            ? dateString
            : dateString.replace(' ', 'T') + 'Z'

        const date = new Date(isoDateString)

        if (isNaN(date.getTime())) {
            return 'Invalid Date'
        }
        const year = date.getUTCFullYear()
        const month = String(date.getUTCMonth() + 1).padStart(2, '0')
        const day = String(date.getUTCDate()).padStart(2, '0')
        const hours = String(date.getUTCHours()).padStart(2, '0')
        const minutes = String(date.getUTCMinutes()).padStart(2, '0')

        return `${day}-${month}-${year} ${hours}:${minutes}`
    }
}
const fetchData = async () => {
    payment.value = storePayment.singlePayment
}
function formatPrice(price) {
    if (price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
}
</script>
<template>
    <AppLayout>
        <Loading :isLoading="isLoading" />
        <div class="px-10 py-5 text-black max-w-6xl mx-auto" v-if="!isLoading">
            <div class="bg-ezzora-100 rounded-t-lg p-5 shadow-lg">
                <div class="flex justify-end gap-3 border-b pb-3">
                    <p class="text-sm text-typography-2">
                        Invoice Code {{ payment?.invoice_code }}
                    </p>
                    <p>|</p>
                    <p class="text-sm font-medium">
                        {{
                            payment?.status_proccess
                                ? payment?.status_proccess?.replace('_', ' ')
                                : payment?.status_payment?.replace('_', ' ')
                        }}
                    </p>
                </div>
                <v-timeline
                    direction="horizontal"
                    side="start"
                    :truncate-line="'both'"
                    :dot-color="'#ffffff'"
                    :fill-dot="true"
                    line-color="#7b7b7b">
                    <v-timeline-item size="80" dot-color="#43b430">
                        <template v-slot:opposite>
                            <p class="text-sm text-center">Order Make</p>
                            <p class="text-xs text-center text-typography-2">
                                {{ formatFullDate(payment.created_at) }}
                            </p>
                        </template>
                        <template v-slot:icon class="">
                            <i
                                class="fa-regular fa-file-invoice text-light-primary-1 text-3xl"></i>
                        </template>
                    </v-timeline-item>
                    <v-timeline-item
                        size="80"
                        :dot-color="
                            payment.status_payment == 'SUCCESS'
                                ? '#43b430'
                                : '#ffffff'
                        ">
                        <template v-slot:opposite>
                            <p class="text-sm text-center">Order Paid</p>
                            <p class="text-xs text-center text-typography-2">
                                {{
                                    payment.paid_at
                                        ? formatFullDate(payment.paid_at)
                                        : '-'
                                }}
                            </p>
                        </template>
                        <template v-slot:icon class="">
                            <i
                                :class="
                                    payment.status_payment == 'SUCCESS'
                                        ? 'text-light-primary-1'
                                        : 'text-typography-2'
                                "
                                class="fa-regular fa-money-check-dollar text-3xl"></i>
                        </template>
                    </v-timeline-item>
                    <v-timeline-item
                        size="80"
                        :dot-color="
                            payment?.history?.some(
                                history => history.status == 'BEING_PACKED',
                            )
                                ? '#43b430'
                                : '#ffffff'
                        ">
                        <template v-slot:opposite>
                            <p class="text-sm text-center">
                                Order Being Packed
                            </p>
                            <p class="text-xs text-center text-typography-2">
                                {{
                                    payment?.history?.some(
                                        history =>
                                            history.status === 'BEING_PACKED',
                                    )
                                        ? formatFullDate(
                                              payment?.history?.filter(
                                                  packed =>
                                                      packed.status ===
                                                      'BEING_PACKED',
                                              )[0]?.created_at,
                                          )
                                        : ''
                                }}
                            </p>
                        </template>
                        <template v-slot:icon class="">
                            <i
                                :class="
                                    payment?.history?.some(
                                        history =>
                                            history.status == 'BEING_PACKED',
                                    )
                                        ? 'text-light-primary-1'
                                        : 'text-typography-2'
                                "
                                class="fa-regular fa-boxes-packing text-3xl"></i>
                        </template>
                    </v-timeline-item>
                    <v-timeline-item
                        size="80"
                        :dot-color="
                            payment?.history?.some(
                                history => history.status == 'ALLOCATED',
                            )
                                ? '#43b430'
                                : '#ffffff'
                        ">
                        <template v-slot:opposite>
                            <p class="text-sm text-center">Order Shipped</p>
                            <p class="text-xs text-center text-typography-2">
                                {{
                                    payment?.history?.some(
                                        history =>
                                            history.status === 'ALLOCATED',
                                    )
                                        ? formatFullDate(
                                              payment?.history?.filter(
                                                  shipped =>
                                                      shipped.status ===
                                                      'ALLOCATED',
                                              )[0]?.created_at,
                                          )
                                        : '-'
                                }}
                            </p>
                        </template>
                        <template v-slot:icon class="">
                            <i
                                :class="
                                    payment?.history?.some(
                                        history =>
                                            history.status == 'ALLOCATED',
                                    )
                                        ? 'text-light-primary-1'
                                        : 'text-typography-2'
                                "
                                class="fa-regular fa-truck text-3xl"></i>
                        </template>
                    </v-timeline-item>
                    <v-timeline-item
                        size="80"
                        :dot-color="
                            payment?.history?.some(
                                history => history.status == 'DELIVERED',
                            )
                                ? '#43b430'
                                : '#ffffff'
                        ">
                        <template v-slot:opposite>
                            <p class="text-sm text-center">Delivered</p>
                            <p class="text-xs text-center text-typography-2">
                                {{
                                    payment?.history?.some(
                                        history =>
                                            history.status === 'DELIVERED',
                                    )
                                        ? formatFullDate(
                                              payment?.history?.filter(
                                                  shipped =>
                                                      shipped.status ===
                                                      'DELIVERED',
                                              )[0]?.created_at,
                                          )
                                        : '-'
                                }}
                            </p>
                        </template>
                        <template v-slot:icon class="">
                            <i
                                :class="
                                    payment?.history?.some(
                                        history =>
                                            history.status == 'DELIVERED',
                                    )
                                        ? 'text-light-primary-1'
                                        : 'text-typography-2'
                                "
                                class="fa-regular fa-box-check text-3xl"></i>
                        </template>
                    </v-timeline-item>
                </v-timeline>
            </div>
            <div class="relative bg-light-primary-1">
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
                <div class="p-5">
                    <div class="w-full flex justify-between">
                        <p class="text-lg font-medium py-3">Shipping Address</p>
                        <div
                            class="flex flex-col text-xs text-end text-gray-500">
                            <p>
                                {{ payment?.courier_name }} -
                                {{ payment?.courier_service_name }}
                            </p>
                            <p>{{ payment?.waybill }}</p>
                        </div>
                    </div>
                    <div class="flex divide-x divide-typography-2">
                        <div class="w-full max-w-sm">
                            <p class="text-base font-medium pb-1">
                                {{ payment?.address?.name }}
                            </p>
                            <p class="text-typography-2 text-sm pb-1">
                                {{ payment?.address?.phone_number }}
                            </p>
                            <p class="text-typography-2 text-sm">
                                {{ payment?.address?.detail }},
                                {{ payment?.address?.subdistrict }},
                                {{ payment?.address?.city }},
                                {{ payment?.address?.province }},
                                {{ payment?.address?.post_code }}
                            </p>
                        </div>
                        <div>
                            <v-timeline align="start" side="end">
                                <v-timeline-item
                                    dot-color="#ffffff"
                                    size="small"
                                    v-for="(history, index) in payment?.history
                                        ?.slice()
                                        .reverse()">
                                    <div class="flex gap-5 mt-[5px]">
                                        <p class="text-xs min-w-20 flex-none">
                                            {{
                                                formatFullDate(
                                                    history.created_at,
                                                )
                                            }}
                                        </p>
                                        <div>
                                            <p
                                                class="text-xs font-medium capitalize">
                                                {{
                                                    history.status ==
                                                    'ORDER_MADE'
                                                        ? 'Order Created'
                                                        : history.status
                                                              .replace('_', ' ')
                                                              .toLowerCase()
                                                }}
                                            </p>
                                            <div class="text-gray-500 text-sm">
                                                {{ history.message }}
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-ezzora-50 shadow-lg rounded-b-lg">
                <div class="p-5">
                    <p class="text-lg font-medium pb-3">List Product</p>
                    <div>
                        <table>
                            <tbody
                                class="!divide-y divide-typography-2 divide-opacity-50 border-y border-y-typography-2 border-opacity-50">
                                <tr
                                    v-for="(
                                        items, index
                                    ) in payment?.items?.filter(it => {
                                        return it.product_id !== null
                                    })">
                                    <td class="py-2">
                                        <div class="flex gap-5 items-start">
                                            <v-img
                                                :src="
                                                    backendUrl +
                                                    '/storage/images/product/' +
                                                    items?.product
                                                        ?.product_image
                                                "
                                                class="h-28 w-28 rounded-lg"
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
                                            <div class="flex flex-col gap-1">
                                                <p class="line-clamp-2">
                                                    {{
                                                        items.product
                                                            .product_name
                                                    }}
                                                </p>
                                                <p
                                                    v-if="items.bundling"
                                                    class="text-xs text-typography-2 border w-min whitespace-nowrap px-2 py-1 rounded-lg border-typography-2">
                                                    {{ items.bundling.name }}
                                                </p>
                                                <p
                                                    class="text-xs text-typography-2">
                                                    x{{ items.quantity }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-2 whitespace-nowrap pl-10">
                                        Rp. {{ formatPrice(items.price) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        class="text-end py-2 px-5 text-sm text-typography-2">
                                        Subtotal Product
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td
                                        class="text-end py-2 px-5 text-sm text-typography-2">
                                        Subtotal Shipping
                                    </td>
                                    <td class="text-end">
                                        Rp.
                                        {{ formatPrice(payment.courier_price) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        class="text-end py-2 px-5 text-sm text-typography-2">
                                        Service Fee
                                    </td>
                                    <td class="text-end">Rp. 1.000</td>
                                </tr>
                                <tr>
                                    <td
                                        class="text-end py-2 px-5 text-sm text-typography-2">
                                        Total Orders
                                    </td>
                                    <td class="text-end">
                                        Rp. {{ formatPrice(payment.amount) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
