<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
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
    flashSale: Array,
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
    if (!props.flashSale || typeof props.flashSale !== 'object') {
        return []
    } else {
        const flashSalesArray = Object.values(props.flashSale)
        return flashSalesArray[6].filter(fs => {
            return fs.product.product_name
                .toLowerCase()
                .includes(searchProduct.value.toLowerCase())
        })
    }
})

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const deleteFlashSaleProduct = async id => {
    processing.value = true
    await storeFlashSale.deleteFlashSaleProduct(id, setErrors, processing)
    processing.value = false
}

async function inputFlashSalePrice(item) {
    item.flash_sale_status = false
    const normal = parseInt(item.product.product_price)
    const fs = parseInt(item.flash_sale_price.replace(/\D/g, ''))
    const profit = normal - fs
    const percent = Math.floor((profit / normal) * 100)
    if (fs >= normal) {
        item.flash_sale_price = ''
        item.flash_sale_percent = ''
        document.getElementById('errors-' + item.id).textContent =
            'Max ' + (normal - 1)
    } else {
        item.flash_sale_percentage = percent
        document.getElementById('errors-' + item.id).textContent = ''
    }
    validateInput(item)
}
async function inputFlashSalePercent(item) {
    item.flash_sale_status = false
    const percent = parseInt(item.flash_sale_percentage)
    const normal = parseInt(item.product.product_price)
    const profit = (normal * percent) / 100
    item.flash_sale_price = normal - profit
    validateInput(item)
}

async function validateInput(item) {
    const inputFs = item.flash_sale_price
    const inputPercent = item.flash_sale_percentage
    const inputStock = item.flash_sale_stock
    const isDisabled =
        inputFs &&
        inputFs !== '' &&
        inputFs !== null &&
        !isNaN(inputFs) &&
        inputPercent &&
        inputPercent !== '' &&
        inputPercent !== null &&
        !isNaN(inputPercent) &&
        inputStock &&
        inputStock !== '' &&
        !isNaN(inputStock) &&
        inputStock !== null
            ? true
            : false
    item.status = isDisabled
}

onMounted(async () => {
    props.flashSale?.flash_sale_product.forEach(item => {
        item.flash_sale_status = false
    })
})
async function updateProduct(item) {
    const inputFs = parseInt(item.flash_sale_price?.replace(/\D/g, ''))
    const inputPercent = item.flash_sale_percentage
    const inputStock = item.flash_sale_stock
    if (item.status == true) {
        processing.value = true
        const formData = new FormData()
        formData.append('price', inputFs)
        formData.append('percentage', inputPercent)
        formData.append('stock', inputStock)
        formData.append('_method', 'PUT')
        await storeFlashSale.editFlashSaleProduct(
            formData,
            item.id,
            setErrors,
            processing,
        )
        processing.value = false
        item.status = false
    } else {
        console.log(item.status)
    }
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <AddFlashSaleProduct :flashSale="flashSale" />
                <svg
                    v-if="processing"
                    role="status"
                    class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <input
                    type="text"
                    v-model="searchProduct"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Flash Sales" />
            </div>
            <v-data-table
                v-model:page="pageFlashsale"
                :search="searchProduct"
                :items-per-page="itemsPerPageFlashsale"
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
                    <div class="py-2">
                        <div
                            class="rounded-lg border !border-gray-300 dark:!border-gray-800 dark:bg-dark-primary-2 relative w-[160px] h-[41px]">
                            <input
                                v-model="item.flash_sale_price"
                                v-maska="optionsMoney"
                                @change="inputFlashSalePrice(item)"
                                class="rounded-r-lg !border-l !border-gray-300 dark:!border-gray-800 bg-light-primary-1 h-full dark:bg-dark-primary-2 w-[128px] inputPrice absolute right-0" />
                            <div
                                class="absolute left-0 h-full w-[32px] flex items-center justify-center border-r dark:!border-gray-800">
                                <p>Rp.</p>
                            </div>
                        </div>
                        <p class="text-red-500" :id="'errors-' + item.id"></p>
                    </div>
                </template>
                <template v-slot:item.flash_sale_percentage="{ item }">
                    <div class="flex justify-center items-center">
                        <div
                            class="rounded-lg border !border-gray-300 dark:!border-gray-800 dark:bg-dark-primary-2 relative w-20 h-[41px]">
                            <input
                                v-model="item.flash_sale_percentage"
                                v-maska="'##'"
                                @change="inputFlashSalePercent(item)"
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
                            @change="validateInput(item)"
                            v-model="item.flash_sale_stock"
                            type="text"
                            class="rounded-lg border !border-gray-300 dark:!border-gray-800 dark:bg-dark-primary-2 w-16" />
                    </div>
                </template>
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <div
                            :class="
                                item.status == true
                                    ? 'cursor-pointer'
                                    : 'opacity-10 '
                            "
                            @click="updateProduct(item)"
                            class="flex gap-2 items-center text-white rounded-lg px-3 py-1 !bg-secondary-3">
                            <i class="fa-solid fa-check"></i>
                            <p>Save</p>
                        </div>
                        <ConfirmDelete
                            :label="'Delete'"
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
