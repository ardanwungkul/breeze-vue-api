<script setup>
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Chart
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
// data untuk chart
const chartData = ref({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Revenue',
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: [0, 20, 40, 50, 60, 70, 80, 82, 89, 90, 95, 60],
            fill: true,
        },
        {
            label: 'Expense',
            borderColor: '#FF004D',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: [46, 10, 19, 24, 30, 40, 30, 60, 43, 88, 90, 100],
            fill: true,
        },
        {
            label: 'Profit',
            borderColor: '#6EC207',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: [16, 20, 29, 35, 42, 56, 67, 70, 75, 81, 92, 99],
            fill: true,
        },
    ],
});
// end Chart

</script>
<template>
    <div class="bg-light-primary-1 p-5 space-y-3 rounded-lg dark:bg-dark-primary-2 shadow-lg">
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <div class="text-xl dark:text-typography-1">Revenue and Profit Report</div>
                <div>
                    <select name="" id=""
                        class="rounded-xl text-sm border dark:bg-dark-primary-1 min-w-40 dark:border-typography-2 dark:text-typography-1">
                        <option value="">All</option>
                        <option value="">Product-1</option>
                        <option value="">Product-2</option>
                        <option value="">Product-3</option>
                    </select>
                </div>
            </div>
            <hr class="bg-typography-2 !mb-4">
            <div class="grid grid-cols-3 gap-3">
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Total Revenue</div>
                    <p class="text-center">0</p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Average Revenue</div>
                    <p class="text-center">0</p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Maksimum Revenue</div>
                    <p class="text-center">0</p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Minimum Revenue</div>
                    <p class="text-center">0</p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Total Expense</div>
                    <p class="text-center">0</p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Total Profit</div>
                    <p class="text-center">0</p>
                </div>
            </div>
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>