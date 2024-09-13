<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import CashFlowTable from '@/components/admin/cashhflow/CashFlowTable.vue'
import { useExpenseStore } from '@/stores/expense'

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const store = useExpenseStore()
const expenses = ref([])
const startDateFilter = ref('')
const endDateFilter = ref(getTomorrowDate())
function getTomorrowDate() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const day = String(tomorrow.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const filteredExpenses = computed(() => {
    if (!startDateFilter.value || !endDateFilter.value) return expenses.value
    return expenses.value.filter(expense => {
        const issueDate = new Date(expense.expense_date)
        const start = new Date(startDateFilter.value)
        const end = new Date(endDateFilter.value)
        return issueDate >= start && issueDate <= end
    })
})

const data = computed(() => {
    let totalExpense = 0
    filteredExpenses.value.forEach(expense => {
        totalExpense += expense.expense_cost
    })
    const income = 0
    const proloss = income - totalExpense

    return {
        income,
        expense: totalExpense,
        proloss,
    }
})

onMounted(async () => {
    await store.expenseAll()
    await fetchExpense()
})
async function fetchExpense() {
    expenses.value = store.expenses
}
watchEffect(() => {
    fetchExpense()
})
</script>
<template>
    <AdminLayout title="Cash Flow">
        <div class="w-full space-y-3">
            <div class="flex gap-4 mb-4 items-center">
                <div class="w-full">
                    <input
                        type="date"
                        v-model="startDateFilter"
                        class="p-2 border rounded dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-light-primary-1 shadow-lg text-sm w-full" />
                </div>
                <p class="text-typography-2">-</p>
                <div class="w-full">
                    <input
                        type="date"
                        v-model="endDateFilter"
                        class="p-2 border rounded dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-light-primary-1 shadow-lg text-sm w-full" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
                <div
                    class="h-20 w-full shadow-lg rounded-lg flex items-center px-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2">
                    <div
                        class="dark:bg-light-primary-1 dark:text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-hand-holding-dollar text-3xl"></i>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium text-secondary-3">
                            Rp. {{ formatPrice(data.income) }}
                        </p>
                        <p class="text-sm">Income</p>
                    </div>
                </div>
                <div
                    class="h-20 w-full shadow-lg rounded-lg flex items-center px-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2">
                    <div
                        class="dark:bg-light-primary-1 dark:text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-receipt text-3xl"></i>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium text-red-500">
                            Rp. {{ formatPrice(data.expense) }}
                        </p>
                        <p class="text-sm">Expense</p>
                    </div>
                </div>
                <div
                    class="h-20 w-full shadow-lg rounded-lg flex items-center px-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2">
                    <div
                        class="dark:bg-light-primary-1 dark:text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-money-bill-trend-up text-3xl"></i>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center w-full">
                        <p
                            class="text-xl font-medium"
                            :class="
                                data.proloss > 0
                                    ? 'text-secondary-3'
                                    : 'text-red-500'
                            ">
                            Rp. {{ formatPrice(data.proloss) }}
                        </p>
                        <p class="text-sm">Profit/Loss</p>
                    </div>
                </div>
            </div>
            <CashFlowTable
                :expenses="filteredExpenses"
                :fetchExpense="fetchExpense" />
        </div>
    </AdminLayout>
</template>
