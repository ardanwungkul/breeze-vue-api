<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import { useProductStore } from '@/stores/product'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { RouterLink } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import saveSvgAsPng from 'save-svg-as-png'

const storeProduct = useProductStore()
const props = defineProps({
    products: Array,
    fetchProducts: Function,
})
const searchProduct = ref('')
const pageProduct = ref(1)
const itemsPerPageProduct = ref(10)

const headersProduct = [
    { key: 'product_name', title: 'Product Name' },
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
    { key: 'id', title: 'Action', align: 'center' },
]
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const pageCount = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPageProduct.value)
})

const filteredProducts = computed(() => {
    return props.products.filter(product => {
        return product.product_name.toLowerCase().includes(searchProduct.value)
    })
})

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)

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

const downloadQr = async item => {
    if (item.product_code) {
        saveSvgAsPng.saveSvgAsPng(
            document.getElementById('qr-' + item.id),
            item.product_name + '-qrcode.png',
            {
                scale: 10,
                width: 0,
                height: 0,
            },
        )
    } else {
        setErrors.value = Object.values([
            'Please enter the Product Code before proceeding.',
        ]).flat()
    }
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <RouterLink :to="{ name: 'admin.product.create' }">
                    <div
                        v-bind="activatorProps"
                        class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg">
                        <i class="fa-solid fa-plus"></i>
                        <p>Add Product</p>
                    </div>
                </RouterLink>
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
                <template v-slot:item.product_name="{ item }">
                    <div class="grid grid-cols-1 py-2">
                        <p class="line-clamp-2">{{ item.product_name }}</p>
                    </div>
                </template>
                <template v-slot:item.product_price="{ item }">
                    <div class="grid grid-cols-1 py-2">
                        <p class="line-clamp-2">
                            Rp. {{ formatPrice(item.product_price) }}
                        </p>
                    </div>
                </template>
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <router-link
                            :to="{
                                name: 'admin.product.edit',
                                params: {
                                    id: item.id,
                                },
                            }">
                            <div
                                class="flex gap-2 items-center text-white bg-secondary-2 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                                <i class="fa-solid fa-pen"></i>
                                <p>Edit</p>
                            </div>
                        </router-link>
                        <ConfirmDelete
                            :label="'Delete'"
                            :type="'Product'"
                            :id="item.id"
                            :method="deleteProduct"></ConfirmDelete>
                        <button
                            :class="item.product_code ? '' : 'opacity-20'"
                            class="flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer"
                            @click="downloadQr(item)">
                            <i class="fa-solid fa-qrcode"></i>
                            <p class="whitespace-nowrap">Qr Code</p>
                            <QrcodeVue
                                :id="'qr-' + item.id"
                                v-if="item.product_code"
                                render-as="svg"
                                width="1000"
                                height="1000"
                                class="hidden"
                                margin="1"
                                :value="item.product_code" />
                        </button>
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
