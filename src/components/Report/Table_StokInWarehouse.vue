<script setup>

// data dummy
const headersStokinWarehouse = [
    { key: 'product', title: 'Product' },
    { key: 'stock', title: 'Stock' },
    { key: 'sold', title: 'Sold' },
]
const BodyStokInWarehouse = [
    { product: 'Nightcream', stock: 150, sold: 2400 },
    { product: 'Daycream', stock: 1001, sold: 2400 },
    { product: 'Sunscreen', stock: 170, sold: 23400 },
    { product: 'Moisturizer', stock: 1000, sold: 2400 },
    { product: 'Toner', stock: 1100, sold: 24300 }
];
// end data dummy
</script>
<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <div class="text-lg dark:text-typography-1">Stok in Warehouse</div>
            <div>
                <!-- <div class="dark:text-typography-1 text-base">Filter by:</div> -->
                <select name="" id=""
                    class="rounded-xl border text-sm w-72 dark:bg-dark-primary-2 dark:text-typography-1 dark:!border-typography-2">
                    <option value="">Day Cream</option>
                    <option value="">Night Cream</option>
                    <option value="">SunScreen</option>
                </select>
            </div>
        </div>
        <div class="space-y-4">
            <v-data-table :headers="headersStokinWarehouse" :items="BodyStokInWarehouse" hide-default-footer
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
</template>