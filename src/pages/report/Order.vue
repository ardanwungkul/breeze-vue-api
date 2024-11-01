<script setup>
import ReportLayout from '@/layouts/ReportLayout.vue'
// image dummy
import bussinessman from '@/assets/ion/bussiness-man.png'
import man1 from '@/assets/ion/man (1).png'
import woman from '@/assets/ion/woman.png'
import man2 from '@/assets/ion/man (2).png'
import man from '@/assets/ion/man.png'
// end image dummmy

// data dummy 
const HeadersOrderQuantity = [
    { key: 'product', title: 'Product' },
    { key: 'quantity', title: 'Quantity (Pcs)' }
]
const BodyOrderQuantity = [
    { product: 'Nightcream', quantity: 175 },
    { product: 'Dayscream', quantity: 1120 },
    { product: 'Sunscreen', quantity: 23400 },
    { product: 'Moisturizer', quantity: 2100 },
    { product: 'Toner', quantity: 201 }
]

const HeadersOrderPaymentStatus = [
    { key: 'product', title: 'Product' },
    { key: 'quantity', title: 'Quantity (Pcs)' },
    { key: 'status', title: 'Status' }
]
const BodyOrderPaymentStatus = [
    { product: 'Nightcream', quantity: 230, status: 'Paid' },
    { product: 'Dayscream', quantity: 101, status: 'Paid' },
    { product: 'Sunscreen', quantity: 2340, status: 'Paid' },
    { product: 'Moisturizer', quantity: 19, status: 'Unpaid' },
    { product: 'Toner', quantity: 160, status: 'Paid' }
]
const HeadersDeliveryOrderReport = [
    { key: 'product', title: 'Product' },
    { key: 'quantity', title: 'Quantity (Pcs)' },
    { key: 'status', title: 'Status' }
]
const BodyDeliveryOrderReport = [
    { product: 'Nightcream', quantity: 175, status: 'Delivered' },
    { product: 'Dayscream', quantity: 1120, status: 'Return' },
    { product: 'Sunscreen', quantity: 23400, status: 'Delivered' },
    { product: 'Moisturizer', quantity: 2100, status: 'Packing' },
    { product: 'Toner', quantity: 201, status: 'Delivering' }
]

const HeadersHistory = [
    { key: 'no', title: 'No', width: '60px' },
    { key: 'name', title: 'User' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'purchase', title: 'Purchase' },
    { key: 'detail', title: 'Details' },
    { key: 'date', title: 'Last Order' },
]
const BodyHistory = [
    { no: 1, name: 'Ultraman', quantity: 10, purchase: 3000000, date: '2024-04-21', image: bussinessman },
    { no: 2, name: 'Ucok', quantity: 2, purchase: 500000, date: '2024-04-21', image: man1 },
    { no: 3, name: 'Didin Supriyadi', quantity: 5, purchase: 1000000, date: '2024-04-21', image: woman },
    { no: 4, name: 'Dede Wicaksono', quantity: 3, purchase: 900000, date: '2024-04-21', image: man2 },
    { no: 5, name: 'Kamen Rider', quantity: 18, purchase: 5000000, date: '2024-04-21', image: man }
]

const HeadersReportOrderCancel = [
    { key: 'product', title: 'Product' },
    { key: 'quantity', title: 'Quantity (Pcs)' }
]
const BodyReportOrderCancel = [
    { product: 'Nightcream', quantity: 84 },
    { product: 'Dayscream', quantity: 45 },
    { product: 'Sunscreen', quantity: 23 },
    { product: 'Moisturizer', quantity: 71 },
    { product: 'Toner', quantity: 20 }
]
const HeadersReportOrderReturn = [
    { key: 'product', title: 'Product' },
    { key: 'quantity', title: 'Quantity (Pcs)' }
]
const BodyReportOrderReturn = [
    { product: 'Nightcream', quantity: 23 },
    { product: 'Dayscream', quantity: 86 },
    { product: 'Sunscreen', quantity: 51 },
    { product: 'Moisturizer', quantity: 19 },
    { product: 'Toner', quantity: 16 }
]
// end data dummy

