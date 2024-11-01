<script setup>
import { ref, watchEffect, provide, onBeforeMount } from 'vue'
import Navigation from '@/components/ReportNavigation.vue'
import { useUsers } from '@/stores/user'

const store = useUsers()
const IsSelectedDate = ref('date')
const props = defineProps({
    title: String,
})

onBeforeMount(() => {
    if (!store.hasUserData) {
        store.getData()
    }
})
const isDark = ref(localStorage.getItem('isDark') === 'true')
watchEffect(() => {
    localStorage.setItem('isDark', isDark.value)
})

const toggleDarkMode = () => {
    isDark.value = !isDark.value
}
const rail = ref(false)
provide('rail', rail)
const currentDate = new Date();
const startOfYear = new Date(currentDate.getFullYear(), 0, 1); // 1 Januari tahun ini
const daysSinceStartOfYear = Math.floor((currentDate - startOfYear) / (24 * 60 * 60 * 1000));
const currentWeek = Math.ceil((daysSinceStartOfYear + startOfYear.getDay() + 1) / 7);
const IsDate = ref({
    startDateFilter: null,
    endDateFilter: null,
    // weekly: currentWeek.toString(),
    weekly: ["2024-04-01T17:00:00.000Z", "2024-04-08T16:59:59.999Z"]
    ,
    yearly: currentDate.getFullYear().toString(),
    monthly: String(currentDate.getMonth() + 1).padStart(2, '0'),
})
</script>
<template>
    <v-app class="!bg-light-primary-2 dark:!bg-dark-primary-1 font-inter !transition-colors !duration-500"
        :class="isDark ? 'dark' : ''">
        <Navigation />
        <v-main>
            <v-container class="!py-0 !max-w-none">
                <!-- {{ IsDate.weekly }} -->
                <div class="py-5 space-y-3 px-10">
                    <div class="w-full flex justify-between items-center mb-5">
                        <p class="text-2xl font-bold dark:font-medium text-ezzora-900 dark:text-white">
                            {{ title }}
                        </p>
                        <div class="flex gap-10 items-center">
                            <div class="flex justify-center gap-2 items-center">
                                <i class="fa-light fa-sun-bright text-gray-900 dark:text-gray-600"></i>
                                <div id="page">
                                    <input @click="toggleDarkMode" type="checkbox" id="theme-toggle" v-model="isDark" />
                                    <label for="theme-toggle"><span></span></label>
                                </div>
                                <i class="fa-light fa-moon text-gray-300 dark:text-white"></i>
                            </div>
                            <div class="flex gap-3 items-center">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3jfOPCgGScFht2teS6zF4P3_NFVrfe1IhQ&s"
                                    class="rounded-full h-10 border w-10 object-cover" alt="" />
                                <p class="text-sm dark:text-typography-2">
                                    {{ store.userData.name }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                        <div v-if="IsSelectedDate === 'weekly'"
                            class="flex gap-4 items-center w-full shadow-lg rounded-lg">
                            <div class="w-full  !rounded-lg !overflow-hidden">
                                <VueDatePicker v-model="IsDate.weekly" week-picker
                                    :class="isDark ? 'dp__theme_dark' : 'dp_theme_light'" />
                            </div>
                        </div>
                        <div v-if="IsSelectedDate === 'yearly'"
                            class="flex gap-4 items-center w-full shadow-lg rounded-lg">
                            <div class="w-full">
                                <VueDatePicker v-model="IsDate.yearly" year-picker
                                    :class="isDark ? 'dp__theme_dark' : 'dp_theme_light'" />
                            </div>
                        </div>
                        <div v-if="IsSelectedDate === 'monthly'"
                            class="flex gap-4 items-center w-full shadow-lg text-sm rounded-lg">
                            <div class="w-full">
                                <VueDatePicker v-model="IsDate.monthly" month-picker
                                    :class="isDark ? 'dp__theme_dark' : 'dp_theme_light'" />
                            </div>
                        </div>
                        <div v-if="IsSelectedDate === 'date'" class="flex gap-4 items-center w-full rounded-lg">
                            <div class="w-full">
                                <input type="date" v-model="IsDate.startDateFilter"
                                    class="p-2 border rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-typography-1 shadow-lg text-sm w-full" />
                            </div>
                            <p class="text-typography-2">-</p>
                            <div class="w-full">
                                <input type="date" v-model="IsDate.endDateFilter"
                                    class="p-2 border rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-typography-1 shadow-lg text-sm w-full" />
                            </div>
                        </div>
                        <select v-model="IsSelectedDate"
                            class="p-2 !border-solid rounded-lg dark:bg-dark-primary-2 dark:!border-typography-2 dark:text-typography-1 shadow-lg text-sm">
                            <option value="weekly">Weekly</option>
                            <option value="yearly">Yearly</option>
                            <option value="monthly">monthly</option>
                            <option value="date">date</option>
                        </select>
                    </div>
                    <slot />
                </div>

            </v-container>
        </v-main>
    </v-app>
</template>
<style>
.dp__theme_dark {
    --dp-background-color: #1d1d29;
    --dp-text-color: #fff;
    --dp-border-radius: 8px;
}

.dp__theme_light {
    --dp-border-radius: 8px;
    --dp-box-shadow: 20px;
    --dp-border-color: #7b7b7b;
    --dp-border-radius: 8px;
}
</style>