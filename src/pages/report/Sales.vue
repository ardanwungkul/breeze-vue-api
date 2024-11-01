<script setup>
import ReportLayout from '@/layouts/ReportLayout.vue';
import Maps from '@/components/Report/Maps.vue';
import Chart_Revenue_Profit from '@/components/Report/Chart_Revenue_Profit.vue';
import Table_UserPayment from '@/components/Report/Table_UserPayment.vue';
import { ref } from 'vue'
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
// Data untuk chart
const chartData = ref({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Revenue',
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: [0, 20, 40, 50, 60, 70, 80, 82, 87, 92, 95, 99],
            fill: true,
        },
        {
            label: 'Profit',
            borderColor: '#6EC207',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: [16, 20, 29, 35, 42, 56, 67, 70, 75, 81, 92, 99],
            fill: true,
        },
        {
            label: 'Expense',
            borderColor: '#FF004D',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: [46, 10, 19, 24, 30, 40, 2, 60, 43, 88, 90, 100],
            fill: true,
        },
    ],
});

// Opsi chart dasar
const chartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
};

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

// data dummy
const HeaderSalesData = [
    { key: "name", title: "Product Name" },
    { key: "date", title: "Date" },
    { key: "quantity", title: "Quantity" },
    { key: "revenue", title: "Revenue" },
]
const BodySalesData = [
    { name: "Day Cream", date: "2024-04-21", quantity: 3200, revenue: 360000000 },
    { name: "Night Cream", date: "2024-04-22", quantity: 2800, revenue: 320000000 },
    { name: "Toner", date: "2024-04-22", quantity: 4000, revenue: 500000000 },
]

