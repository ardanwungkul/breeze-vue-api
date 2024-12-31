<script setup>
import { usePaymentStore } from '@/stores/payment'
import { onMounted, ref, computed } from 'vue'
import PackingLayout from '@/layouts/PackingLayout.vue'
import '@/assets/css/vuetify.css'

const payments = ref([])
const storePayment = usePaymentStore()

onMounted(async () => {
    await storePayment.paymentAll()
    fetchPayment()
})
const fetchPayment = () => {
    payments.value = storePayment.payments.filter(payment => {
        return payment.status_proccess == 'PACKED'
    })
}

const searchData = ref('')
const pageData = ref(1)
const itemsPerPageData = ref(10)

const headersData = [
    { key: 'invoice_code', title: 'Invoice Code' },
    { key: 'user.name', title: 'Name' },
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
</script>
<template>
    <PackingLayout title="Packed Orders">
        <div class="relative">
            <div
                class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                <p class="text-lg dark:text-typography-1">Packed Orders List</p>
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
                    <template v-slot:item.action="{ item }">
                        <div class="flex items-center justify-center group">
                            <router-link
                                :to="{
                                    name: 'packing.scan',
                                    params: {
                                        invoice: item.invoice_code,
                                    },
                                }"
                                class="flex gap-2 items-center justify-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer text-sm shadow-lg w-min">
                                <i
                                    class="fa-solid fa-arrow-right-long-to-line group-hover:mr-2 transition-all duration-500"></i>
                                <p class="whitespace-nowrap text-center">
                                    Generate Receipt
                                </p>
                            </router-link>
                        </div>
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
