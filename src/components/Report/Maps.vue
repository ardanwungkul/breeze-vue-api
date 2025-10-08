<script setup>
import map from '@svg-maps/indonesia'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { ref } from 'vue'

const props = defineProps({
    payment: Array,
})

const matchedProvinces = computed(() => {
    return map.locations
        .map(loc => {
            const p = filteredPayments.value.filter(
                p => p.address.province === loc.name,
            )
            const quantity = p.length
            if (quantity === 0) return null
            return { ...loc, quantity, p }
        })
        .filter(Boolean)
})
const countData = computed(() => {
    return matchedProvinces.value.map(mp => {
        const id = mp.id
        const name = mp.name
        const data = mp.quantity
        const payment = mp.p
        return { id, data, payment, name }
    })
})
const headersTable = [
    { key: 'username', title: 'User Name' },
    { key: 'address_name', title: 'Address Name' },
    { key: 'address', title: 'Address' },
    { key: 'items', title: 'Items' },
    { key: 'date', title: 'Date' },
]

const hoveredCityCount = ref(null)
const clickedCityData = ref([])
const tooltipX = ref(0)
const tooltipY = ref(0)
function handleCityClick(location) {
    clickedCityData.value = countData.value.filter(cd => {
        return cd.id === location
    })
}
function handleCityHover(event, location) {
    const cityData = countData.value.find(item => item.id === location.id)
    hoveredCityCount.value = cityData
        ? location.name + ' : ' + cityData.data
        : location.name + ' : ' + '0'
    tooltipX.value = event.clientX
    tooltipY.value = event.clientY - 20
}

function hideCityCount(event) {
    hoveredCityCount.value = null
    const element = event.target
    element.classList.remove('hovered')
}

function handleEsc(event) {
    if (event.key === 'Escape') {
        clickedCityData.value = []
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleEsc)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEsc)
})

const filterData = ref('current')
const filterDate = ref('')
const filterWeek = ref('')
const filterMonth = ref('')
const filterYear = ref('')

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
    return weekNo
}

