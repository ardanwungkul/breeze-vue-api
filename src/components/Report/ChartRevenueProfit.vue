<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
)

const props = defineProps({
    expense: Array,
    payment: Array,
})

// Reactive monthly arrays
const monthlyExpense = ref(Array(12).fill(0))
const monthlyRevenue = ref(Array(12).fill(0))

// Revenue filter
const revenue = computed(() =>
    props.payment.filter(p => p.status_proccess === 'DELIVERED'),
)

// Compute initial values
function calculateMonthlyValues() {
    // Reset all
    monthlyExpense.value = Array(12).fill(0)
    monthlyRevenue.value = Array(12).fill(0)

    props.expense.forEach(item => {
        const month = new Date(item.expense_date).getMonth()
        monthlyExpense.value[month] += Number(item.expense_cost)
    })

    revenue.value.forEach(item => {
        const month = new Date(item.created_at).getMonth()
        monthlyRevenue.value[month] += Number(item.amount)
    })

    updateChart()
}

// Statistik revenue
const totalRevenue = computed(() =>
    revenue.value.reduce((sum, item) => sum + Number(item.amount), 0),
)
const averageRevenue = computed(() =>
    revenue.value.length ? totalRevenue.value / revenue.value.length : 0,
)
const minRevenue = computed(() =>
    revenue.value.length
        ? Math.min(...revenue.value.map(p => Number(p.amount)))
        : 0,
)
const maxRevenue = computed(() =>
    revenue.value.length
        ? Math.max(...revenue.value.map(p => Number(p.amount)))
        : 0,
)

const totalExpense = computed(() =>
    props.expense.reduce((sum, item) => sum + Number(item.expense_cost), 0),
)

const totalProfit = computed(() => totalRevenue.value - totalExpense.value)

// Chart data reactive
const chartData = ref({
    labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    datasets: [],
})

const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return (
                        context.dataset.label +
                        ': Rp ' +
                        context.parsed.y.toLocaleString('id-ID')
                    )
                },
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function (value) {
                    return 'Rp ' + value.toLocaleString('id-ID')
                },
            },
        },
    },
})

// Update chart when values change
function updateChart() {
    chartData.value.datasets = [
        {
            label: 'Expense',
            data: monthlyExpense.value,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
        },
        {
            label: 'Revenue',
            data: monthlyRevenue.value,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
        },
    ]
}

function formatPrice(price) {
    return Number(price || 0).toLocaleString('id-ID')
}

watchEffect(() => {
    if (props.expense.length && props.payment.length) {
        calculateMonthlyValues()
    }
})
</script>

<template>
    <div
        class="bg-light-primary-1 p-5 space-y-3 rounded-lg dark:bg-dark-primary-2 shadow-lg">
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <div class="text-xl dark:text-typography-1">
                    Revenue and Profit Report
                </div>
                <div>
                    <select
                        class="rounded-xl text-sm border dark:bg-dark-primary-1 min-w-40 dark:border-typography-2 dark:text-typography-1">
                        <option value="">All</option>
                        <option value="">Product-1</option>
                        <option value="">Product-2</option>
                        <option value="">Product-3</option>
                    </select>
                </div>
            </div>
            <hr class="border-typography-2 !mb-4" />
            <div class="grid grid-cols-3 gap-3">
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Total Revenue</div>
                    <p class="text-center">
                        Rp. {{ formatPrice(totalRevenue) }}
                    </p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Average Revenue</div>
                    <p class="text-center">
                        Rp. {{ formatPrice(averageRevenue) }}
                    </p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Maksimum Revenue</div>
                    <p class="text-center">Rp. {{ formatPrice(maxRevenue) }}</p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Minimum Revenue</div>
                    <p class="text-center">Rp. {{ formatPrice(minRevenue) }}</p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Total Expense</div>
                    <p class="text-center">
                        Rp.
                        {{
                            formatPrice(
                                expense.reduce(
                                    (sum, item) => sum + item.expense_cost,
                                    0,
                                ),
                            )
                        }}
                    </p>
                </div>
                <div
                    class="bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1">
                    <div class="text-center">Total Profit</div>
                    <p class="text-center">
                        Rp. {{ formatPrice(totalProfit) }}
                    </p>
                </div>
            </div>
            <Line
                v-if="chartData?.datasets?.length"
                :data="chartData"
                :options="chartOptions" />
        </div>
    </div>
</template>