const HeaderSalesDataAgent = [
    { key: 'agent_name', title: 'Agent Name' },
    { key: 'product_name', title: 'Product Name' },
    { key: 'sold', title: 'Sold' }
]
const BodySalesDataAgent = [
    { agent_name: 'Beuaty shop', product_name: 'Day Cream', sold: '2900' },
    { agent_name: 'Girly shop', product_name: 'Night Cream', sold: '1000' },
    { agent_name: 'Glow beauty shop', product_name: 'Sunscreen', sold: '3200' }
]
// end data dummy
</script>
<template>
    <ReportLayout title="Sales Report">
        <div class="space-y-4 w-full">
            <div class="w-full shadow-lg dark:bg-dark-primary-2 border bg-light-primary-1 px-8 rounded-lg">
                <Maps />
            </div>
            <div class="bg-light-primary-1 p-5 dark:bg-dark-primary-2 rounded-lg shadow-lg">
                <Table_UserPayment />
            </div>
            <div class="bg-light-primary-1 p-5 space-y-3 rounded-lg dark:bg-dark-primary-2 shadow-lg">
                <Chart_Revenue_Profit />
            </div>
            <div class="bg-light-primary-1 p-5 space-y-3 rounded-lg dark:bg-dark-primary-2 shadow-lg">
                <div class="flex justify-between items-center">
                    <div class="text-2xl dark:text-typography-1">Report By Kategori</div>
                    <div>
                        <select name="" id=""
                            class="rounded-lg border dark:bg-dark-primary-2 dark:border-typography-2 dark:text-typography-1">
                            <option value="">All</option>
                            <option value="">Kategori-1</option>
                            <option value="">Kategori-2</option>
                            <option value="">Kategori-3</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Total Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Average Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Maksimum Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Minimum Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Total Expense</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Total Profit</div>
                        <p class="text-center">0</p>
                    </div>
                </div>
                <Line :data="chartData" :options="chartOptions" />
            </div>
            <div class="bg-light-primary-1 p-5 space-y-3 rounded-lg dark:bg-dark-primary-2 shadow-lg">
                <div class="flex justify-between items-center">
                    <div class="text-2xl dark:text-typography-1">Report By Regional</div>
                    <div>
                        <select name="" id=""
                            class="rounded-lg border dark:bg-dark-primary-2 dark:border-typography-2 dark:text-typography-1">
                            <option value="">All</option>
                            <option value="">Regional-1</option>
                            <option value="">Regional-2</option>
                            <option value="">Regional-3</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Total Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Average Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Maksimum Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Minimum Revenue</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Total Expense</div>
                        <p class="text-center">0</p>
                    </div>
                    <div
                        class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-2 dark:text-typography-1">
                        <div class="text-center">Total Profit</div>
                        <p class="text-center">0</p>
                    </div>
                </div>
                <Line :data="chartData" :options="chartOptions" />
            </div>
            <div class="bg-light-primary-1 p-5 space-y-3 rounded-lg dark:bg-dark-primary-2 shadow-lg">
                <div class="text-xl dark:text-typography-1">Sales Data</div>
                <div class="flex gap-6">
                    <div class="space-y-1">
                        <p class="text-base text-typography-2 dark:text-typography-1">filter by: Time</p>
                        <select name="" id=""
                            class="rounded-lg w-36 text-sm border dark:bg-dark-primary-2 dark:text-typography-1 dark:border-typography-2">
                            <option value="">Weekly</option>
                            <option value="">Monthly</option>
                            <option value="">Yearly</option>
                        </select>
                    </div>
                    <div class="space-y-1">
                        <p class="text-base text-typography-2 dark:text-typography-1">filter by: Product</p>
                        <select name="" id=""
                            class="rounded-lg w-36 text-sm border dark:bg-dark-primary-2 dark:text-typography-1 dark:border-typography-2">
                            <option value="">All</option>
                            <option value="">Day Cream</option>
                            <option value="">Night Cream</option>
                            <option value="">Toner</option>
                        </select>
                    </div>
                </div>
                <div class="space-y-4">
                    <v-data-table :headers="HeaderSalesData" :items="BodySalesData" hide-default-footer
                        class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }">
                        <template v-slot:[`item.revenue`]="{ item }">
                            {{ formatCurrency(item.revenue) }}
                        </template>
                    </v-data-table>
                    <v-pagination v-model="pageUser" :length="pageCount"
                        class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
            <div class="bg-light-primary-1 p-5 space-y-3 rounded-lg dark:bg-dark-primary-2 shadow-lg">
                <div class="text-xl dark:text-typography-1">Sales Data Agent</div>
                <div class="flex gap-6">
                    <div class="space-y-1">
                        <p class="text-base text-typography-2 dark:text-typography-1">filter by: Time</p>
                        <select name="" id=""
                            class="rounded-lg w-36 text-sm border dark:bg-dark-primary-2 dark:text-typography-1 dark:border-typography-2">
                            <option value="">Weekly</option>
                            <option value="">Monthly</option>
                            <option value="">Yearly</option>
                        </select>
                    </div>
                    <div class="space-y-1">
                        <p class="text-base text-typography-2 dark:text-typography-1">filter by: Agent</p>
                        <select name="" id=""
                            class="rounded-lg w-36 text-sm border dark:bg-dark-primary-2 dark:text-typography-1 dark:border-typography-2">
                            <option value="">Beuaty shop</option>
                            <option value="">Girly shop</option>
                            <option value="">Glow beauty shop</option>
                        </select>
                    </div>
                </div>
                <div class="space-y-4">
                    <v-data-table :headers="HeaderSalesDataAgent" :items="BodySalesDataAgent" hide-default-footer
                        class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                        :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }">
                    </v-data-table>
                    <v-pagination v-model="pageUser" :length="pageCount"
                        class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
            <div class="bg-gradient py-11 rounded-xl">
                <div class="text-center space-y-1 text-typography-1">
                    <div class=""><i class="fa-solid fa-wallet text-5xl"></i></div>
                    <div class="text-2xl font-medium">Total Expenses</div>
                    <p class="text-sm font-normal">View and manage your expenses easily</p>
                    <div class="text-3xl font-medium">Rp 10,000,000</div>
                </div>
            </div>
        </div>
    </ReportLayout>
</template>
<style>
.bg-gradient {
    background: linear-gradient(to right, rgb(127, 0, 255), rgb(225, 0, 255));
}

.province {
    fill: #ccc;
    stroke: #333;
    stroke-width: 1;
}

.tooltip {
    position: fixed;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    transform: translate(-50%, -100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: opacity 0.3s ease;
}

/* Segitiga untuk penjorokan */
.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: calc(50% - 8px);
    border-width: 8px;
    border-style: solid;
    border-color: white transparent transparent transparent;
}
</style>