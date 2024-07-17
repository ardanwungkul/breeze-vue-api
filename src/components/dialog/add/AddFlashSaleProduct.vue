<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import '@/assets/css/vue-select.css'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { useProductStore } from '@/stores/product'
import { useFlashSaleStore } from '@/stores/shop-page/flash-sale'

const storeProduct = useProductStore()
const storeFlashSale = useFlashSaleStore()

const searchProduct = ref('')
const products = ref([])
const selectedProducts = ref([])

onMounted(async () => {
    await fetchProducts()
})

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
async function fetchProducts() {
    await storeProduct.productAll()
    products.value = storeProduct.allProduct
}
const headersProduct = [
    { key: 'id', title: '', align: 'center' },
    { key: 'product_name', title: 'Product', align: 'center' },
    { key: 'product_price', title: 'Price', align: 'center' },
    { key: 'product_stock', title: 'Stock', align: 'center' },
]

const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const props = defineProps({
    flashSale: Object,
    method: Function,
})

const addProduct = async () => {
    processing.value = true
    const formData = new FormData()
    selectedProducts.value.forEach(productId => {
        formData.append('product_id[]', productId)
    })
    await storeFlashSale.addProduct(
        props.flashSale.id,
        formData,
        setErrors,
        processing,
    )
    selectedProducts.value = []

    watchEffect(() => {
        props.method(props.flashSale.id)
    }, props.flashSales)
}
const handleAdd = async () => {}
</script>

<template>
    <v-dialog>
        <template v-slot:activator="{ props: activatorProps }">
            <div
                v-bind="activatorProps"
                class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg">
                <i class="fa-solid fa-plus"></i>
                <p>Add Product</p>
            </div>
        </template>

        <template v-slot:default="{ isActive }">
            <div
                class="w-full max-w-4xl mx-auto bg-light-primary-1 rounded-xl shadow-lg overflow-y-scroll invisible-scrollbar">
                <div
                    class="flex justify-between border-b py-3 px-4 items-center">
                    <p class="font-medium text-lg">Add Flash Sale</p>
                    <button
                        @click="isActive.value = false"
                        class="fa-solid fa-x rounded-xl hover:bg-gray-100 px-3 py-2"></button>
                </div>
                <div class="px-5 py-3">
                    <form
                        @submit.prevent="addProduct"
                        enctype="multipart/form-data">
                        <div class="relative">
                            <ValidationErrors class="w-full" :errors="errors" />
                            <div
                                class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                                <div class="flex justify-between items-center">
                                    <input
                                        type="text"
                                        v-model="searchProduct"
                                        class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                                        placeholder="Search Product" />
                                    <button
                                        class="bg-secondary-3 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3">
                                        <p>Add</p>
                                        <i class="fa-solid fa-plus"></i>
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
                                    </button>
                                </div>

                                <v-data-table
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
                                        <input
                                            v-model="selectedProducts"
                                            type="checkbox"
                                            :value="item.id"
                                            class="rounded-full border" />
                                    </template>
                                    <template
                                        v-slot:item.product_price="{ item }">
                                        <div
                                            class="flex items-center justify-center gap-2">
                                            <p>Rp.</p>
                                            <p>
                                                {{
                                                    formatPrice(
                                                        item.product_price,
                                                    )
                                                }}
                                            </p>
                                        </div>
                                    </template>
                                </v-data-table>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </template>
    </v-dialog>
</template>
