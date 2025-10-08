<script setup>
import ReportLayout from '@/layouts/ReportLayout.vue'
import Maps from '@/components/Report/Maps.vue'
import Chart from '@/components/Report/ChartRevenueProfit.vue'
import TableUserPayment from '@/components/Report/TableUserPayment.vue'
import { onMounted, ref } from 'vue'
import ChartRevenueByCategory from '../../components/Report/ChartRevenueByCategory.vue'

import { RouterLink } from 'vue-router'
import { usePaymentStore } from '../../stores/payment'
import { useExpenseStore } from '../../stores/expense'

const paymentStore = usePaymentStore()
const expenseStore = useExpenseStore()
const payment = ref([])
const expenses = ref([])
onMounted(async () => {
    fetchData()
})

const fetchData = async () => {
    await paymentStore.paymentAll()

    payment.value = paymentStore.payments
    expenses.value = expenseStore.expenses
}

const formatCurrency = value => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}
const HeaderSalesData = [
    { key: 'name', title: 'Product Name' },
    { key: 'date', title: 'Date' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'revenue', title: 'Revenue' },
]
const BodySalesData = [
    {
        name: 'Day Cream',
        date: '2024-04-21',
        quantity: 3200,
        revenue: 360000000,
    },
    {
        name: 'Night Cream',
        date: '2024-04-22',
        quantity: 2800,
        revenue: 320000000,
    },
    { name: 'Toner', date: '2024-04-22', quantity: 4000, revenue: 500000000 },
]

const HeaderSalesDataAgent = [
    { key: 'agent_name', title: 'Agent Name' },
    { key: 'product_name', title: 'Product Name' },
    { key: 'sold', title: 'Sold' },
]
const BodySalesDataAgent = [
    { agent_name: 'Beuaty shop', product_name: 'Day Cream', sold: '2900' },
    { agent_name: 'Girly shop', product_name: 'Night Cream', sold: '1000' },
    { agent_name: 'Glow beauty shop', product_name: 'Sunscreen', sold: '3200' },
]
// end data dummy
</script>
<template>
    <ReportLayout title="Sales Report">
        <div class="space-y-4 w-full">
            <Maps :payment="payment" />
            <TableUserPayment :payment="payment" />
            <Chart :payment="payment" :expense="expenses" />

            <ChartRevenueByCategory :payment="payment"></ChartRevenueByCategory>
            <div
                class="bg-light-primary-1 p-5 space-y-4 rounded-lg dark:bg-dark-primary-2 shadow-lg">
                <div class="flex justify-between items-center">
                    <div class="text-xl dark:text-typography-1">
                        Report By Regional
                    </div>
                    <div>
                        <select
                            class="rounded-xl border text-sm dark:bg-dark-primary-1 min-w-40 dark:border-typography-2 dark:text-typography-1">
                            <option value="">All</option>
                            <option value="">Regional-1</option>
                            <option value="">Regional-2</option>
                            <option value="">Regional-3</option>
                        </select>
                    </div>
                </div>
                <hr class="border-typography-2 !mb-4" />
                <div class="grid grid-cols-3 gap-3">
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                        <div class="text-center">Total Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                        <div class="text-center">Average Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                        <div class="text-center">Maksimum Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                        <div class="text-center">Minimum Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                        <div class="text-center">Total Expense</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                        <div class="text-center">Total Profit</div>
                        <p class="text-center">0</p>
                    </div>
                </div>
                <Line :data="chartData" :options="chartOptions" />
            </div>
            <div
                class="bg-light-primary-1 p-5 space-y-4 rounded-lg dark:bg-dark-primary-2 shadow-lg">
                <div class="text-xl dark:text-typography-1">Sales Data</div>
                <hr class="border-typography-2 !mb-4" />
                <div class="flex gap-6">
                    <div class="space-y-1">
                        <p
                            class="text-base text-typography-2 dark:text-typography-1">
                            filter by: Time
                        </p>
                        <select
                            class="rounded-xl text-sm border dark:bg-dark-primary-1 min-w-40 dark:text-typography-1 dark:border-typography-2">
                            <option value="">Weekly</option>
                            <option value="">Monthly</option>
                            <option value="">Yearly</option>
                        </select>
                    </div>
                    <div class="space-y-1">
                        <p
                            class="text-base text-typography-2 dark:text-typography-1">
                            filter by: Product
                        </p>
                        <select
                            class="rounded-xl text-sm border dark:bg-dark-primary-1 min-w-40 dark:text-typography-1 dark:border-typography-2">
                            <option value="">All</option>
                            <option value="">Day Cream</option>
                            <option value="">Night Cream</option>
                            <option value="">Toner</option>
                        </select>
                    </div>
                </div>
                <div class="space-y-4">
                    <v-data-table
                        :headers="HeaderSalesData"
                        :items="BodySalesData"
                        hide-default-footer
                        class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }">
                        <template v-slot:[`item.revenue`]="{ item }">
                            {{ formatCurrency(item.revenue) }}
                        </template>
                    </v-data-table>
                    <v-pagination
                        v-model="pageUser"
                        :length="pageCount"
                        class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
            <div
                class="bg-light-primary-1 p-5 space-y-4 rounded-lg dark:bg-dark-primary-2 shadow-lg">
                <div class="text-xl dark:text-typography-1">
                    Sales Data Agent
                </div>
                <hr class="border-typography-2 !mb-4" />
                <div class="flex gap-6">
                    <div class="space-y-1">
                        <p
                            class="text-base text-typography-2 dark:text-typography-1">
                            filter by: Time
                        </p>
                        <select
                            class="rounded-xl text-sm border dark:bg-dark-primary-1 min-w-40 dark:text-typography-1 dark:border-typography-2">
                            <option value="">Weekly</option>
                            <option value="">Monthly</option>
                            <option value="">Yearly</option>
                        </select>
                    </div>
                    <div class="space-y-1">
                        <p
                            class="text-base text-typography-2 dark:text-typography-1">
                            filter by: Agent
                        </p>
                        <select
                            class="rounded-xl text-sm border dark:bg-dark-primary-1 min-w-40 dark:text-typography-1 dark:border-typography-2">
                            <option value="">Beuaty shop</option>
                            <option value="">Girly shop</option>
                            <option value="">Glow beauty shop</option>
                        </select>
                    </div>
                </div>
                <div class="space-y-4">
                    <v-data-table
                        :headers="HeaderSalesDataAgent"
                        :items="BodySalesDataAgent"
                        hide-default-footer
                        class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }">
                    </v-data-table>
                    <v-pagination
                        v-model="pageUser"
                        :length="pageCount"
                        class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
            <RouterLink :to="{ name: 'report.cashflow' }">
                <div
                    class="transition-all duration-500 bg-gradient-to-r to-[#7F00FF] via-[#BF00FF] from-[#FF00FF] bg-size-200 bg-pos-0 hover:bg-pos-100 py-11 rounded-xl mt-4">
                    <div class="text-center space-y-1 text-typography-1">
                        <div class="">
                            <i class="fa-solid fa-wallet text-5xl"></i>
                        </div>
                        <div class="text-2xl font-medium">Total Expenses</div>
                        <p class="text-sm font-normal">
                            View and manage your expenses easily
                        </p>
                        <div class="text-3xl font-medium">Rp 10,000,000</div>
                    </div>
                </div>
            </RouterLink>
        </div>
    </ReportLayout>
</template>
