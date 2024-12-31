<script setup>
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import { useCouriers } from '@/stores/couriers'

const store = useCouriers()

const couriers = ref([])
onMounted(async () => {
    await store.getCouriers()
    couriers.value = store.couriers
})

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const toggleStatus = async (item) => {
    await store.changeStatus(item.id)
}
</script>
<template>
    <AdminLayout title="List Couriers">
        <div class="w-full">
            <div class="relative">
                <ValidationErrors class="w-full" :errors="errors" />
                <div class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
                    <div class="grid grid-cols-4 gap-4">
                        <div v-for="(item, index) in couriers" :key="index">
                            <div class="bg-gray-200 dark:bg-dark-primary-1 w-full h-full rounded-lg relative">
                                <div class="absolute top-2 right-3">
                                    <input type="checkbox" name="" id="" class="rounded-full border"
                                        :checked="item.courier_status === 1" @change="toggleStatus(item)">
                                </div>
                                <div class="p-2 py-4">
                                    <img class="h-32 mx-auto py-3 object-contain" :src="'/assets/images/couriers/' +
                                        item.courier_code +
                                        '.png'
                                        " alt="CourierImage" />
                                </div>
                                <div class="text-center mb-3 font-medium dark:text-light-primary-1">{{ item.courier_name
                                    }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- <v-pagination v-model="pageData" :length="pageCount"
                        class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                        :total-visible="5">
                    </v-pagination> -->
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
