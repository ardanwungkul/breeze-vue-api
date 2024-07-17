<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import AddFlashSaleProduct from '@/components/dialog/add/AddFlashSaleProduct.vue'
import { useFlashSaleStore } from '@/stores/shop-page/flash-sale'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { RouterLink } from 'vue-router'
import { vMaska } from 'maska/vue'

const optionsMoney = {
    mask: '9.99#',
    tokens: {
        9: { pattern: /[0-9]/, repeated: true },
    },
    reversed: true,
}
const storeFlashSale = useFlashSaleStore()
const props = defineProps({
    flashSale: Object,
    fetchFlashSale: Function,
})
const searchProduct = ref('')
const pageFlashsale = ref(1)
const itemsPerPageFlashsale = ref(10)

const headersProduct = [
    { key: 'product.product_name', title: 'Product', align: 'center' },
    { key: 'product.product_price', title: 'Price', align: 'center' },
    { key: 'flash_sale_price', title: 'Flash Sale Price', align: 'center' },
    {
        key: 'flash_sale_percentage',
        title: 'Flash Sale Percent',
        align: 'center',
    },
    { key: 'flash_sale_stock', title: 'Flash Sale Stock', align: 'center' },
    { key: 'id', title: 'Action', align: 'center' },
]

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const pageCount = computed(() => {
    return Math.ceil(
        filteredFlashSales.value.length / itemsPerPageFlashsale.value,
    )
})

const filteredFlashSales = computed(() => {
    if (!props.products) return []
    return props.products.filter(fs => {
        return fs.product.product_name
            .toLowerCase()
            .includes(searchProduct.value)
    })
})

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const deleteFlashSaleProduct = async id => {
    processing.value = true
    await storeFlashSale.deleteFlashSaleProduct(id, setErrors, processing)
    // await props.fetchFlashSale(props.flashSale.id)
    processing.value = false
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <AddFlashSaleProduct
                    :flashSale="flashSale"
                    :method="props.fetchFlashSale" />
                <input
                    type="text"
                    v-model="searchProduct"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Flash Sales" />
            </div>
            <v-data-table
                v-model:page="pageFlashsale"
                :search="searchProduct"
                :headers="headersProduct"
                :items="props.flashSale?.flash_sale_product"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.product.product_name="{ item }">
                    <p class="text-start">{{ item.product.product_name }}</p>
                </template>
                <template v-slot:item.product.product_price="{ item }">
                    <div class="flex items-center justify-center gap-2">
                        <p>Rp.</p>
                        <p>{{ formatPrice(item.product.product_price) }}</p>
                    </div>
                </template>
                <template v-slot:item.flash_sale_price="{ item }">
                    <div
                        class="rounded-lg border !border-gray-300 dark:!border-gray-800 dark:bg-dark-primary-2 relative w-[160px] h-[41px]">
                        <input
                            v-maska="optionsMoney"
                            class="rounded-r-lg !border-l !border-gray-300 dark:!border-gray-800 bg-light-primary-1 h-full dark:bg-dark-primary-2 w-[128px] inputPrice absolute right-0" />
                        <div
                            class="absolute left-0 h-full w-[32px] flex items-center justify-center border-r dark:!border-gray-800">
                            <p>Rp.</p>
                        </div>
                    </div>
                </template>
                <template v-slot:item.flash_sale_percentage="{ item }">
                    <div class="flex justify-center items-center">
                        <div
                            class="rounded-lg border !border-gray-300 dark:!border-gray-800 dark:bg-dark-primary-2 relative w-20 h-[41px]">
                            <input
                                v-maska="'##'"
                                max="100"
                                type="text"
                                class="border-r !border-gray-300 dark:!border-gray-800 dark:bg-dark-primary-2 w-14 absolute h-full left-0 rounded-l-lg" />
                            <div
                                class="absolute right-0 h-full w-6 flex items-center justify-center border-l dark:!border-gray-800">
                                <p>%</p>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:item.flash_sale_stock="{ item }">
                    <div>
                        <input
                            type="text"
                            class="rounded-lg border !border-gray-300 dark:!border-gray-800 dark:bg-dark-primary-2 w-16" />
                    </div>
                </template>
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <RouterLink
                            :to="{
                                name: 'admin.shop.show.flash-sale',
                                params: {
                                    id: item.id,
                                },
                            }">
                            <div
                                class="flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1">
                                <i class="fa-solid fa-check"></i>
                                <p>Save</p>
                            </div>
                        </RouterLink>
                        <ConfirmDelete
                            :type="'Product'"
                            :id="item.id"
                            :method="deleteFlashSaleProduct"></ConfirmDelete>
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageFlashsale"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
