<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import AddProduct from '@/components/dialog/add/AddProduct.vue'
import EditProduct from '@/components/dialog/edit/EditProduct.vue'
import { useProductStore } from '@/stores/product'
import ValidationErrors from '@/components/ValidationErrors.vue'

const storeProduct = useProductStore()
const props = defineProps({
    products: Array,
    fetchProducts: Function,
})
const searchProduct = ref('')
const pageProduct = ref(1)
const itemsPerPageProduct = ref(10)

const headersProduct = [
    { key: 'name', title: 'Product Name' },
    {
        key: 'subcategory.sub_category_name',
        title: 'Category',
        align: 'start',
    },
    {
        key: 'product_price',
        title: 'Price',
        align: 'start',
    },
    {
        key: 'product_stock',
        title: 'Stock',
        align: 'start',
    },
    {
        key: 'product_tag',
        title: 'Tag',
        align: 'start',
    },
    { key: 'id', title: 'Action', align: 'center' },
]
const pageCount = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPageProduct.value)
})

const filteredProducts = computed(() => {
    return props.products.filter(product => {
        return product.name.toLowerCase().includes(searchProduct.value)
    })
})

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const addProduct = async newProduct => {
    await storeProduct.addProduct(newProduct, setErrors, processing)
    watchEffect(() => {
        props.fetchProducts()
    }, props.products)
}
const editProduct = async (updateProduct, id) => {
    await storeProduct.editProduct(updateProduct, setErrors, processing, id)
    watchEffect(() => {
        props.fetchProducts()
    }, props.products)
}
const deleteProduct = async id => {
    await storeProduct.deleteProduct(id, processing)
    watchEffect(() => {
        props.fetchProducts()
    }, props.products)
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <AddProduct :method="addProduct"></AddProduct>
                <input
                    type="text"
                    v-model="searchProduct"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Product Item" />
            </div>
            <v-data-table
                v-model:page="pageProduct"
                :search="searchProduct"
                :headers="headersProduct"
                :items="products"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <EditProduct
                            :product="item"
                            :method="editProduct"></EditProduct>
                        <ConfirmDelete
                            :type="'Product'"
                            :id="item.id"
                            :method="deleteProduct"></ConfirmDelete>
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageProduct"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
