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
    // await fetchData()
})
// async function fetchData() {
//     payments.value = store.payments
// }

const deleteData = async id => {
    await storeUser.deletePayment(id, processing)
}

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)

const searchData = ref('')
const pageData = ref(1)
const itemsPerPageData = ref(10)

const headersData = [
    { key: 'image', title: 'Image', width: '300px', align: 'center' },
    { key: 'courier_name', title: 'Name' },
    { key: 'status', title: 'status', width: '100px' },
]
const pageCount = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPageData.value)
})

const filteredData = computed(() => {
    return couriers.value.filter(courier => {
        return courier.courier_code.toLowerCase().includes(searchData.value)
    })
})
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
}
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

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
                    <!-- <div class="flex justify-end items-center">
                        <input type="text" v-model="searchData"
                            class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                            placeholder="Search Payment" />
                    </div> -->
                    <!-- <v-data-table v-model:page="pageData" :search="searchData" :headers="headersData" :items="couriers"
                        hide-default-footer :header-props="{
                            class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                        }" item-key="id"
                        class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                        <template v-slot:item.image="{ item }">
                            <img class="w-20 mx-auto py-3" :src="'/assets/images/couriers/' +
                                item.courier_code +
                                '.png'
                                " alt="CourierImage" />
                        </template>
<template v-slot:item.courier_name="{ item }">
                            <p class="capitalize">{{ item.courier_name }}</p>
                        </template>
<template v-slot:item.status="{ item }">
                            <div class="flex justify-center">
                                <input type="checkbox" class="rounded-full border" :checked="item.courier_status === 1"
                                    @change="toggleStatus(item)">
                            </div>
                        </template>
</v-data-table> -->
                    <div class="grid grid-cols-4 gap-4">
                        <div v-for="(item, index) in couriers" :key="index">
                            <div class="bg-gray-200 w-full h-full rounded-lg relative">
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
                                <div class="text-center mb-3 font-medium">{{ item.courier_name }}</div>
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
