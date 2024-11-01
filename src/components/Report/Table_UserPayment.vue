<script setup>
// image dummy
import bussinessman from '@/assets/ion/bussiness-man.png'
import man1 from '@/assets/ion/man (1).png'
import woman from '@/assets/ion/woman.png'
import man2 from '@/assets/ion/man (2).png'
import man from '@/assets/ion/man.png'
// end image dummmy


// data dummy
const headerUser = [
    { key: 'no', title: 'No', width: '20px' },
    { key: 'username', title: 'Username' },
    { key: 'orderStatus', title: 'Order status' },
    { key: 'payment', title: 'Payment' },
    { key: 'delivery', title: 'Delivery' },
    { key: 'aging', title: 'Aging (day)' },
]
const bodyUser = [
    {
        no: 1,
        username: "Ultraman",
        orderStatus: "Cenceled",
        payment: "Cenceled",
        delivery: "Cenceled",
        aging: 1,
        image: bussinessman
    },

    {
        no: 2,
        username: "Ucok",
        orderStatus: "On Progress",
        payment: "Paid",
        delivery: "Delivering",
        aging: 1,
        image: man1
    },

    {
        no: 3,
        username: "Didin Supriyadi",
        orderStatus: "On Progress",
        payment: "Paid",
        delivery: "Packing",
        aging: 3,
        image: woman
    },
    {
        no: 4,
        username: "Kamen rider",
        orderStatus: "Pending",
        payment: "Unpaid",
        delivery: "Unprocessed",
        aging: 0,
        image: man2
    },
    {
        no: 5,
        username: "Dede Wicaksono",
        orderStatus: "Done",
        payment: "Paid",
        delivery: "Delivered",
        aging: 2,
        image: man
    },

]
// end data dummy
</script>
<template>
    <div class="space-y-4">
        <v-data-table :headers="headerUser" :items="bodyUser" hide-default-footer
            class="border dark:!border-typography-2/20 !rounded-lg shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"
            :header-props="{
                class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
            }">
            <template v-slot:[`item.username`]="{ item }">
                <div class="flex gap-3 items-center h-16">
                    <img :src="item.image" alt="image user" class="rounded-full h-10 w-10">
                    <div class="font-medium">{{ item.username }}</div>
                </div>
            </template>
            <template v-slot:[`item.orderStatus`]="{ item }">
                <div :class="{
                    'bg-[#ffa755]': item.orderStatus === 'Cenceled',
                    'bg-[#6610F2]': item.orderStatus === 'On Progress' || item.orderStatus === 'Done',
                    'bg-gradient-to-r from-purple-600 to-indigo-800': item.orderStatus === 'Pending'
                }"
                    class="rounded-full text-center text-xs py-1 px-3 items-center inline-flex text-typography-1 font-medium">
                    {{ item.orderStatus }}</div>
            </template>
            <template v-slot:[`item.payment`]="{ item }">
                <div :class="{
                    'bg-[#ffa755]': item.payment === 'Cenceled' || item.payment === 'Unpaid'
                }" :style="item.payment === 'Paid'
                    ? 'background: linear-gradient(to right, rgb(127, 0, 255), rgb(225, 0, 255));'
                    : ''"
                    class="rounded-full text-center text-xs py-1 px-3 items-center inline-flex text-typography-1 font-medium">
                    {{ item.payment }}</div>
            </template>
        </v-data-table>
        <v-pagination v-model="pageUser" :length="pageCount"
            class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
            :total-visible="5">
        </v-pagination>
    </div>
</template>