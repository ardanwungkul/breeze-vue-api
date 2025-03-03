<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import StoreLayout from '@/layouts/StoreLayout.vue'
import '@/assets/css/vuetify.css'
import VoucherTable from '@/components/admin/voucher/VoucherTable.vue'
import { useVoucherStore } from '@/stores/voucher'

const store = useVoucherStore()

const vouchers = ref([])
onMounted(async () => {
    await store.voucherAll()
    await fetchVouchers()
})
async function fetchVouchers() {
    vouchers.value = store.vouchers
}
watchEffect(() => {
    fetchVouchers()
})
</script>
<template>
    <StoreLayout title="Voucher">
        <div class="w-full">
            <VoucherTable :vouchers="vouchers" :fetchVouchers="fetchVouchers" />
        </div>
    </StoreLayout>
</template>
