<script setup>
import { usePaymentStore } from '@/stores/payment'
import { onMounted, ref, computed, watchEffect } from 'vue'
import PackingLayout from '@/layouts/PackingLayout.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'
import '@/assets/css/vuetify.css'

const payments = ref([])
const storePayment = usePaymentStore()
const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const setSuccess = ref([])
const success = computed(() => setSuccess.value)

onMounted(async () => {
    await storePayment.paymentAll()
    fetchPayment()
})
const fetchPayment = () => {
    payments.value = storePayment.payments.filter(payment => {
        return payment.status_proccess == 'CONFIRMED'
    })
}

const searchData = ref('')
const pageData = ref(1)
const itemsPerPageData = ref(10)

const headersData = [
    { key: 'invoice_code', title: 'Invoice Code' },
    { key: 'name', title: 'Name', align: 'center' },
    { key: 'courier', title: 'Courier', align: 'center' },
    { key: 'item', title: 'Items', align: 'center' },
    { key: 'status', title: 'Status', align: 'center' },
    { key: 'action', title: 'Action', align: 'center' },
]
const pageCount = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPageData.value)
})

const filteredData = computed(() => {
    return payments.value.filter(payment => {
        return payment.invoice_code.toLowerCase().includes(searchData.value)
    })
})
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
}
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const generateReceipt = async id => {
    await storePayment.createOrder(id, processing, setErrors, setSuccess)
}
const downloadWaybill = async invoice => {
    await storePayment.downloadWaybill(invoice)
}
watchEffect(() => {
    fetchPayment()
})
</script>
<template>
    <PackingLayout title="Confirmed Orders">
        <ValidationErrors class="w-full" :errors="errors" />
        <SuccessMessage class="w-full" :messages="success" />
        <div class="relative">
            <div
                class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                <p class="text-lg dark:text-typography-1">
                    Confirmed Orders List
                </p>
                <v-data-table
                    v-model:page="pageData"
                    :search="searchData"
                    :headers="headersData"
                    :items="payments"
                    hide-default-footer
                    :header-props="{
                        class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                    }"
                    item-key="id"
                    class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                    <template v-slot:item.name="{ item }">
                        <div class="flex flex-col gap-1 text-center">
                            <p>{{ item.address.name }}</p>
                            <p class="text-xs text-gray-400">
                                {{ item.address.phone_number }}
                            </p>
                        </div>
                    </template>
                    <template v-slot:item.courier="{ item }">
                        <div class="flex flex-col gap-1 text-center">
                            <p>
                                {{ item.courier_name }} -
                                {{ item.courier_service_name }}
                            </p>
                            <a
                                :href="item.link_tracking"
                                target="_blank"
                                class="text-blue-500 hover:underline"
                                >{{ item.waybill }}</a
                            >
                        </div>
                    </template>
                    <template v-slot:item.item="{ item }">
                        <div class="flex items-center justify-center group">
                            <v-menu open-on-hover :location="'bottom'">
                                <template v-slot:activator="{ props }">
                                    <p
                                        v-bind="props"
                                        class="rounded px-3 py-1 cursor-pointer">
                                        {{
                                            item.items.filter(it => {
                                                return it.product_id !== null
                                            }).length
                                        }}
                                        Items
                                    </p>
                                </template>

                                <div class="py-1">
                                    <div
                                        class="bg-light-primary-1 border p-3 rounded-lg max-w-xl shadow-lg">
                                        <div class="divide-y">
                                            <div
                                                class="border rounded-lg overflow-hidden">
                                                <table class="w-full text-sm">
                                                    <thead
                                                        class="border-b bg-gray-100">
                                                        <tr>
                                                            <td
                                                                class="px-2 py-1">
                                                                Name
                                                            </td>
                                                            <td
                                                                class="px-2 py-1 text-center">
                                                                Quantity
                                                            </td>
                                                            <td
                                                                class="px-2 py-1 text-center">
                                                                Price
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr
                                                            v-for="(
                                                                p, i
                                                            ) in item.items.filter(
                                                                it => {
                                                                    return (
                                                                        it.product_id !==
                                                                        null
                                                                    )
                                                                },
                                                            )"
                                                            :key="i">
                                                            <td
                                                                class="px-2 py-1 line-clamp-2">
                                                                {{ p.name }}
                                                            </td>
                                                            <td
                                                                class="px-2 py-1 text-center">
                                                                {{ p.quantity }}
                                                            </td>
                                                            <td
                                                                class="px-2 py-1 text-center">
                                                                {{ p.price }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-menu>
                        </div>
                    </template>
                    <template v-slot:item.status="{ item }">
                        <div class="flex items-center justify-center group">
                            {{ item.status_proccess }}
                        </div>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <button
                            @click="downloadWaybill(item.invoice_code)"
                            class="flex gap-2 items-center justify-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer text-sm shadow-lg w-min">
                            <i class="fa-solid fa-download"></i>
                            <p class="whitespace-nowrap text-center">
                                Download Waybill
                            </p>
                        </button>
                    </template>
                </v-data-table>
                <v-pagination
                    v-model="pageData"
                    :length="pageCount"
                    class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                    :total-visible="5">
                </v-pagination>
            </div>
        </div>
    </PackingLayout>
</template>
