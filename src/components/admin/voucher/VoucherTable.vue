<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import { RouterLink } from 'vue-router'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { useVoucherStore } from '@/stores/voucher'

const store = useVoucherStore()
const props = defineProps({
    vouchers: Array,
    fetchVouchers: Function,
})
const searchVoucher = ref('')
const pageVoucher = ref(1)
const itemsPerPageVoucher = ref(10)

const headersVoucher = [
    { key: 'voucher_name', title: 'Voucher Name' },
    { key: 'voucher_auto_generate', title: 'Voucher Code' },
    { key: 'voucher_validity', title: 'Voucher Validity', align: 'center' },
    { key: 'voucher_stock', title: 'Voucher Stock', align: 'center' },
    { key: 'id', title: 'Action' },
]
const pageCount = computed(() => {
    return Math.ceil(filteredVouchers.value.length / itemsPerPageVoucher.value)
})

const filteredVouchers = computed(() => {
    return props.vouchers.filter(voucher => {
        return voucher.voucher_name.toLowerCase().includes(searchVoucher.value)
    })
})

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const deleteVoucher = async id => {
    await store.deleteVoucher(id, processing)
}
const downloadVoucher = async id => {
    await store.downloadVoucher(id, processing)
}
const downloadAllVoucher = async id => {
    await store.downloadAllVoucher(id, processing)
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <RouterLink :to="{ name: 'admin.voucher.create' }">
                    <div
                        class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg">
                        <i class="fa-solid fa-plus"></i>
                        <p>Add Voucher</p>
                    </div>
                </RouterLink>
                <input
                    type="text"
                    v-model="searchVoucher"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Voucher" />
            </div>
            <v-data-table
                v-model:page="pageVoucher"
                :search="searchVoucher"
                :headers="headersVoucher"
                :items="vouchers"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <router-link
                            :to="{
                                name: 'admin.voucher.edit',
                                params: {
                                    id: item.id,
                                },
                            }">
                            <div
                                class="flex gap-2 items-center text-white bg-secondary-2 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                                <i class="fa-solid fa-pen"></i>
                                <p>Edit</p>
                            </div>
                        </router-link>
                        <ConfirmDelete
                            :label="'Delete'"
                            :type="'Voucher'"
                            :id="item.id"
                            :method="deleteVoucher"></ConfirmDelete>
                    </div>
                </template>
                <template v-slot:item.voucher_validity="{ item }">
                    <div
                        class="flex gap-3 items-center justify-center text-sm"
                        :class="
                            new Date(item.voucher_validity) > new Date()
                                ? 'text-green-500'
                                : 'text-red-500'
                        ">
                        {{ item.voucher_validity }}
                    </div>
                </template>
                <template v-slot:item.voucher_stock="{ item }">
                    <p v-if="item && item.code">
                        {{
                            item.code
                                .map(item => item.voucher_stock)
                                .reduce(
                                    (accumulator, value) => accumulator + value,
                                    0,
                                )
                        }}
                    </p>
                </template>
                <template v-slot:item.voucher_auto_generate="{ item }">
                    <div v-if="item.voucher_auto_generate == 'true'">
                        <v-dialog max-width="1080">
                            <template
                                v-slot:activator="{ props: activatorProps }">
                                <button
                                    type="button"
                                    v-bind="activatorProps"
                                    class="!text-blue-500 hover:underline">
                                    See Voucher Code
                                </button>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <div
                                    class="bg-light-primary-1 rounded-lg !max-h-[calc(100vh-20px)] overflow-y-scroll invisible-scrollbar">
                                    <div
                                        class="flex justify-between border-b py-3 px-6 sticky top-0 bg-light-primary-1">
                                        <p class="font-medium">
                                            <span class="text-sm text-gray-500">
                                                List Code Voucher
                                            </span>
                                            {{ item.voucher_name }}
                                        </p>
                                        <button
                                            type="button"
                                            @click="isActive.value = false">
                                            <i class="fa-solid fa-x"></i>
                                        </button>
                                    </div>
                                    <div class="p-6 grid grid-cols-3 gap-3">
                                        <div
                                            class="col-span-3 grid grid-cols-3 gap-3">
                                            <button
                                                v-if="item.voucher_image"
                                                type="button"
                                                @click="
                                                    downloadAllVoucher(item.id)
                                                "
                                                class="col-start-3 border w-full bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 flex justify-center items-center gap-3 shadow-lg">
                                                <p class="text-light-primary-1">
                                                    Download All
                                                </p>
                                                <i
                                                    class="fa-solid fa-download text-light-primary-1"></i>
                                            </button>
                                        </div>
                                        <div
                                            v-for="(code, index) in item.code"
                                            class="border rounded-lg py-1 px-3 bg-light-primary-2 flex"
                                            :class="
                                                item.voucher_image
                                                    ? 'justify-between'
                                                    : 'justify-center'
                                            ">
                                            <p class="text-center">
                                                {{ code.voucher_code }}
                                            </p>
                                            <button
                                                v-if="item.voucher_image"
                                                type="button"
                                                @click="
                                                    downloadVoucher(code.id)
                                                ">
                                                <i
                                                    class="fa-solid fa-download text-green-500"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </v-dialog>
                    </div>
                    <div v-else class="flex justify-between">
                        <p v-for="(code, index) in item.code" :key="index">
                            {{ code.voucher_code }}
                        </p>
                        <div
                            v-if="item.voucher_image"
                            v-for="(code, index) in item.code"
                            :key="index">
                            <button
                                type="button"
                                @click="downloadVoucher(code.id)">
                                <i
                                    class="fa-solid fa-download text-green-500"></i>
                            </button>
                        </div>
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageVoucher"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
