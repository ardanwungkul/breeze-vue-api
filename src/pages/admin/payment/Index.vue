<script setup>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import { usePaymentStore } from '@/stores/payment'

const store = usePaymentStore()

const payments = ref([])
onMounted(async () => {
    await fetchData()
})
async function fetchData() {
    await store.paymentAll()
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
    { key: 'id', title: 'Invoice' },
    { key: 'id', title: 'Name' },
    { key: 'id', title: 'Billing Date' },
    { key: 'id', title: 'Status Payment' },
    { key: 'id', title: 'Status Proccess' },
    { key: 'id', title: 'Amount' },
    { key: 'id', title: 'Action', align: 'center' },
]
const pageCount = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPageData.value)
})

const filteredData = computed(() => {
    return payments.value.filter(payment => {
        return payment.name.toLowerCase().includes(searchData.value)
    })
})
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
