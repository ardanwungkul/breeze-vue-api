<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { ref, computed, watch } from 'vue'
import { useStockStore } from '@/stores/stock'
import QrScanner from '@/components/dialog/QrChecker.vue'
import '@/assets/css/vuetify.css'
import ValidationErrors from '@/components/ValidationErrors.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'

const store = useStockStore()
const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const setSuccess = ref([])
const success = computed(() => setSuccess.value)

const headersTable = [
    {
        key: 'product.product_name',
        title: 'Product',
    },
    {
        key: 'product_code',
        title: 'Product Code',
    },
    {
        key: 'amount',
        title: 'Amount',
    },
]

const qr = ref({
    paused: false,
    alert: false,
})

const data = ref({
    products: [],
})
const clearAfterDelay = refValue => {
    watch(refValue, newVal => {
        if (newVal.length > 0) {
            setTimeout(() => {
                refValue.value = []
            }, 2000)
        }
    })
}
// clearAfterDelay(setErrors)
// clearAfterDelay(setSuccess)

const checkQr = async formData => {
    await store.checkQr(
        formData,
        data.value.products,
        setErrors,
        processing,
        qr,
        setSuccess,
    )
    await timeout(500)
}
const timeout = async ms => {
    return new Promise(resolve => {
        window.setTimeout(resolve, ms)
    })
}
const submitStock = async () => {
    if (data.value.products.length > 0) {
        const formData = new FormData()
        data.value.products.forEach((product, index) => {
            formData.append(`products[${index}][id]`, product.id)
            formData.append(
                `products[${index}][product_id]`,
                product.product_id,
            )
            formData.append(`products[${index}][amount]`, product.amount)
            formData.append(
                `products[${index}][product_code]`,
                product.product_code,
            )
        })
        await store.submitToWarehouse(
            data.value.products,
            formData,
            setErrors,
            processing,
        )
    } else {
        setErrors.value = Object.values(['Scan More Than 1 Products']).flat()
    }
}
</script>
<template>
    <AdminLayout>
        <ValidationErrors class="w-full" :errors="errors" />
        <SuccessMessage class="w-full" :messages="success" />
        <div class="w-full space-y-4">
            <div
                class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                <!-- {{ data.products }} -->
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
                        @click="submitStock"
                        class="bg-secondary-3 hover:bg-opacity-90 !text-light-primary-1 px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3">
                        <i class="fa-solid fa-check"></i>
                        <p>Save</p>
                    </button>
                </div>
                <v-data-table
                    v-model:page="pageTable"
                    :search="searchTable"
                    :headers="headersTable"
                    :items="data.products"
                    hide-default-footer
                    :header-props="{
                        class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                    }"
                    item-key="id"
                    class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                    <template v-slot:item.product.product_name="{ item }">
                        <p class="line-clamp-2">
                            {{ item.product.product_name }}
                        </p>
                    </template>
                    <template v-slot:item.amount="{ item }">
                        <input
                            type="number"
                            class="w-20 bg-transparent active:ring-0 focus:ring-0"
                            v-model="item.amount"
                            v-if="
                                item.product.product_code_type == 'common_code'
                            " />
                        <p v-else>{{ item.amount }}</p>
                    </template>
                </v-data-table>
            </div>
        </div>
    </AdminLayout>
</template>
