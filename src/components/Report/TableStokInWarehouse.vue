<script setup>
const props = defineProps({
    product: Array,
})

const headersStokinWarehouse = [
    { key: 'product_name', title: 'Product' },
    { key: 'stock', title: 'Stock' },
    { key: 'sold', title: 'Sold' },
]
</script>
<template>
    <div
        class="space-y-4 bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg shadow-lg">
        <div class="flex justify-between items-center">
            <div class="text-lg dark:text-typography-1">Stok in Warehouse</div>
            <div>
                <select
                    class="rounded-xl border text-sm min-w-40 dark:bg-dark-primary-1 dark:text-typography-1 dark:!border-typography-2">
                    <option value="">Day Cream</option>
                    <option value="">Night Cream</option>
                    <option value="">SunScreen</option>
                </select>
            </div>
        </div>
        <hr class="border-typography-2 !mb-4" />
        <div class="space-y-4">
            <v-data-table
                :headers="headersStokinWarehouse"
                :items="product"
                item-key="id"
                hide-default-footer
                class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }">
                <template v-slot:item.stock="{ item }">
                    <p>
                        {{
                            item.stock.filter(s => {
                                return s.product_stock_status == 'warehouse'
                            }).length
                        }}
                    </p>
                </template>

                <template v-slot:item.sold="{ item }">
                    <p>
                        {{
                            item.stock.filter(s => {
                                return s.product_stock_status == 'delivered'
                            }).length
                        }}
                    </p>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageUser"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
