<script setup>
import { ref, computed } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import { RouterLink } from 'vue-router'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { useExpenseStore } from '@/stores/expense'

const store = useExpenseStore()
const props = defineProps({
    expenses: Array,
    fetchExpense: Function,
})
const searchExpense = ref('')
const pageExpense = ref(1)
const itemsPerPageExpense = ref(10)

const headersExpense = [
    { key: 'expense_name', title: 'Expense Name' },
    { key: 'expense_category.category_name', title: 'Expense Category' },
    { key: 'expense_item.item_name', title: 'Expense Item' },
    { key: 'expense_date', title: 'Date Issues' },
    { key: 'expense_cost', title: 'Total Cost' },
    { key: 'id', title: 'Action', align: 'center' },
]
const pageCount = computed(() => {
    return Math.ceil(filteredExpenses.value.length / itemsPerPageExpense.value)
})

const filteredExpenses = computed(() => {
    return props.expenses.filter(expense => {
        return expense.expense_name.toLowerCase().includes(searchExpense.value)
    })
})
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const deleteExpense = async id => {
    await store.deleteExpense(id, processing)
}

const downloadExpense = async id => {
    await store.downloadExpense(id, processing)
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <RouterLink :to="{ name: 'admin.expense.create' }">
                    <div
                        class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg">
                        <i class="fa-solid fa-plus"></i>
                        <p>Add Expense</p>
                    </div>
                </RouterLink>
                <input
                    type="text"
                    v-model="searchExpense"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Expense" />
            </div>
            <v-data-table
                v-model:page="pageExpense"
                :search="searchExpense"
                :headers="headersExpense"
                :items="expenses"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <button type="button" @click="downloadExpense(item.id)">
                            <div
                                class="flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                                <i class="fa-solid fa-download"></i>
                            </div>
                        </button>
                        <router-link
                            :to="{
                                name: 'admin.expense.edit',
                                params: {
                                    id: item.id,
                                },
                            }">
                            <div
                                class="flex gap-2 items-center text-white bg-secondary-2 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                                <i class="fa-solid fa-pen"></i>
                            </div>
                        </router-link>
                        <ConfirmDelete
                            :type="'Expense'"
                            :id="item.id"
                            :method="deleteExpense"></ConfirmDelete>
                    </div>
                </template>
                <template v-slot:item.expense_cost="{ item }">
                    <div class="">
                        <p>Rp. {{ formatPrice(item.expense_cost) }}</p>
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageExpense"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
