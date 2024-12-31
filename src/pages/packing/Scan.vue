<script setup>
import PackingLayout from '@/layouts/PackingLayout.vue'
import { usePaymentStore } from '@/stores/payment'
import { onMounted, ref, computed } from 'vue'
import '@/assets/css/vuetify.css'
import { useRoute } from 'vue-router'
import LoadingAdmin from '@/components/LoadingAdmin.vue'
import QrScanner from '@/components/dialog/QrChecker.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'
import { useStockStore } from '@/stores/stock'

const route = useRoute()
const invoiceCode = route.params.invoice
const payment = ref()
const storePayment = usePaymentStore()
const storeStock = useStockStore()

const processing = ref(false)
const isLoading = ref(true)
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const setSuccess = ref([])
const success = computed(() => setSuccess.value)
const isSaveDisabled = computed(() => {
    return packingProduct.value.some(item => item.scanned < item.quantity)
})

const qr = ref({
    paused: false,
    alert: false,
})
const data = ref({
    products: [],
})
const packingProduct = ref([])

const checkQr = async formData => {
    await storePayment.checkQrPacking(
        formData,
        setErrors,
        processing,
        invoiceCode,
        qr,
        setSuccess,
        packingProduct,
    )
    await timeout(500)
}
const timeout = async ms => {
    return new Promise(resolve => {
        window.setTimeout(resolve, ms)
    })
}

onMounted(async () => {
    await storePayment.paymentByInvoiceCode(invoiceCode, isLoading)
    fetchPayment()
})
const fetchPayment = () => {
    payment.value = storePayment.singlePayment
    filterPaymentBundling()
}
const filterPaymentBundling = () => {
    const items = payment.value?.items || []
    items.forEach(item => {
        if (item.bundling?.item) {
            item.bundling.item.forEach(bundledItem => {
                const existingProduct = packingProduct.value.find(
                    product => product.product.id === bundledItem.product.id,
                )
                if (existingProduct) {
                    existingProduct.quantity += item.quantity
                } else {
                    packingProduct.value.push({
                        product: bundledItem.product,
                        quantity: item.quantity,
                        scanned: 0,
                        code: [],
                    })
                }
            })
        } else {
            const existingProduct = packingProduct.value.find(
                product => product.product.id === item.product.id,
            )
            if (existingProduct) {
                existingProduct.quantity += item.quantity
            } else {
                packingProduct.value.push({
                    product: item.product,
                    quantity: item.quantity,
                    scanned: 0,
                    code: [],
                })
            }
        }
    })
}

const headersData = [
    { key: 'product.product_name', title: 'Product' },
    { key: 'code', title: 'Product Code' },
    { key: 'quantity', title: 'Quantity', align: 'center' },
]

const submitStock = async () => {
    const formData = new FormData()
    packingProduct.value.forEach((product, index) => {
        formData.append(`products[${index}][code]`, product.code)
        formData.append(`products[${index}][id]`, product.product.id)
        formData.append(`products[${index}][quantity]`, product.quantity)
    })
    formData.append('payment_id', payment.value.id)

    await storeStock.submitToPacked(formData, setErrors, processing)
}
</script>
<template>
    <PackingLayout :title="'Packing for ' + invoiceCode">
        <ValidationErrors class="w-full" :errors="errors" />
        <SuccessMessage class="w-full" :messages="success" />
        <div class="relative">
            <LoadingAdmin :isLoading="isLoading" />
            <div
                class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                <div class="flex justify-between">
                    <v-dialog>
                        <template v-slot:activator="{ props: activatorProps }">
                            <button
                                type="button"
                                v-bind="activatorProps"
                                @click="qr.paused = false">
                                <i
                                    class="fa-solid fa-camera dark:text-typography-1"></i>
                            </button>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <div>
                                <div>
                                    <QrScanner
                                        :qr="qr"
                                        :checkQr="checkQr"
                                        v-model:result="data.products"
                                        :show="isActive" />
                                </div>
                            </div>
                        </template>
                    </v-dialog>
                    <button
                        type="button"
                        :disabled="isSaveDisabled"
                        @click="submitStock"
                        :class="
                            isSaveDisabled
                                ? 'bg-gray-500'
                                : 'bg-secondary-3 hover:bg-opacity-90'
                        "
                        class="!text-light-primary-1 px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3">
                        <i class="fa-solid fa-check"></i>
                        <p>Save</p>
                    </button>
                </div>
                <v-data-table
                    :search="searchData"
                    :headers="headersData"
                    :items="packingProduct"
                    hide-default-footer
                    :header-props="{
                        class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                    }"
                    item-key="id"
                    class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                    <template v-slot:item.product.product_name="{ item }">
                        <div class="py-2">
                            <p class="line-clamp-2">
                                {{ item.product.product_name }}
                            </p>
                        </div>
                    </template>
                    <template v-slot:item.code="{ item }">
                        <ul v-if="item.code.length > 0">
                            <li
                                v-for="(i, ind) in item.code"
                                :key="ind"
                                class="list-disc">
                                {{ i }}
                            </li>
                        </ul>
                    </template>
                    <template v-slot:item.quantity="{ item }">
                        <div class="flex justify-center gap-1">
                            <p>{{ item.scanned }}</p>
                            <p>/</p>
                            <p>{{ item.quantity }}</p>
                        </div>
                    </template>
                </v-data-table>
            </div>
        </div>
    </PackingLayout>
</template>