// format rupiah
const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}
// end
</script>
<template>
    <ReportLayout title="Order Report">
        <div class="space-y-4">
            <div class="grid grid-cols-3 gap-3">
                <div>
                    <div
                        class="h-28 w-full shadow-lg rounded-lg flex p-5 gap-1 justify-between items-center bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                        <div
                            class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                            <i class="fa-solid fa-box text-4xl"></i>
                        </div>
                        <div class="flex flex-col w-full justify-center py-1">
                            <p class="text-xl font-medium text-center">0</p>
                            <p class="text-lg text-center">Total Order</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        class="h-28 w-full shadow-lg rounded-lg flex p-5 gap-1 justify-between items-center bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                        <div
                            class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                            <i class="fa-solid fa-box text-4xl"></i>
                        </div>
                        <div class="flex flex-col w-full justify-center py-1    ">
                            <p class="text-lg font-medium text-center">0</p>
                            <p class="text-base text-center">Total Invoice</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        class="h-28 w-full shadow-lg rounded-lg flex p-5 gap-1 justify-between items-center bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                        <div
                            class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                            <i class="fa-solid fa-box text-4xl"></i>
                        </div>
                        <div class="flex flex-col w-full justify-center py-1    ">
                            <p class="text-lg font-medium text-center">0</p>
                            <p class="text-base text-center">Paid Invoice</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        class="h-28 w-full shadow-lg rounded-lg flex p-5 gap-1 justify-between items-center bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                        <div
                            class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                            <i class="fa-solid fa-box text-4xl"></i>
                        </div>
                        <div class="flex flex-col w-full justify-center py-1    ">
                            <p class="text-lg font-medium text-center">0</p>
                            <p class="text-base text-center">Unpaid Invoice</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        class="h-28 w-full shadow-lg rounded-lg flex p-5 gap-1 justify-between items-center bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                        <div
                            class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                            <i class="fa-solid fa-box text-4xl"></i>
                        </div>
                        <div class="flex flex-col w-full justify-center py-1    ">
                            <p class="text-lg font-medium text-center">0</p>
                            <p class="text-base text-center">Stock in Shop</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        class="h-28 w-full shadow-lg rounded-lg flex p-5 gap-1 justify-between items-center bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                        <div
                            class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                            <i class="fa-solid fa-box text-4xl"></i>
                        </div>
                        <div class="flex flex-col w-full justify-center py-1    ">
                            <p class="text-lg font-medium text-center">0</p>
                            <p class="text-base text-center">Stock in Warehouse</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-light-primary-1 rounded-lg shadow-lg p-5 dark:bg-dark-primary-2">
                    <div class="px-4 py-4 text-lg font-medium dark:text-typography-1">Order Quantity</div>
                    <div class="space-y-4">
                        <v-data-table :headers="HeadersOrderQuantity" :items="BodyOrderQuantity" hide-default-footer
                            class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                            :header-props="{
                                class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                            }"></v-data-table>
                        <v-pagination v-model="pageUser" :length="pageCount"
                            class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                            :total-visible="5">
                        </v-pagination>
                    </div>
                </div>
                <div class="bg-light-primary-1 rounded-lg shadow-lg p-5 dark:bg-dark-primary-2">
                    <div class="px-4 py-4 text-lg font-medium dark:text-typography-1">Order Payment Status</div>
                    <div class="space-y-4">
                        <v-data-table :headers="HeadersOrderPaymentStatus" :items="BodyOrderPaymentStatus"
                            hide-default-footer
                            class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                            :header-props="{
                                class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                            }">
                            <template v-slot:[`item.status`]="{ item }">
                                <div :class="{ 'bg-[#ffa755]': item.status === 'Unpaid' }"
                                    :style="item.status === 'Paid' ? 'background: linear-gradient(to right, rgb(127, 0, 255), rgb(225, 0, 255));' : ''"
                                    class="rounded-full text-center text-xs py-1 px-3 items-center inline-flex text-typography-1 font-medium">
                                    {{ item.status }}</div>
                            </template>
                        </v-data-table>
                        <v-pagination v-model="pageUser" :length="pageCount"
                            class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                            :total-visible="5">
                        </v-pagination>
                    </div>
                </div>
            </div>
            <div class="bg-light-primary-1 rounded-lg shadow-lg dark:bg-dark-primary-2 p-5">
                <div class="px-4 py-4 text-lg font-medium dark:text-typography-1">Delivery Order Report</div>
                <div class="space-y-4">
                    <v-data-table :headers="HeadersDeliveryOrderReport" :items="BodyDeliveryOrderReport"
                        hide-default-footer
                        class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }">
                        <template v-slot:[`item.status`]="{ item }">
                            <div class="rounded-full text-center text-xs py-1 px-3 items-center inline-flex text-typography-1 font-medium"
                                :class="{
                                    'bg-[#6610F2]': item.status === 'Packing',
                                    'bg-[#709fba]': item.status === 'Return'
                                }" :style="item.status === 'Delivered' || item.status === 'Delivering'
                                    ? 'background: linear-gradient(to right, rgb(127, 0, 255), rgb(225, 0, 255));'
                                    : ''">
                                {{
                                    item.status }}</div>
                        </template>
                    </v-data-table>
                    <v-pagination v-model="pageUser" :length="pageCount"
                        class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
            <div class="bg-light-primary-1 p-5 space-y-3 rounded-lg dark:bg-dark-primary-2 shadow-lg">
                <div class="text-lg font-medium dark:text-typography-1">History</div>
                <div class="flex gap-6">
                    <div class="space-y-1">
                        <p class="text-base text-typography-2">Sort by:</p>
                        <select name="" id=""
                            class="rounded-lg w-36 text-sm border dark:bg-dark-primary-2 dark:text-typography-1 dark:border-typography-2">
                            <option value="">All Time</option>
                            <option value="">Daily</option>
                            <option value="">Weekly</option>
                            <option value="">Monthly</option>
                            <option value="">Yearly</option>
                        </select>
                    </div>
                    <div class="space-y-1">
                        <p class="text-base text-typography-2">Sort by:</p>
                        <select name="" id=""
                            class="rounded-lg w-46 text-sm border dark:bg-dark-primary-2 dark:text-typography-1 dark:border-typography-2">
                            <option value="">Amount (Lowest to Highest)</option>
                            <option value="">Amount (Highest to Lowest)</option>
                            <option value="">Nominal (Lowest to Highest)</option>
                            <option value="">Nominal (Highest to Lowest)</option>
                        </select>
                    </div>
                </div>
                <div class="space-y-4">
                    <v-data-table :headers="HeadersHistory" :items="BodyHistory" hide-default-footer
                        class="border dark:!border-typography-2/20 !rounded-lg !shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }">
                        <template v-slot:[`item.name`]="{ item }">
                            <div class="flex items-center gap-3 h-16">
                                <div><img :src="item.image" alt="Image User" class="rounded-full w-10 h-10"></div>
                                <div>{{ item.name }}</div>
                            </div>
                        </template>
                        <template v-slot:[`item.purchase`]="{ item }">
                            {{ formatCurrency(item.purchase) }}
                        </template>
                        <template v-slot:[`item.detail`]>
                            <div
                                class="bg-[#6610F2] hover:bg-[#510bc4] rounded-2xl inline-flex text-center py-2 px-4 text-typography-1">
                                Details
                            </div>
                        </template>
                        <template v-slot:[`item.date`]="{ item }">
                            <div class="flex items-center gap-5">
                                <div>{{ item.date }}</div>
                                <div><i class="fa-solid fa-messages"></i></div>
                            </div>
                        </template>
                    </v-data-table>
                    <v-pagination v-model="pageUser" :length="pageCount"
                        class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-light-primary-1 rounded-lg shadow-lg p-5 dark:bg-dark-primary-2">
                    <div class="px-4 py-4 text-lg font-medium dark:text-typography-1">Report Order Cancel</div>
                    <div class="space-y-4">
                        <v-data-table :headers="HeadersReportOrderCancel" :items="BodyReportOrderCancel"
                            hide-default-footer
                            class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                            :header-props="{
                                class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                            }"></v-data-table>
                        <v-pagination v-model="pageUser" :length="pageCount"
                            class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                            :total-visible="5">
                        </v-pagination>
                    </div>
                </div>
                <div class="bg-light-primary-1 rounded-lg shadow-lg p-5 dark:bg-dark-primary-2">
                    <div class="px-4 py-4 text-lg font-medium dark:text-typography-1">Report Order Return</div>
                    <div class="space-y-4">
                        <v-data-table :headers="HeadersReportOrderReturn" :items="BodyReportOrderReturn"
                            hide-default-footer
                            class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                            :header-props="{
                                class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                            }"></v-data-table>
                        <v-pagination v-model="pageUser" :length="pageCount"
                            class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                            :total-visible="5">
                        </v-pagination>
                    </div>
                </div>
            </div>
        </div>
    </ReportLayout>
</template>