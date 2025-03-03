<script setup>
import { ref, computed, onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
import saveSvgAsPng from 'save-svg-as-png'
import JSZip from 'jszip'
import Loading from '@/components/Loading.vue'

const loading = ref(false)
const props = defineProps({
    categories: Array,
    data: Array,
    products: Array,
})
const filter = ref('')
const headersTable = [
    { key: 'product_name', title: 'Product Name', align: 'center' },
    { key: 'stock', title: 'Stock', align: 'center' },
    { key: 'product_code_type', title: 'Code Type', align: 'center' },
    { key: 'action', title: 'Action', align: 'center' },
]

const pendingData = computed(() => {
    return props.products
        .map(product => {
            const pendingStock = product.stock.filter(
                stockItem => stockItem.product_stock_status === 'pending',
            )

            if (pendingStock.length > 0) {
                return {
                    ...product,
                    stock: pendingStock,
                }
            }
            return null
        })
        .filter(product => product !== null)
})

const search = ref('')
const pageData = ref(1)
const itemsPerPageData = ref(10)
onMounted(() => {
    const pageCount = computed(() => {
        return Math.ceil(filteredData.value.length / itemsPerPageData.value)
    })

    const filteredData = computed(() => {
        return props.data.filter(item => {
            return item.id.toLowerCase().includes(searchData.value)
        })
    })
})

const downloadQr = async item => {
    loading.value = true
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
    loading.value = false
}
const downloadQrUnique = async (product_name, product_code, id) => {
    loading.value = true
    console.log(document.getElementById('qr-unique-' + id))

    saveSvgAsPng.saveSvgAsPng(
        document.getElementById('qr-unique-' + id),
        `${product_name}-${product_code}-qrcode.png`,
        {
            scale: 10,
            width: 0,
            height: 0,
        },
    )
    loading.value = false
}
const downloadAllQrCodes = async items => {
    const zip = new JSZip()
    const qrFolder = zip.folder('qr_codes')
    loading.value = true

    for (const qr of items.stock) {
        const svgElement = document.getElementById('qr-unique-' + qr.id)
        if (svgElement) {
            const pngDataUrl = await saveSvgAsPng.svgAsPngUri(svgElement, {
                scale: 10,
                width: 0,
                height: 0,
            })

            const pngBlob = await (await fetch(pngDataUrl)).blob()

            qrFolder.file(
                `${items.product_name}-${qr.product_code}.png`,
                pngBlob,
            )
        }
    }

    zip.generateAsync({ type: 'blob' }).then(blob => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'qr_codes.zip'
        link.click()
    })

    loading.value = false
}
</script>
<template>
    <div class="space-y-4">
        <Loading :isLoading="loading" />
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
                :items="pendingData"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.product_name="{ item }">
                    <div class="text-center">
                        <p class="text-start line-clamp-2">
                            {{ item.product_name }}
                        </p>
                    </div>
                </template>
                <template v-slot:item.product_code_type="{ item }">
                    <div class="text-center">
                        <p v-if="item.product_code_type === 'common_code'">
                            Common
                        </p>
                        <p v-else>Unique</p>
                    </div>
                </template>
                <template v-slot:item.stock="{ item }">
                    <div class="grid grid-cols-1 py-2">
                        <p class="line-clamp-2">
                            {{ item.stock.length }}
                        </p>
                    </div>
                </template>
                <template v-slot:item.action="{ item }">
                    <button
                        v-if="item.product_code_type == 'common_code'"
                        @click="downloadQr(item)"
                        class="flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer text-sm">
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

                    <v-dialog max-width="1080" v-else>
                        <template v-slot:activator="{ props: activatorProps }">
                            <button
                                v-bind="activatorProps"
                                class="flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer text-sm">
                                <i class="fa-solid fa-qrcode"></i>
                                <p class="whitespace-nowrap">Qr Code</p>
                            </button>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <div
                                class="bg-light-primary-1 rounded-lg !max-h-[calc(100vh-20px)] overflow-y-scroll invisible-scrollbar">
                                <div
                                    class="flex justify-between items-center border-b py-3 px-6 sticky top-0 bg-light-primary-1">
                                    <p class="font-medium">
                                        <span
                                            class="text-lg text-typography-3 font-semibold">
                                            List Qr Code Products
                                        </span>
                                        {{ item.voucher_name }}
                                    </p>
                                    <button
                                        type="button"
                                        class="rounded-full flex items-center justify-center w-10 h-10 hover:bg-gray-100"
                                        @click="isActive.value = false">
                                        <i class="fa-solid fa-x"></i>
                                    </button>
                                </div>
                                <div class="p-6 grid grid-cols-3 gap-3">
                                    <div
                                        class="col-span-3 grid grid-cols-4 gap-3">
                                        <button
                                            @click="downloadAllQrCodes(item)"
                                            type="button"
                                            class="col-start-4 border w-full bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 flex justify-center items-center gap-3 shadow-lg">
                                            <p class="text-light-primary-1">
                                                Download All
                                            </p>
                                            <i
                                                class="fa-solid fa-download text-light-primary-1"></i>
                                        </button>
                                    </div>

                                    <div
                                        v-for="(qr, index) in item.stock"
                                        :key="index"
                                        class="border rounded-lg p-3 bg-light-primary-2">
                                        <div class="rounded-lg overflow-hidden">
                                            <QrcodeVue
                                                :id="'qr-unique-' + qr.id"
                                                render-as="svg"
                                                width="1000"
                                                height="1000"
                                                class="w-full h-full"
                                                margin="1"
                                                :value="qr.product_code" />
                                        </div>
                                        <div
                                            class="flex justify-between items-center pt-3">
                                            <p class="text-center">
                                                {{ qr.product_code }}
                                            </p>
                                            <button
                                                type="button"
                                                @click="
                                                    downloadQrUnique(
                                                        item.product_name,
                                                        qr.product_code,
                                                        qr.id,
                                                    )
                                                ">
                                                <i
                                                    class="fa-solid fa-download text-green-500"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </v-dialog>
                </template>
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
