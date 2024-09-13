<script setup>
import { ref, computed, watchEffect, onBeforeMount } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import { useProductStore } from '@/stores/product'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { RouterLink } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import saveSvgAsPng from 'save-svg-as-png'
import { useUsers } from '@/stores/user'
import { useStockStore } from '@/stores/stock'
import SuccessMessage from '@/components/SuccessMessage.vue'

const storeProduct = useProductStore()
const stockStore = useStockStore()
const userStore = useUsers()
const password = ref(null)
const props = defineProps({
    products: Array,
    fetchProducts: Function,
})
const searchProduct = ref('')
const pageProduct = ref(1)
const itemsPerPageProduct = ref(10)

onBeforeMount(() => {
    if (!userStore.hasUserData) {
        userStore.getData()
    }
})
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
const setSuccess = ref([])
const success = computed(() => setSuccess.value)

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

const generateStock = async (item, isActive) => {
    processing.value = true
    const formData = new FormData()
    formData.append('email', userStore.userData.email)
    formData.append('password', password.value)
    formData.append('quantity', item.product_stock)
    formData.append('product_id', item.id)
    await stockStore.generateStock(formData, setErrors, processing, setSuccess)
    password.value = ''
    isActive.value = false
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <SuccessMessage class="w-full" :messages="success" />

        <div v-if="success">Success</div>
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
                        <v-dialog max-width="500">
                            <template
                                v-slot:activator="{ props: activatorProps }">
                                <button
                                    v-bind="activatorProps"
                                    :class="
                                        item.product_code ? '' : 'opacity-20'
                                    "
                                    :disabled="!item.product_code"
                                    class="flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                                    <i class="fa-solid fa-qrcode"></i>
                                    <p class="whitespace-nowrap">
                                        Generate Qr Code
                                    </p>
                                </button>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <form
                                    @submit.prevent="
                                        generateStock(item, isActive)
                                    ">
                                    <v-card
                                        :title="
                                            'Generate Qr Stock for ' +
                                            item.product_name
                                        ">
                                        <div class="p-5 space-y-2">
                                            <div class="flex flex-col gap-1">
                                                <label
                                                    :for="
                                                        'generate_stock_' +
                                                        item.id
                                                    "
                                                    >Stock Quantity</label
                                                >
                                                <input
                                                    class="rounded-lg border bg-gray-100 shadow-lg"
                                                    type="number"
                                                    v-model="item.product_stock"
                                                    required
                                                    :name="
                                                        'generate_stock_' +
                                                        item.id
                                                    "
                                                    :id="
                                                        'generate_stock_' +
                                                        item.id
                                                    " />
                                            </div>
                                            <div class="flex flex-col gap-1">
                                                <label>Password</label>
                                                <input
                                                    class="rounded-lg border bg-gray-100 shadow-lg"
                                                    type="password"
                                                    placeholder="Enter Your Password to Continue"
                                                    v-model="password"
                                                    required />
                                            </div>
                                        </div>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <div class="flex gap-3">
                                                <button
                                                    class="bg-secondary-3 text-typography-1 px-5 py-1 rounded-lg hover:bg-opacity-85 flex gap-3 items-center"
                                                    type="submit">
                                                    <p>Generate</p>
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
                                                <button
                                                    class="bg-red-500 text-typography-1 px-5 py-1 rounded-lg hover:bg-opacity-85"
                                                    @click="
                                                        isActive.value = false
                                                    "
                                                    type="button">
                                                    Cancel
                                                </button>
                                            </div>
                                        </v-card-actions>
                                    </v-card>
                                </form>
                            </template>
                        </v-dialog>
                        <!-- <button
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
                        </button> -->
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
