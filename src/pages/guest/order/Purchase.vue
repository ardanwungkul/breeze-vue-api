<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { usePaymentStore } from '@/stores/payment'
import { useUsers } from '@/stores/user'
import Loading from '@/components/Loading.vue'

const storePayment = usePaymentStore()
const storeUser = useUsers()
const isLoading = ref(true)
const tab = ref(null)
const payments = ref([])
onBeforeMount(async () => {
    if (storeUser.authUser) {
        if (!storeUser.hasUserData) {
            storeUser.getData()
        }
    }
})
onMounted(async () => {
    await storePayment.purchaseUser(storeUser.userData.id, isLoading)
    fetchData()
})

const fetchData = async () => {
    payments.value = storePayment.payments
}

const tabs = [
    {
        value: 'all',
        text: 'All',
    },
    {
        value: 'unpaid',
        text: 'Unpaid',
    },
    {
        value: 'packing',
        text: 'Being Packed',
    },
    {
        value: 'sent',
        text: 'Sent',
    },
    {
        value: 'done',
        text: 'Done',
    },
    {
        value: 'canceled',
        text: 'Canceled',
    },
    {
        value: 'returned',
        text: 'Returned',
    },
]
</script>
<template>
    <AppLayout>
        <Loading :isLoading="isLoading" />
        <div class="px-10 py-5">
            <div class="min-h-[144px]">
                <v-tabs
                    v-model="tab"
                    align-tabs="start"
                    :color="'#000000'"
                    hide-slider
                    bg-color="white"
                    class="rounded-lg shadow"
                    selected-class="hover:!text-black">
                    <v-tab
                        :base-color="'#9ca3af'"
                        v-for="(item, index) in tabs"
                        :value="item.value"
                        :key="index">
                        <p
                            class="!text-lg hover:!bg-transparent hover:text-gray-600">
                            {{ item.text }}
                        </p></v-tab
                    >
                </v-tabs>

                <v-tabs-window v-model="tab">
                    <div class="py-3">
                        <v-tabs-window-item
                            v-for="(item, index) in tabs"
                            :key="n"
                            :value="item.value">
                            <div
                                class="bg-light-primary-1 rounded-lg p-5 shadow">
                                <div>
                                    <ul class="space-y-3">
                                        <li
                                            v-for="(order, indexs) in payments"
                                            :key="index">
                                            <div class="border rounded-lg p-3">
                                                <div class="border-b pb-3">
                                                    {{ order.invoice_code }}
                                                </div>
                                                <div class="py-3 space-y-3">
                                                    <div
                                                        class="border rounded-lg p-3"
                                                        v-for="(
                                                            items, i
                                                        ) in order.items">
                                                        {{
                                                            items.product
                                                                .product_name
                                                        }}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </v-tabs-window-item>
                    </div>
                </v-tabs-window>
            </div>
        </div>
    </AppLayout>
</template>
