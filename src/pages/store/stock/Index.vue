<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { useSubCategoryStore } from '@/stores/subcategory'
import { useStockStore } from '@/stores/stock'
import StoreLayout from '@/layouts/StoreLayout.vue'
import LoadingAdmin from '@/components/LoadingAdmin.vue'
import TotalProductTable from '@/pages/admin/stock/TotalProductTable.vue'
import WarehouseStockTable from '@/pages/admin/stock/WarehouseStockTable.vue'
import AgentStockTable from '@/pages/admin/stock/AgentStockTable.vue'
import UntrackedProduct from '@/pages/admin/stock/UntrackedProduct.vue'
import '@/assets/css/vuetify.css'

const store = useStockStore()
const isLoading = ref(true)
const startDateFilter = ref('2024-01-01')
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

const data = ref({
    categories: [],
    stock: [],
    products: [],
})

onBeforeMount(async () => {
    await categoryStore.subCategoryAll()
    await store.stockAll()
    data.value.stock = store.stocks
    data.value.products = store.products
    data.value.categories = categoryStore.subcategories
    isLoading.value = false
})
const categoryStore = useSubCategoryStore()
const tab = ref(null)
</script>
<template>
    <StoreLayout>
        <LoadingAdmin :isLoading="isLoading" />
        <div class="w-full space-y-4" v-if="!isLoading">
            <div class="flex items-center justify-between gap-4">
                <div class="flex gap-4 items-center w-full">
                    <div class="w-full">
                        <input
                            type="date"
                            v-model="startDateFilter"
                            class="p-2 border rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-light-primary-1 shadow-lg text-sm w-full" />
                    </div>
                    <p class="text-typography-2">-</p>
                    <div class="w-full">
                        <input
                            type="date"
                            v-model="endDateFilter"
                            class="p-2 border rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-light-primary-1 shadow-lg text-sm w-full" />
                    </div>
                </div>
                <router-link
                    :to="{ name: 'admin.stock.scan' }"
                    class="py-2 px-3 border rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 border-gray-600 dark:!border-typography-2 dark:text-light-primary-1 shadow-lg text-sm h-full">
                    <i class="fa-solid fa-barcode-scan"></i>
                </router-link>
            </div>
            <div class="grid grid-cols-4 gap-3">
                <div
                    class="h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-box text-3xl"></i>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium">0</p>
                        <p class="text-sm text-center">Total Product</p>
                    </div>
                </div>
                <div
                    class="h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-warehouse text-3xl"></i>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium">0</p>
                        <p class="text-sm text-center">Stock in Warehouse</p>
                    </div>
                </div>
                <div
                    class="h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-shop text-3xl"></i>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium">0</p>
                        <p class="text-sm text-center">Stock in Shop</p>
                    </div>
                </div>
                <div
                    class="h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-user text-3xl"></i>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium">0</p>
                        <p class="text-sm text-center">Stock in Agent</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <v-tabs
                    v-model="tab"
                    class="dark:bg-dark-primary-2 bg-light-primary-1 dark:text-light-primary-1 dark:!border-typography-2 border rounded-lg shadow-lg">
                    <v-tab value="one">Total Stock</v-tab>
                    <v-tab value="two">Stock in Warehouse</v-tab>
                    <v-tab value="three">Stock in Agents</v-tab>
                    <v-tab value="four">Untracked Product</v-tab>
                </v-tabs>

                <v-tabs-window
                    v-model="tab"
                    class="dark:bg-dark-primary-2 bg-light-primary-1 dark:text-light-primary-1 p-3 dark:!border-typography-2 border rounded-lg shadow-lg">
                    <v-tabs-window-item value="one">
                        <TotalProductTable
                            v-if="!isLoading"
                            :data="data?.stock"
                            :categories="data?.categories" />
                    </v-tabs-window-item>

                    <v-tabs-window-item value="two">
                        <WarehouseStockTable
                            v-if="!isLoading"
                            :data="data"
                            :categories="data?.categories" />
                    </v-tabs-window-item>

                    <v-tabs-window-item value="three">
                        <AgentStockTable
                            v-if="!isLoading"
                            :data="data?.stock"
                            :categories="data?.categories" />
                    </v-tabs-window-item>
                    <v-tabs-window-item value="four">
                        <UntrackedProduct
                            v-if="!isLoading"
                            :data="data?.stock"
                            :products="data?.products"
                            :categories="data?.categories" />
                    </v-tabs-window-item>
                </v-tabs-window>
            </div>
        </div>
    </StoreLayout>
</template>
