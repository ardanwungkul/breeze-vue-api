<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { ref, computed, onBeforeMount } from 'vue'
import { useExpenseStore } from '@/stores/expense'
import { useRoute, useRouter } from 'vue-router'
import LoadingAdmin from '@/components/LoadingAdmin.vue'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'

const store = useExpenseStore()
const isLoading = ref(true)
const form = ref({
    expense_name: null,
    expense_cost: null,
    expense_cost_type: '',
    expense_category: null,
    expense_date: new Date().toISOString().split('T')[0],
    expense_sub_category: null,
    expense_quantity: null,
    expense_type: '',
    expense_evidence: null,
    expense_accounting_process: '',
    expense_recording_position: '',
})
const data = ref({
    category: [],
    sub_category: [],
})
const router = useRouter()
const route = useRoute()
const expenseId = ref(route.params.id)
const expense = ref()
onBeforeMount(async () => {
    await store.expenseById(expenseId.value)
    if (!store.singleExpense || Object.keys(store.singleExpense).length === 0) {
        router.replace('/404')
    } else {
        expense.value = store.singleExpense

        form.value.expense_name = expense.value.expense_name
        form.value.expense_cost = expense.value.expense_cost
        form.value.expense_cost_type = expense.value.expense_cost_type
        form.value.expense_date = expense.value.expense_date
        form.value.expense_quantity = expense.value.expense_quantity
        form.value.expense_type = expense.value.expense_type
        form.value.expense_category = expense.value.expense_category
        form.value.expense_sub_category = expense.value.expense_sub_category
        form.value.expense_accounting_process = expense.value.expense_accounting_process
        form.value.expense_recording_position = expense.value.expense_recording_position

        isLoading.value = store.loading
    }
    await store.getDataCreate()
    data.value.category = store.create.category
    // data.value.item = store.create.item
    const selectedCat = data.value.category.find(cat => cat.category_name === form.value.expense_category.category_name);
    if (selectedCat) {
        data.value.sub_category = selectedCat.sub_category;
    } else {
        data.value.sub_category = [];
    }

})

const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)

