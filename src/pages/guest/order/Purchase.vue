<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { usePaymentStore } from '@/stores/payment'
import { useUsers } from '@/stores/user'
import Loading from '@/components/Loading.vue'
import CryptoJS from 'crypto-js'
import ProductList from '@/components/purchase/ProductList.vue'

const storePayment = usePaymentStore()
const storeUser = useUsers()
const isLoading = ref(true)
const tab = ref(null)
const payments = ref([])
const secretKey = 'ezzorasecretkey'
onBeforeMount(async () => {
    if (storeUser.authUser) {
        if (!storeUser.hasUserData) {
            storeUser.getData()
        }
    }
})
onMounted(async () => {
    await storePayment.purchaseUser(storeUser.userData.id, isLoading)
    fetchData()
})

const fetchData = async () => {
    payments.value = storePayment.payments.filter(P => {
        return P.is_reseller == false
    })
}

function urlSafeData(url) {
    return url.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const tabs = [
    {
        value: 'all',
        text: 'All',
    },
    {
        value: 'unpaid',
        text: 'Unpaid',
    },
    {
        value: 'packing',
        text: 'Being Packed',
    },
    {
        value: 'sent',
        text: 'Sent',
    },
    {
        value: 'done',
        text: 'Done',
    },
    {
        value: 'canceled',
        text: 'Canceled',
    },
    {
        value: 'returned',
        text: 'Returned',
    },
]
</script>
<template>
    <AppLayout>
        <Loading :isLoading="isLoading" />
        <div class="px-10 py-5 max-w-6xl mx-auto">
            <div class="min-h-[144px]">
                <v-tabs
                    v-model="tab"
                    align-tabs="start"
                    :color="'#000000'"
                    hide-slider
                    bg-color="white"
                    class="rounded-lg shadow"
                    selected-class="hover:!text-black">
                    <v-tab
                        :base-color="'#9ca3af'"
                        v-for="(item, index) in tabs"
                        :value="item.value"
                        :key="index">
                        <p
                            class="!text-lg hover:!bg-transparent hover:text-gray-600">
                            {{ item.text }}
                        </p></v-tab
                    >
                </v-tabs>

                <v-tabs-window v-model="tab">
                    <div class="py-3">
                        <v-tabs-window-item :value="'all'">
                            <div
                                class="bg-light-primary-1 rounded-lg p-5 shadow-lg">
                                <div>
                                    <ul class="space-y-5">
                                        <li
                                            v-for="(order, indexs) in payments"
                                            :key="index">
                                            <div
                                                class="border rounded-lg p-3 bg-ezzora-50 shadow-lg">
                                                <div class="flex">
                                                    <router-link
                                                        :to="{
                                                            name: 'purchase.detail',
                                                            params: {
                                                                id: CryptoJS.AES.encrypt(
                                                                    order.id.toString(),
                                                                    secretKey,
                                                                ).toString(),
                                                            },
                                                        }"
                                                        class="pb-3 w-full font-medium text-lg">
                                                        {{ order.invoice_code }}
                                                    </router-link>
                                                    <div>
                                                        <p
                                                            class="whitespace-nowrap">
                                                            {{
                                                                order.status_proccess ==
                                                                'BEING_PACKED'
                                                                    ? 'BEING PACKED'
                                                                    : order.status_proccess
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="!divide-y divide-typography-2 divide-opacity-50 border-y border-y-typography-2 border-opacity-50">
                                                    <div
                                                        v-for="(
                                                            items, i
                                                        ) in order.items.filter(
                                                            it => {
                                                                return (
                                                                    it.product_id !==
                                                                    null
                                                                )
                                                            },
                                                        )"
                                                        :key="i">
                                                        <ProductList
                                                            :data="items" />
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="text-end p-3 text-sm">
                                                            Total Orders :
                                                            <span
                                                                class="text-lg">
                                                                Rp.
                                                                {{
                                                                    formatPrice(
                                                                        order.amount,
                                                                    )
                                                                }}</span
                                                            >
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="'unpaid'">
                            <div
                                class="bg-light-primary-1 rounded-lg p-5 shadow-lg">
                                <div>
                                    <ul class="space-y-5">
                                        <li
                                            v-if="
                                                payments.filter(p => {
                                                    return (
                                                        p.status_payment ==
                                                        'PENDING'
                                                    )
                                                }).length > 0
                                            "
                                            v-for="(order, indexs) in payments"
                                            :key="index">
                                            <div
                                                class="border rounded-lg p-3 bg-ezzora-50 shadow-lg"
                                                v-if="
                                                    order.status_payment ==
                                                    'PENDING'
                                                ">
                                                <div class="flex">
                                                    <router-link
                                                        :to="{
                                                            name: 'purchase.detail',
                                                            params: {
                                                                id: CryptoJS.AES.encrypt(
                                                                    order.id.toString(),
                                                                    secretKey,
                                                                ).toString(),
                                                            },
                                                        }"
                                                        class="pb-3 w-full font-medium text-lg">
                                                        {{ order.invoice_code }}
                                                    </router-link>
                                                    <div>
                                                        <p>
                                                            {{
                                                                order.status_payment
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="!divide-y divide-typography-2 divide-opacity-50 border-y border-y-typography-2 border-opacity-50">
                                                    <div
                                                        v-for="(
                                                            items, i
                                                        ) in order.items"
                                                        :key="i">
                                                        <ProductList
                                                            :data="items" />
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="text-end p-3 text-sm">
                                                            Total Orders :
                                                            <span
                                                                class="text-lg">
                                                                Rp.
                                                                {{
                                                                    formatPrice(
                                                                        order.amount,
                                                                    )
                                                                }}</span
                                                            >
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li v-else>
                                            <p class="text-center">
                                                No transactions found.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="'packing'">
                            <div
                                class="bg-light-primary-1 rounded-lg p-5 shadow-lg">
                                <div>
                                    <ul class="space-y-5">
                                        <li
                                            v-if="
                                                payments.filter(p => {
                                                    return (
                                                        p.status_proccess ==
                                                        'BEING_PACKED'
                                                    )
                                                }).length > 0
                                            "
                                            v-for="(order, indexs) in payments"
                                            :key="index">
                                            <div
                                                class="border rounded-lg p-3 bg-ezzora-50 shadow-lg"
                                                v-if="
                                                    order.status_proccess ==
                                                    'BEING_PACKED'
                                                ">
                                                <div class="flex">
                                                    <router-link
                                                        :to="{
                                                            name: 'purchase.detail',
                                                            params: {
                                                                id: CryptoJS.AES.encrypt(
                                                                    order.id.toString(),
                                                                    secretKey,
                                                                ).toString(),
                                                            },
                                                        }"
                                                        class="pb-3 w-full font-medium text-lg">
                                                        {{ order.invoice_code }}
                                                    </router-link>
                                                    <div>
                                                        <p
                                                            class="whitespace-nowrap">
                                                            BEING PACKED
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="!divide-y divide-typography-2 divide-opacity-50 border-y border-y-typography-2 border-opacity-50">
                                                    <div
                                                        v-for="(
                                                            items, i
                                                        ) in order.items.filter(
                                                            it => {
                                                                return (
                                                                    it.product_id !==
                                                                    null
                                                                )
                                                            },
                                                        )"
                                                        :key="i">
                                                        <ProductList
                                                            :data="items" />
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="text-end p-3 text-sm">
                                                            Total Orders :
                                                            <span
                                                                class="text-lg">
                                                                Rp.
                                                                {{
                                                                    formatPrice(
                                                                        order.amount,
                                                                    )
                                                                }}</span
                                                            >
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li v-else>
                                            <p class="text-center">
                                                No transactions found.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="'sent'">
                            <div
                                class="bg-light-primary-1 rounded-lg p-5 shadow-lg">
                                <div>
                                    <ul class="space-y-5">
                                        <li
                                            v-if="
                                                payments.filter(p => {
                                                    return (
                                                        p.status_proccess ==
                                                            'CONFIRMED' ||
                                                        p.status_proccess ==
                                                            'ALLOCATED' ||
                                                        p.status_proccess ==
                                                            'PICKING_UP' ||
                                                        p.status_proccess ==
                                                            'PICKED' ||
                                                        p.status_proccess ==
                                                            'DROPPING_OFF' ||
                                                        p.status_proccess ==
                                                            'RETURN_IN_TRANSIT' ||
                                                        p.status_proccess ==
                                                            'ON_HOLD' ||
                                                        p.status_proccess ==
                                                            'COURIER_NOT_FOUND'
                                                    )
                                                }).length > 0
                                            "
                                            v-for="(order, indexs) in payments"
                                            :key="index">
                                            <div
                                                class="border rounded-lg p-3 bg-ezzora-50 shadow-lg"
                                                v-if="
                                                    order.status_proccess ==
                                                        'CONFIRMED' ||
                                                    order.status_proccess ==
                                                        'ALLOCATED' ||
                                                    order.status_proccess ==
                                                        'PICKING_UP' ||
                                                    order.status_proccess ==
                                                        'PICKED' ||
                                                    order.status_proccess ==
                                                        'DROPPING_OFF' ||
                                                    order.status_proccess ==
                                                        'RETURN_IN_TRANSIT' ||
                                                    order.status_proccess ==
                                                        'ON_HOLD' ||
                                                    order.status_proccess ==
                                                        'COURIER_NOT_FOUND'
                                                ">
                                                <div class="flex">
                                                    <router-link
                                                        :to="{
                                                            name: 'purchase.detail',
                                                            params: {
                                                                id: CryptoJS.AES.encrypt(
                                                                    order.id.toString(),
                                                                    secretKey,
                                                                ).toString(),
                                                            },
                                                        }"
                                                        class="pb-3 w-full font-medium text-lg">
                                                        {{ order.invoice_code }}
                                                    </router-link>
                                                    <div>
                                                        <p
                                                            class="whitespace-nowrap">
                                                            {{
                                                                order.status_proccess
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="!divide-y divide-typography-2 divide-opacity-50 border-y border-y-typography-2 border-opacity-50">
                                                    <div
                                                        v-for="(
                                                            items, i
                                                        ) in order.items.filter(
                                                            it => {
                                                                return (
                                                                    it.product_id !==
                                                                    null
                                                                )
                                                            },
                                                        )"
                                                        :key="i">
                                                        <ProductList
                                                            :data="items" />
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="text-end p-3 text-sm">
                                                            Total Orders :
                                                            <span
                                                                class="text-lg">
                                                                Rp.
                                                                {{
                                                                    formatPrice(
                                                                        order.amount,
                                                                    )
                                                                }}</span
                                                            >
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li v-else>
                                            <p class="text-center">
                                                No transactions found.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="'done'">
                            <div
                                class="bg-light-primary-1 rounded-lg p-5 shadow-lg">
                                <div>
                                    <ul class="space-y-5">
                                        <li
                                            v-if="
                                                payments.filter(p => {
                                                    return (
                                                        p.status_proccess ==
                                                        'DELIVERED'
                                                    )
                                                }).length > 0
                                            "
                                            v-for="(order, indexs) in payments"
                                            :key="index">
                                            <div
                                                class="border rounded-lg p-3 bg-ezzora-50 shadow-lg"
                                                v-if="
                                                    order.status_proccess ==
                                                    'DELIVERED'
                                                ">
                                                <div class="flex">
                                                    <router-link
                                                        :to="{
                                                            name: 'purchase.detail',
                                                            params: {
                                                                id: CryptoJS.AES.encrypt(
                                                                    order.id.toString(),
                                                                    secretKey,
                                                                ).toString(),
                                                            },
                                                        }"
                                                        class="pb-3 w-full font-medium text-lg">
                                                        {{ order.invoice_code }}
                                                    </router-link>
                                                    <div>
                                                        <p
                                                            class="whitespace-nowrap">
                                                            {{
                                                                order.status_proccess
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="!divide-y divide-typography-2 divide-opacity-50 border-y border-y-typography-2 border-opacity-50">
                                                    <div
                                                        v-for="(
                                                            items, i
                                                        ) in order.items.filter(
                                                            it => {
                                                                return (
                                                                    it.product_id !==
                                                                    null
                                                                )
                                                            },
                                                        )"
                                                        :key="i">
                                                        <ProductList
                                                            :data="items" />
                                                    </div>
                                                    <div>
                                                        <p
                                                            class="text-end p-3 text-sm">
                                                            Total Orders :
                                                            <span
                                                                class="text-lg">
                                                                Rp.
                                                                {{
                                                                    formatPrice(
                                                                        order.amount,
                                                                    )
                                                                }}</span
                                                            >
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li v-else>
                                            <p class="text-center">
                                                No transactions found.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </v-tabs-window-item>
                    </div>
                </v-tabs-window>
            </div>
        </div>
    </AppLayout>
</template>
