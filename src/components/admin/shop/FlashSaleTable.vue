<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import AddFlashSale from '@/components/dialog/add/AddFlashSale.vue'
// import EditProduct from '@/components/dialog/edit/EditProduct.vue'
import { useFlashSaleStore } from '@/stores/shop-page/flash-sale'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { RouterLink } from 'vue-router'

const storeFlashSale = useFlashSaleStore()
const props = defineProps({
    flashSales: Array,
    fetchFlashSale: Function,
})
const searchFlashSale = ref('')
const pageFlashsale = ref(1)
const itemsPerPageFlashsale = ref(10)

const headersFlashSale = [
    { key: 'flash_sale_title', title: 'Campaign Title', align: 'center' },
    { key: 'flash_sale_from', title: 'Flash Sale Start', align: 'center' },
    {
        key: 'flash_sale_until',
        title: 'Flash Sale End',
        align: 'center',
    },
    { key: 'id', title: 'Action', align: 'center' },
]
const pageCount = computed(() => {
    return Math.ceil(
        filteredFlashSales.value.length / itemsPerPageFlashsale.value,
    )
})

const filteredFlashSales = computed(() => {
    return props.flashSales.filter(fs => {
        return fs.flash_sale_from.toLowerCase().includes(searchFlashSale.value)
    })
})

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const addFlashSale = async newFlashSale => {
    await storeFlashSale.addFlashSale(newFlashSale, setErrors, processing)
    watchEffect(() => {
        props.fetchFlashSale()
    }, props.flashSales)
}
const editFlashSale = async (updateFlashSale, id) => {
    await storeFlashSale.editFlashSale(
        updateFlashSale,
        setErrors,
        processing,
        id,
    )
    watchEffect(() => {
        props.fetchFlashSale()
    }, props.flashSales)
}
const deleteFlashSale = async id => {
    processing.value = true
    await storeFlashSale.deleteFlashSale(id, setErrors, processing)
    watchEffect(() => {
        props.fetchFlashSale()
    }, props.flashSales)
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <AddFlashSale :method="addFlashSale" />
                <input
                    type="text"
                    v-model="searchFlashSale"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Flash Sales" />
            </div>
            <v-data-table
                v-model:page="pageFlashsale"
                :search="searchFlashSale"
                :headers="headersFlashSale"
                :items="flashSales"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <RouterLink
                            :to="{
                                name: 'admin.shop.show.flash-sale',
                                params: {
                                    id: item.id,
                                },
                            }">
                            <div
                                class="flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1">
                                <i class="fa-solid fa-eye"></i>
                                <p>Show</p>
                            </div>
                        </RouterLink>
                        <ConfirmDelete
                            :label="'Delete'"
                            :type="'Flash Sale'"
                            :id="item.id"
                            :method="deleteFlashSale"></ConfirmDelete>
                    </div>
                </template>
                <template v-slot:item.flash_sale_date_from="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <p>
                            {{ item.flash_sale_date_from }} -
                            {{ item.flash_sale_time_from }}
                        </p>
                    </div>
                </template>
                <template v-slot:item.flash_sale_date_until="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        {{ item.flash_sale_date_until }} -
                        {{ item.flash_sale_time_until }}
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageFlashsale"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