const editExpense = async () => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('expense_name', form.value.expense_name)
    formData.append('expense_cost', form.value.expense_cost)
    formData.append('expense_cost_type', form.value.expense_cost_type)
    formData.append(
        'expense_category',
        form.value.expense_category.category_name,
    )
    formData.append('expense_sub_category', form.value.expense_sub_category.category_name)
    formData.append('expense_date', form.value.expense_date)
    formData.append('expense_quantity', form.value.expense_quantity)
    formData.append('expense_type', form.value.expense_type)
    formData.append('expense_accounting_process', form.value.expense_accounting_process)
    formData.append('expense_recording_position', form.value.expense_recording_position)
    if (form.value.expense_evidence !== null) {
        formData.append('expense_evidence', form.value.expense_evidence)
    }
    await store.editExpense(formData, setErrors, processing, expenseId.value)
}
function addCategory(newCategory) {
    const category = {
        category_name: newCategory,
    }
    data.value.category.push(category)
    form.value.expense_category = category
    onGetSubCategory(category);
}
function addSubCategory(newSubCategory) {
    const subCategory = {
        category_name: newSubCategory,
    }
    data.value.sub_category.push(subCategory)
    form.value.expense_sub_category = subCategory
}
const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
        form.value.expense_evidence = file
    }
}
const onGetSubCategory = (category) => {
    const selectedCat = data.value.category.find(cat => cat.category_name === category.category_name);
    if (selectedCat && selectedCat.sub_category) {
        data.value.sub_category = selectedCat.sub_category;
    } else {
        data.value.sub_category = [];
    }
    form.value.expense_sub_category = null;
}
</script>
<template>
    <AdminLayout title="Edit Expense">
        <!-- {{ data.sub_category }} -->
        <ValidationErrors class="w-full" :errors="errors" />
        <LoadingAdmin :isLoading="isLoading" />
        <div class="w-full">
            <div class="px-5 py-3">
                <form @submit.prevent="editExpense">
                    <div class="space-y-3">
                        <div
                            class="border dark:!border-typography-3 dark-primary-2 border-gray-300 p-3 rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 transition-all">
                            <div class="grid grid-cols-2 gap-3 p-3">
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_name">Expense Name</label>
                                    <input v-model="form.expense_name"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="text" id="expense_name" placeholder="Enter Expense Name" required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_date">Expense Issued
                                        Date</label>
                                    <input v-model="form.expense_date"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="date" id="expense_date" placeholder="Enter Expense Date" required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_cost">Expense Cost</label>
                                    <input v-model="form.expense_cost"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="number" id="expense_cost" placeholder="Enter Expense Cost" required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_cost_type">Expense Cost
                                        Type</label>
                                    <select id="expense_cost_type"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        v-model="form.expense_cost_type" required>
                                        <option value="" disabled selected>
                                            Select Expense Cost Type
                                        </option>
                                        <option value="Variable Cost">
                                            Variable Cost
                                        </option>
                                        <option value="Fixed Cost">
                                            Fixed Cost
                                        </option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_quantity">Expense
                                        Quantity</label>
                                    <input v-model="form.expense_quantity"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="number" id="expense_quantity" placeholder="Enter Quantity" required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_type">Expense Type</label>
                                    <select id="expense_type"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        v-model="form.expense_type" required>
                                        <option value="" disabled selected>
                                            Select Expense Type
                                        </option>
                                        <option value="Specific Item">
                                            Specific Item
                                        </option>
                                        <option value="All Cost">
                                            All Cost
                                        </option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_category">Expense
                                        Category</label>
                                    <multiselect v-model="form.expense_category" id="expense_category"
                                        :options="data?.category" :searchable="true" :close-on-select="true"
                                        label="category_name" track-by="category_name" :preserve-search="true"
                                        placeholder="Select Expense Categories" :taggable="true" @tag="addCategory"
                                        @select="onGetSubCategory">
                                    </multiselect>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_sub_category">Expense Sub
                                        Category</label>
                                    <multiselect id="expense_sub_category" v-model="form.expense_sub_category"
                                        :options="data?.sub_category" :searchable="true" :close-on-select="true"
                                        label="category_name" track-by="category_name" :preserve-search="true"
                                        placeholder="Select Expense Sub Category" :taggable="true"
                                        @tag="addSubCategory">
                                    </multiselect>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_accounting_process">Accounting
                                        Process</label>
                                    <select id="expense_accounting_process"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        v-model="form.expense_accounting_process" required>
                                        <option value="" disabled selected>
                                            Select Accounting Process
                                        </option>
                                        <option value="Profit/Loss">
                                            Profit/Loss
                                        </option>
                                        <option value="Neraca">
                                            Neraca
                                        </option>
                                        <option value="Ledger">
                                            Ledger
                                        </option>
                                        <option value="Journal">
                                            Journal
                                        </option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label class="dark:text-light-primary-1" for="expense_recording_position">Recording
                                        Position</label>
                                    <select id="expense_recording_position"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        v-model="form.expense_recording_position" required>
                                        <option value="" disabled selected>
                                            Select Recording Position
                                        </option>
                                        <option value="Debit">
                                            Debit
                                        </option>
                                        <option value="Credit">
                                            Credit
                                        </option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2 text-sm col-span-2">
                                    <label class="dark:text-light-primary-1" for="expense_evidence">Expense
                                        Evidence</label>
                                    <input
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="file" ref="fileInput" accept="application/pdf" id="expense_evidence"
                                        placeholder="Enter Expense Item" @change="handleFileChange" />
                                </div>
                            </div>
                        </div>
                        <button
                            class="bg-secondary-3 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3">
                            <p>Save</p>
                            <i class="fa-solid fa-check"></i>
                            <svg v-if="processing" role="status"
                                class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>
