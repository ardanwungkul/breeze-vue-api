<script setup>
import { ref, computed, watchEffect } from 'vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { useResellerPackageStore } from '@/stores/resellerpackage'
import EditResellerPackage from '@/components/dialog/edit/EditResellerPackage.vue'

const setErrors = ref([])
const errors = computed(() => setErrors.value)

const storeResellerPackage = useResellerPackageStore()

const props = defineProps({
    resellerPackage: Array,
    fetchResellerPackage: Function,
})
const searchResellerPackage = ref('')
const pageResellerPackage = ref(1)
const itemsPerPageResellerPackage = ref(10)

const headersResellerPackage = [
    { key: 'name', title: 'Name' },
    { key: 'price', title: 'Price' },
    { key: 'id', title: 'Action', align: 'center' },
]

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const pageCount = computed(() => {
    return Math.ceil(filteredResellerPackage.value.length / itemsPerPageResellerPackage.value)
})

const filteredResellerPackage = computed(() => {
    return props.resellerPackage.filter(resellerPackage => {
        return resellerPackage.name.toLowerCase().includes(searchResellerPackage.value)
    })
})

const editResellerPackage = async (updateResellerPackage, id) => {
    await storeResellerPackage.editResellerPackage(updateResellerPackage, setErrors, processing, id)
    watchEffect(() => {
        props.fetchResellerPackage()
    }, props.resellerPackage)
}

const processing = ref(false)

</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-end items-center">
                <input
                    type="text"
                    v-model="searchResellerPackage"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Package" />
            </div>
            <v-data-table
                v-model:page="pageResellerPackage"
                :search="searchResellerPackage"
                :headers="headersResellerPackage"
                :items="resellerPackage"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.price="{ item }">
                    <div class="grid grid-cols-1 py-2">
                        <p class="line-clamp-2">
                            Rp. {{ formatPrice(item.price) }}
                        </p>
                    </div>
                </template>
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <EditResellerPackage :resellerPackage="item" :method="editResellerPackage" />
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageResellerPackage"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
