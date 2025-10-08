<script setup>
import { ref, computed } from 'vue'
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
    payment: Array,
})

const incomeByCategory = computed(() => {
    const map = new Map()

    props.payment.forEach(paymentItem => {
        if (Array.isArray(paymentItem.items)) {
            paymentItem.items.forEach(item => {
                if (item.product && Array.isArray(item.product.subcategory)) {
                    const price =
                        item.product.product_price * item.quantity || 0

                    item.product.subcategory.forEach(subcat => {
                        const category = subcat.sub_category_name

                        if (!map.has(category)) {
                            map.set(category, 0)
                        }

                        map.set(category, map.get(category) + price)
                    })
                }
            })
        }
    })

    return Array.from(map, ([category, total]) => ({ category, total }))
})

// Statistik Revenue
const totalRevenue = computed(() =>
    incomeByCategory.value.reduce((sum, cat) => sum + cat.total, 0),
)

const averageRevenue = computed(() =>
    incomeByCategory.value.length
        ? (totalRevenue.value / incomeByCategory.value.length).toFixed(2)
        : 0,
)

const maxRevenue = computed(() =>
    incomeByCategory.value.length
        ? Math.max(...incomeByCategory.value.map(cat => cat.total))
        : 0,
)

const minRevenue = computed(() =>
    incomeByCategory.value.length
        ? Math.min(...incomeByCategory.value.map(cat => cat.total))
        : 0,
)

const chartData = computed(() => {
    if (!incomeByCategory.value || incomeByCategory.value.length === 0) {
        return {
            labels: [],
            datasets: [],
        }
    }

    const labels = incomeByCategory.value.map(cat => cat.category)
    const data = incomeByCategory.value.map(cat => cat.total)

    return {
        labels,
        datasets: [
            {
                label: 'Revenue',
                borderColor: '#42A5F5',
                backgroundColor: 'rgba(66, 165, 245, 0.2)',
                data,
                fill: true,
            },
        ],
    }
})

const chartOptions = {
    responsive: true,
}
</script>
<template>
    <div
        class="bg-light-primary-1 p-5 space-y-4 rounded-lg dark:bg-dark-primary-2 shadow-lg">
        <div class="flex justify-between items-center">
            <div class="text-xl dark:text-typography-1">
                Revenue By Category
            </div>
            <div>
                <select
                    class="rounded-xl border text-sm dark:bg-dark-primary-1 min-w-40 dark:border-typography-2 dark:text-typography-1">
                    <option value="">All</option>
                    <option
                        v-for="(cat, index) in incomeByCategory"
                        :key="index"
                        :value="cat.category">
                        {{ cat.category }}
                    </option>
                </select>
            </div>
        </div>

        <hr class="border-typography-2 !mb-4" />

        <div class="grid grid-cols-3 gap-3">
            <div class="card-stat">
                <div class="text-center">Total Revenue</div>
                <p class="text-center">
                    Rp {{ totalRevenue.toLocaleString() }}
                </p>
            </div>
            <div class="card-stat">
                <div class="text-center">Average Revenue</div>
                <p class="text-center">
                    Rp {{ Number(averageRevenue).toLocaleString() }}
                </p>
            </div>
            <div class="card-stat">
                <div class="text-center">Maksimum Revenue</div>
                <p class="text-center">Rp {{ maxRevenue.toLocaleString() }}</p>
            </div>
            <div class="card-stat">
                <div class="text-center">Minimum Revenue</div>
                <p class="text-center">Rp {{ minRevenue.toLocaleString() }}</p>
            </div>
            <div class="card-stat">
                <div class="text-center">Total Expense</div>
                <p class="text-center">-</p>
            </div>
            <div class="card-stat">
                <div class="text-center">Total Profit</div>
                <p class="text-center">-</p>
            </div>
        </div>

        <Line
            v-if="chartData && chartData.labels.length"
            :data="chartData"
            :options="chartOptions" />
    </div>
</template>

<style scoped>
.card-stat {
    @apply bg-light-primary-1 shadow-lg border border-typography-2 rounded-lg p-2 dark:bg-dark-primary-1 dark:text-typography-1;
}
</style>