const filteredPayments = computed(() => {
    const today = new Date()

    if (filterData.value === 'weekly') {
        if (!filterWeek.value) return []
        const [year, week] = filterWeek.value.split('-W')
        return props.payment.filter(p => {
            const date = new Date(p.created_at)
            const paymentWeek = getWeekNumber(date)
            return (
                date.getFullYear() === parseInt(year) &&
                paymentWeek === parseInt(week)
            )
        })
    }

    if (filterData.value === 'monthly') {
        if (!filterMonth.value) return []
        const [year, month] = filterMonth.value.split('-')
        return props.payment.filter(p => {
            const d = new Date(p.created_at)
            return (
                d.getFullYear() === parseInt(year) &&
                d.getMonth() + 1 === parseInt(month)
            )
        })
    }

    if (filterData.value === 'yearly') {
        if (!filterYear.value) return []
        return props.payment.filter(p => {
            const d = new Date(p.created_at)
            return d.getFullYear() === parseInt(filterYear.value)
        })
    }

    if (filterData.value === 'byDate') {
        if (!filterDate.value) return []
        return props.payment.filter(p => {
            const d = new Date(p.created_at).toISOString().split('T')[0]
            return d === filterDate.value
        })
    }

    return props.payment
})

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>
<template>
    <div class="text-white">
        <!-- {{ countData }} -->
    </div>
    <div
        class="w-full shadow-lg dark:bg-dark-primary-2 border dark:!border-typography-2 bg-light-primary-1 px-8 rounded-lg">
        <div class="relative">
            <div class="absolute top-3 right-3">
                <div class="flex gap-3 items-center">
                    <select
                        v-model="filterData"
                        class="!text-sm dark:bg-dark-primary-1 dark:text-white rounded-lg border dark:border-typography-2">
                        <option value="current">Current</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="byDate">by Date</option>
                    </select>
                    <!-- Input mingguan -->
                    <input
                        v-if="filterData === 'weekly'"
                        v-model="filterWeek"
                        type="week"
                        class="!text-sm dark:bg-dark-primary-1 dark:text-white rounded-lg border dark:border-typography-2" />

                    <!-- Input bulanan -->
                    <input
                        v-if="filterData === 'monthly'"
                        v-model="filterMonth"
                        type="month"
                        class="!text-sm dark:bg-dark-primary-1 dark:text-white rounded-lg border dark:border-typography-2" />

                    <!-- Input tahunan -->
                    <input
                        v-if="filterData === 'yearly'"
                        v-model="filterYear"
                        type="number"
                        min="2000"
                        max="2100"
                        placeholder="Enter year"
                        class="!text-sm w-28 dark:bg-dark-primary-1 dark:text-white rounded-lg border dark:border-typography-2" />

                    <!-- Input tanggal -->
                    <input
                        v-if="filterData === 'byDate'"
                        v-model="filterDate"
                        type="date"
                        class="!text-sm dark:bg-dark-primary-1 dark:text-white rounded-lg border dark:border-typography-2" />
                </div>
            </div>

            <div
                v-if="
                    map.locations.filter(loc =>
                        countData.some(cd => cd.id === loc.id),
                    ).length > 0
                "
                class="absolute bottom-3 left-0 z-20">
                <v-expansion-panels>
                    <v-expansion-panel
                        class="!w-80 !bg-transparent !border-none !shadow-none">
                        <v-expansion-panel-title
                            class="!bg-dark-primary-1 !px-3 !py-1 !rounded-lg dark:text-white !min-h-10">
                            Summary Revenue
                        </v-expansion-panel-title>

                        <v-expansion-panel-text
                            class="!bg-dark-primary-1 !px-1 !py-1 rounded-lg !w-80 max-h-96 overflow-y-scroll invisible-scrollbar mt-3">
                            <div>
                                <div
                                    v-for="location in map.locations
                                        .filter(loc =>
                                            countData.some(
                                                cd => cd.id === loc.id,
                                            ),
                                        )
                                        .sort((a, b) => {
                                            const aCount =
                                                countData.find(
                                                    cd => cd.id === a.id,
                                                )?.payment.length || 0
                                            const bCount =
                                                countData.find(
                                                    cd => cd.id === b.id,
                                                )?.payment.length || 0
                                            return bCount - aCount
                                        })"
                                    :id="location.id"
                                    :key="location.id">
                                    <div
                                        class="text-white grid grid-cols-3 gap-3 w-full cursor-pointer hover:bg-dark-primary-2 rounded-lg text-sm px-3 py-1"
                                        @click="handleCityClick(location.id)">
                                        <p>
                                            {{
                                                countData.find(
                                                    item =>
                                                        item.id === location.id,
                                                )?.name
                                            }}
                                        </p>
                                        <p class="text-center">
                                            {{
                                                countData.find(
                                                    item =>
                                                        item.id === location.id,
                                                )?.payment.length
                                            }}
                                        </p>
                                        <p class="text-end text-green-500">
                                            Rp.
                                            {{
                                                formatPrice(
                                                    countData
                                                        .find(
                                                            item =>
                                                                item.id ===
                                                                location.id,
                                                        )
                                                        ?.payment?.reduce(
                                                            (total, item) =>
                                                                Number(total) +
                                                                Number(
                                                                    item.amount,
                                                                ),
                                                            0,
                                                        ) || 0,
                                                )
                                            }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <svg width="100%" height="400" viewBox="0 29 793 288">
                <path
                    v-for="location in map.locations"
                    :id="location.id"
                    :key="location.id"
                    :d="location.path"
                    class="province"
                    :class="
                        countData.some(ids => ids.id === location.id)
                            ? '!fill-green-500'
                            : ''
                    "
                    @click="handleCityClick(location.id)"
                    @mouseover="handleCityHover($event, location)"
                    @mouseleave="hideCityCount" />
            </svg>
        </div>
        <div
            v-if="hoveredCityCount"
            class="tooltip"
            :style="{ top: `${tooltipY}px`, left: `${tooltipX}px` }">
            {{ hoveredCityCount }} Order
        </div>

        <div
            v-if="clickedCityData.length > 0"
            class="fixed w-full h-screen top-0 left-0 z-[99999] px-20 py-10 bg-black/30">
            <div
                class="bg-white dark:bg-dark-primary-2 h-full rounded-xl p-5 flex flex-col gap-5 border dark:border-white">
                <div class="flex justify-between items-center">
                    <p class="text-xl font-semibold dark:text-white">
                        {{ clickedCityData[0].name }}
                    </p>
                    <button
                        class="w-10 h-10 rounded-lg hover:bg-ezzora-100 bg-ezzora-50"
                        type="button"
                        @click="clickedCityData = []">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>
                <div class="flex-1 overflow-y-auto invisible-scrollbar">
                    <div class="flex flex-col gap-5 rounded-lg">
                        <v-data-table
                            :headers="headersTable"
                            :items="clickedCityData[0].payment"
                            hide-default-footer
                            :header-props="{
                                class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                            }"
                            item-key="id"
                            class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                            <template #[`item.username`]="{ item }">
                                <div class="">
                                    {{ item.user.name }}
                                </div>
                            </template>
                            <template #[`item.address_name`]="{ item }">
                                <div class="">
                                    <p>
                                        {{ item.address.name }}
                                    </p>
                                </div>
                            </template>
                            <template #[`item.address`]="{ item }">
                                <div class="py-1">
                                    <p>
                                        {{ item.address.phone_number }}
                                    </p>
                                    <p>
                                        {{ item.address?.detail }},
                                        {{ item.address?.subdistrict }},
                                        {{ item.address?.city }},
                                        {{ item.address?.province }},
                                        {{ item.address?.post_code }}
                                    </p>
                                </div>
                            </template>
                            <template #[`item.items`]="{ item }">
                                <div class="py-1">
                                    <div
                                        v-for="(items, i) in item.items.filter(
                                            it => {
                                                return it.product_id !== null
                                            },
                                        )"
                                        :key="i">
                                        <p class="line-clamp-2">
                                            {{ items.name }}
                                        </p>
                                    </div>
                                </div>
                            </template>
                            <template #[`item.date`]="{ item }">
                                <div class="py-1">
                                    <p>{{ item.created_at }}</p>
                                </div>
                            </template>
                        </v-data-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.province {
    fill: #ccc;
    stroke: #333;
    stroke-width: 1;
}

.province.hovered {
    fill: green;
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
.v-expansion-panel-text__wrapper {
    padding: 0;
}
</style>
