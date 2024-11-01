<script setup>
import ReportLayout from '@/layouts/ReportLayout.vue'
import Maps from '@/components/Report/Maps.vue';
import Chart from '@/components/Report/ChartRevenueProfit.vue';
import TableStokInWarehouse from '@/components/Report/TableStokInWarehouse.vue';
import TableUserPayment from '@/components/Report/TableUserPayment.vue';
import { ref } from 'vue';

</script>
<template>
    <ReportLayout title="Dashboard">
        <div class="space-y-4 w-full">
            <div class="grid grid-cols-4 gap-3">
                <div
                    class="h-36 w-full shadow-lg rounded-lg flex-col flex p-4 gap-1 justify-between items-center bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-warehouse text-3xl"></i>
                    </div>
                    <div class="flex flex-col w-full justify-center py-1    ">
                        <p class="text-sm text-center">Stock in Warehouse</p>
                        <p class="text-xl font-medium text-center">0</p>
                    </div>
                </div>
                <div
                    class="h-36 w-full shadow-lg rounded-lg p-4 space-y-2 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div class="flex flex-col justify-center w-full">
                        <p class="text-sm">Sales</p>
                        <p class="text-xl font-medium">0</p>
                    </div>
                    <div class="flex flex-col justify-center w-full">
                        <p class="text-sm">Purchase</p>
                        <p class="text-xl font-medium">0</p>
                    </div>
                </div>
                <div
                    class="h-36 w-full shadow-lg rounded-lg p-4 space-y-2 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div class="flex flex-col justify-center w-full">
                        <p class="text-sm">Revenue</p>
                        <p class="text-xl font-medium">0</p>
                    </div>
                    <div class="flex flex-col justify-center w-full">
                        <p class="text-sm">Profit</p>
                        <p class="text-xl font-medium">0</p>
                    </div>
                </div>
                <div
                    class="h-36 w-full shadow-lg rounded-lg flex flex-col items-center p-4 gap-3 justify-between bg-light-primary-1 dark:bg-dark-primary-2 dark:text-typography-1 border dark:!border-typography-2 cursor-pointer">
                    <div
                        class="dark:bg-light-primary-1 bg-light-primary-2 text-typography-2 rounded-full p-3 w-14 h-14 flex-none flex items-center justify-center">
                        <i class="fa-solid fa-wallet text-4xl"></i>
                    </div>
                    <div class="flex flex-col justify-center items-center w-full">
                        <p class="text-sm text-center">Expenses</p>
                        <p class="text-xl font-medium">0</p>
                    </div>
                </div>
            </div>
            <Maps />
            <Chart />
            <TableStokInWarehouse />
            <TableUserPayment />
        </div>
    </ReportLayout>
</template>
