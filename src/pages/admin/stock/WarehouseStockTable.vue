<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    categories: Array,
    data: Array,
})
const stocks = props.data.stock
const products = props.data.products
console.log(stocks, products, props.data)

const filter = ref('')
const headersTable = [
    { key: 'product_name', title: 'Product Name' },
    { key: 'id', title: 'Stock' },
    { key: 'id', title: 'Sold' },
]
const search = ref('')
const pageData = ref(1)
const itemsPerPageData = ref(10)
onMounted(() => {
    const pageCount = computed(() => {
        return Math.ceil(filteredData.value.length / itemsPerPageData.value)
    })
})
// const warehouseData = computed(() => {
//     return stocks.filter(item => item.product_stock_status === 'warehouse')
// })

const filteredData = computed(() => {
    return products.filter(item =>
        item.id.toString().toLowerCase().includes(search.value.toLowerCase()),
    )
})
</script>
<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <select
                name=""
                id=""
                v-model="filter"
                class="border rounded-lg dark:!border-typography-2 text-sm shadow-lg bg-light-primary-1 dark:bg-dark-primary-1">
                <option value="" selected>All</option>
                <option
                    value=""
                    v-for="(category, index) in categories"
                    :key="index">
                    {{ category.sub_category_name }}
                </option>
            </select>
            <input
                type="text"
                v-model="search"
                class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                placeholder="Search Items" />
        </div>
        <div class="rounded-lg">
            <v-data-table
                v-model:page="pageData"
                :search="search"
                :headers="headersTable"
                :items="data.products"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
            </v-data-table>
        </div>
        <v-pagination
            v-model="pageData"
            :length="pageCount"
            class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
            :total-visible="5">
        </v-pagination>
    </div>
</template>
