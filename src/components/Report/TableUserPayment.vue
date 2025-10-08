<script setup>
import bussinessman from '@/assets/ion/bussiness-man.png'
import man1 from '@/assets/ion/man (1).png'
import woman from '@/assets/ion/woman.png'
import man2 from '@/assets/ion/man (2).png'
import man from '@/assets/ion/man.png'

const props = defineProps({
    payment: Array,
})

const headerUser = [
    { key: 'username', title: 'Username' },
    { key: 'status_proccess', title: 'Order status', align: 'center' },
    { key: 'status_payment', title: 'Payment', align: 'center' },
    { key: 'aging_days', title: 'Aging (day)', align: 'center' },
]
// end data dummy
</script>
<template>
    <div
        class="bg-light-primary-1 p-5 dark:bg-dark-primary-2 rounded-lg shadow-lg">
        <div class="space-y-4">
            <v-data-table
                :headers="headerUser"
                :items="payment"
                hide-default-footer
                class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }">
                <template v-slot:[`item.username`]="{ item }">
                    <div class="flex gap-3 items-center h-16">
                        <img
                            :src="item.image ? item.image : bussinessman"
                            alt="image user"
                            class="rounded-full h-10 w-10" />
                        <div class="font-medium capitalize">
                            {{ item?.user?.name }}
                        </div>
                    </div>
                </template>
                <template v-slot:[`item.status_proccess`]="{ item }">
                    <div
                        :class="
                            item?.status_proccess == 'DELIVERED'
                                ? 'bg-[#6610F2]'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-800'
                        "
                        class="rounded-full text-center text-xs py-1 px-3 items-center inline-flex text-typography-1 font-medium">
                        {{ item.status_proccess.replace(/_/, ' ') }}
                    </div>
                </template>
                <template v-slot:item.status_payment="{ item }">
                    <div class="flex justify-center">
                        <div
                            class="rounded-full text-center text-xs py-1 px-3 items-center inline-flex text-typography-1 font-medium"
                            :class="
                                item.status_payment == 'SUCCESS'
                                    ? 'bg-gradient-to-r from-secondary-3 to-secondary-3/60'
                                    : item.status_payment == 'PENDING'
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-800'
                                    : item.status_payment == 'EXPIRED'
                                    ? 'bg-secondary-1'
                                    : ''
                            ">
                            {{ item.status_payment }}
                        </div>
                    </div>
                </template>
                <template v-slot:item.aging_days="{ item }">
                    <span>
                        {{
                            Math.max(
                                1,
                                Math.ceil(
                                    (Date.UTC(
                                        new Date(
                                            item.history[
                                                item.history.length - 1
                                            ]?.created_at,
                                        ).getFullYear(),
                                        new Date(
                                            item.history[
                                                item.history.length - 1
                                            ]?.created_at,
                                        ).getMonth(),
                                        new Date(
                                            item.history[
                                                item.history.length - 1
                                            ]?.created_at,
                                        ).getDate(),
                                    ) -
                                        Date.UTC(
                                            new Date(
                                                item.history[0]?.created_at,
                                            ).getFullYear(),
                                            new Date(
                                                item.history[0]?.created_at,
                                            ).getMonth(),
                                            new Date(
                                                item.history[0]?.created_at,
                                            ).getDate(),
                                        )) /
                                        (1000 * 60 * 60 * 24),
                                ),
                            )
                        }}
                        hari
                    </span>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageUser"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
