<script setup>
import ReportLayout from '@/layouts/ReportLayout.vue';
import TableStokInWarehouse from '@/components/Report/TableStokInWarehouse.vue';
// data dummy
const products = [
    { product: 'Nightcream', stock: 150, sold: 2400 },
    { product: 'Daycream', stock: 1001, sold: 2400 },
    { product: 'Sunscreen', stock: 170, sold: 23400 },
    { product: 'Moisturizer', stock: 1000, sold: 2400 },
    { product: 'Toner', stock: 1100, sold: 24300 }
];

const header = [
    { key: 'product', title: 'Product' },
    { key: 'stock', title: 'Stock' },
    { key: 'sold', title: 'Sold' },
]
const headerExpensesDetail = [
    { key: 'date', title: 'Date' },
    { key: 'keterangan', title: 'Information' },
    { key: 'amount', title: 'Amount' },
    { key: 'expense', title: 'Expense Convidence' },
]
const bodyExpensesDetail = [
    { date: '2024-04-01', keterangan: 'Pembuatan botol skincare', amount: 'Rp 8.500,000' },
    { date: '2024-04-02', keterangan: 'Transportasi', amount: 'Rp 150,000' }

]
// end data dummy
</script>
<template>
    <ReportLayout title="Stock Report">
        <div class="space-y-3">
            <div class="grid grid-cols-4 gap-3">
                <div
                    class="h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-box text-3xl"></i>
                    </div>
                    <div class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium">0</p>
                        <p class="text-sm text-center">Total Product</p>
                    </div>
                </div>
                <div
                    class="h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-warehouse text-3xl"></i>
                    </div>
                    <div class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium">0</p>
                        <p class="text-sm text-center">Stock in Warehouse</p>
                    </div>
                </div>
                <div
                    class="h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-shop text-3xl"></i>
                    </div>
                    <div class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium">0</p>
                        <p class="text-sm text-center">Stock in Shop</p>
                    </div>
                </div>
                <div
                    class="h-28 w-full shadow-lg rounded-lg flex items-center px-3 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-user text-3xl"></i>
                    </div>
                    <div class="flex flex-col justify-center items-center w-full">
                        <p class="text-xl font-medium">0</p>
                        <p class="text-sm text-center">Stock in Agent</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <TableStokInWarehouse />
                <div class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 w-full space-y-4 rounded-lg shadow-lg">
                    <div class="flex justify-between items-center">
                        <div class="text-lg dark:text-typography-1">Stok in Shop</div>
                        <select
                            class="rounded-xl border text-sm min-w-40 dark:bg-dark-primary-1 dark:text-typography-1 dark:!border-typography-2">
                            <option value="">All</option>
                            <option value="">Beauty Shopm</option>
                            <option value="">Girl Shop</option>
                            <option value="">Glowing shop</option>
                        </select>
                    </div>
                    <hr class="bg-typography-2 !mb-4">
                    <div class="space-y-4">
                        <v-data-table :headers="header" :items="products" hide-default-footer
                            class="border dark:!border-typography-2/20 !rounded-lg !shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                            :header-props="{
                                class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                            }"></v-data-table>
                        <v-pagination v-model="pageUser" :length="pageCount"
                            class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                            :total-visible="5">
                        </v-pagination>
                    </div>
                </div>
                <div class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 space-y-4 w-full rounded-lg shadow-lg">
                    <div class="flex justify-between items-center">
                        <div class="text-lg dark:text-typography-1">Stok in Agent</div>
                        <select
                            class="rounded-xl border text-sm min-w-40 dark:bg-dark-primary-1 dark:text-typography-1 dark:!border-typography-2">
                            <option value="">Beauty shop</option>
                            <option value="">Girly shop</option>
                            <option value="">Glow shop</option>
                            <option value="">Beautygirl shop</option>
                        </select>
                    </div>
                    <hr class="bg-typography-2 !mb-4">
                    <div class="space-y-4">
                        <v-data-table :headers="header" :items="products" hide-default-footer
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
                <div class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 space-y-4 w-full rounded-lg shadow-lg">
                    <div class="flex justify-between gap-3 items-center">
                        <div class="text-lg dark:text-typography-1 text-wrap">Agent Stock and Purchase</div>
                        <select
                            class="rounded-xl border text-sm min-w-40 dark:bg-dark-primary-1 dark:text-typography-1 dark:!border-typography-2">
                            <option value="">All</option>
                            <option value="">Beauty Shopm</option>
                            <option value="">Girl Shop</option>
                            <option value="">Glowing shop</option>
                        </select>
                    </div>
                    <hr class="bg-typography-2 !mb-4">
                    <div class="space-y-4">
                        <v-data-table :headers="header" :items="products" hide-default-footer
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
            <div class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg shadow-lg space-y-4">
                <div class="border-gray-200">
                    <div class="text-lg dark:text-typography-1">Detailed expenses</div>
                </div>
                <hr class="bg-typography-2 !mb-4">
                <div class="space-y-4">
                    <v-data-table :headers="headerExpensesDetail" :items="bodyExpensesDetail" hide-default-footer
                        class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }">
                        <template v-slot:[`item.expense`]>
                            <div class="flex items-center gap-2">
                                <div
                                    class="py-2 px-4 text-sm bg-[#71d86e] hover:opacity-90 text-typography-1 rounded-full">
                                    View</div>
                                <div
                                    class="py-2 px-4 gap-1 items-center flex text-sm bg-[#ffa755] hover:opacity-90 text-typography-1 rounded-full">
                                    <i class="fa-regular fa-pen-to-square"></i>Edit
                                </div>
                                <div
                                    class="py-2 px-4 text-sm bg-[#6610F2] hover:bg-[#510bc4] text-typography-1 rounded-full">
                                    <i class="fa-solid fa-download"></i>
                                </div>
                            </div>
                        </template>
                    </v-data-table>
                    <v-pagination v-model="pageUser" :length="pageCount"
                        class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
        </div>
    </ReportLayout>
</template>