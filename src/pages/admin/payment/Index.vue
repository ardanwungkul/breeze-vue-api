<script setup>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import { usePaymentStore } from '@/stores/payment'

const store = usePaymentStore()

const payments = ref([])
onMounted(async () => {
    await store.paymentAll()
    await fetchData()
})
async function fetchData() {
    payments.value = store.payments
}

const deleteData = async id => {
    await storeUser.deletePayment(id, processing)
}

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)

const searchData = ref('')
const pageData = ref(1)
const itemsPerPageData = ref(10)

const headersData = [
    { key: 'invoice_code', title: 'Invoice' },
    { key: 'user.name', title: 'Name' },
    { key: 'created_at', title: 'Billing Date' },
    { key: 'status_payment', title: 'Status Payment', align: 'center' },
    { key: 'status_proccess', title: 'Status Proccess', align: 'center' },
    { key: 'amount', title: 'Amount' },
    { key: 'id', title: 'Action', align: 'center' },
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
    <AdminLayout title="List Payment">
        <div class="w-full">
            <div class="relative">
                <ValidationErrors class="w-full" :errors="errors" />
                <div
                    class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                    <div class="flex justify-end items-center">
                        <input
                            type="text"
                            v-model="searchData"
                            class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                            placeholder="Search Payment" />
                    </div>
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
                        <template v-slot:item.user.name="{ item }">
                            <p class="capitalize">{{ item.user.name }}</p>
                        </template>
                        <template v-slot:item.id="{ item }">
                            <div
                                class="flex gap-3 items-center justify-center text-xs">
                                <ConfirmDelete
                                    :label="'Delete'"
                                    :type="'User'"
                                    :id="item.id"
                                    :method="deleteUser"></ConfirmDelete>
                            </div>
                        </template>
                        <template v-slot:item.status_payment="{ item }">
                            <div class="flex justify-center">
                                <div
                                    class="rounded-full text-center text-xs py-1 px-3 items-center inline-flex text-typography-1 font-medium"
                                    :class="
                                        item.status_payment == 'SUCCESS'
                                            ? 'bg-gradient-to-r from-secondary-3 to-secondary-3/60'
                                            : item.status_payment == 'PENDING'
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-800'
                                            : item.status_payment == 'EXPIRED'
                                            ? 'bg-secondary-1'
                                            : ''
                                    ">
                                    {{ item.status_payment }}
                                </div>
                            </div>
                        </template>
                        <template v-slot:item.status_proccess="{ item }">
                            <div class="flex justify-center">
                                <div
                                    class="rounded-full text-center text-xs py-1 px-3 items-center inline-flex text-typography-1 font-medium"
                                    :class="
                                        item.status_proccess == 'DONE'
                                            ? 'bg-gradient-to-r from-secondary-3 to-secondary-3/60'
                                            : item.status_payment == 'PENDING'
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-800'
                                            : item.status_proccess ==
                                              'BEING_PACKED'
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-500/60'
                                            : ''
                                    ">
                                    {{ item.status_proccess }}
                                </div>
                            </div>
                        </template>
                        <template v-slot:item.created_at="{ item }">
                            <div class="">
                                {{ formatDate(item.created_at) }}
                            </div>
                        </template>
                        <template v-slot:item.amount="{ item }">
                            <div class="">
                                Rp. {{ formatPrice(item.amount) }}
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
        </div>
    </AdminLayout>
</template>
