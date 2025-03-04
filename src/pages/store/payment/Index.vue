<script setup>
import { ref, onMounted, computed } from 'vue'
import StoreLayout from '@/layouts/StoreLayout.vue'
import '@/assets/css/vuetify.css'
import { usePaymentStore } from '@/stores/payment'

const store = usePaymentStore()

const payments = ref([])

onMounted(async () => {
    await store.paymentAll()
    await fetchData()
})
async function fetchData() {
    payments.value = store.payments.filter(P => {
        return P.is_reseller == false
    })
}

const deleteData = async id => {
    await storeUser.deletePayment(id, processing)
}
const filterDataInput = ref('ALL')
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
    { key: 'paid_at', title: 'Paid At' },
    { key: 'status_payment', title: 'Status Payment', align: 'center' },
    { key: 'status_proccess', title: 'Status Proccess', align: 'center' },
    { key: 'amount', title: 'Amount' },
]
const pageCount = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPageData.value)
})

const filteredData = computed(() => {
    return payments.value.filter(payment => {
        const matchesSearch = payment.invoice_code
            .toLowerCase()
            .includes(searchData.value.toLowerCase())

        const matchesFilter =
            filterDataInput.value === 'ALL' ||
            payment.status_proccess === filterDataInput.value
        return matchesSearch && matchesFilter
    })
})
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
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const year = date.getUTCFullYear()
        const month = String(months[date.getUTCMonth()])
        const day = String(date.getUTCDate()).padStart(2, '0')
        const hours = String(date.getUTCHours()).padStart(2, '0')
        const minutes = String(date.getUTCMinutes()).padStart(2, '0')

        return `${month} ${day}, ${year}, ${hours}:${minutes}`
    }
}
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>
<script>
export default {
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true,
    }),
}
</script>
<template>
    <StoreLayout title="List Payment">
        <div class="w-full">
            <div class="relative">
                <ValidationErrors class="w-full" :errors="errors" />
                <div
                    class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                    <div class="flex justify-between items-center">
                        <select
                            class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                            v-model="filterDataInput">
                            <option value="ALL">All</option>
                            <option value="BEING_PACKED">Being Packed</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="ALLOCATED">Allocated</option>
                            <option value="PICKING_UP">Picking Up</option>
                            <option value="PICKED">Picked</option>
                            <option value="DROPPING_OFF">Dropping Off</option>
                            <option value="RETURN_IN_TRANSIT">
                                Return In Transit
                            </option>
                            <option value="ON_HOLD">On Hold</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="COURIER_NOT_FOUND">
                                Courier Not Found
                            </option>
                            <option value="RETURNED">Returned</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="DISPOSED">Disposed</option>
                        </select>
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
                        :items="filteredData"
                        hide-default-footer
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }"
                        item-key="id"
                        class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                        <template v-slot:item.user.name="{ item }">
                            <p class="capitalize">{{ item.user.name }}</p>
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
                            <v-menu open-on-hover :location="'bottom'">
                                <template v-slot:activator="{ props }">
                                    <div class="flex justify-center">
                                        <div
                                            v-bind="props"
                                            class="rounded-full text-center text-xs py-1 px-3 items-center inline-flex text-typography-1 font-medium whitespace-nowrap"
                                            :class="
                                                item.status_proccess ==
                                                'DELIVERED'
                                                    ? 'bg-gradient-to-r from-secondary-3 to-secondary-3/60'
                                                    : 'bg-gradient-to-r from-blue-500 to-blue-500/60'
                                            ">
                                            {{
                                                item.status_proccess.replace(
                                                    /_/,
                                                    ' ',
                                                )
                                            }}
                                        </div>
                                    </div>
                                </template>

                                <div class="py-1">
                                    <div
                                        class="bg-light-primary-1 border p-3 rounded-lg max-w-xl shadow-lg">
                                        <div v-if="item.history.length > 0">
                                            <div class="bg-white">
                                                <v-timeline
                                                    align="start"
                                                    side="end">
                                                    <v-timeline-item
                                                        dot-color="#ffffff"
                                                        size="small"
                                                        v-for="(
                                                            history, index
                                                        ) in item?.history
                                                            ?.slice()
                                                            .reverse()">
                                                        <div
                                                            class="flex gap-5 mt-[5px]">
                                                            <p
                                                                class="text-xs min-w-20 flex-none">
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
                                                                                  .replace(
                                                                                      '_',
                                                                                      ' ',
                                                                                  )
                                                                                  .toLowerCase()
                                                                    }}
                                                                </p>
                                                                <div
                                                                    class="text-gray-500 text-xs">
                                                                    {{
                                                                        history.message
                                                                    }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </v-timeline-item>
                                                </v-timeline>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-menu>
                        </template>
                        <template v-slot:item.created_at="{ item }">
                            <div class="">
                                {{ formatFullDate(item.created_at) }}
                            </div>
                        </template>
                        <template v-slot:item.paid_at="{ item }">
                            <div class="">
                                {{ formatFullDate(item.paid_at) }}
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
    </StoreLayout>
</template>
