<script setup>
import { ref, onMounted, computed } from 'vue'
import { useFlashSaleStore } from '@/stores/shop-page/flash-sale'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import FlashSaleTable from '@/components/admin/shop/FlashSaleTable.vue'
import { format } from 'date-fns'

const storeFlashSale = useFlashSaleStore()
const flashSales = ref([])

onMounted(async () => {
    await fetchFlashSale()
})
async function fetchFlashSale() {
    await storeFlashSale.flashSaleAll()
    flashSales.value = storeFlashSale.allFlashSales.map(fs => ({
        id: fs.id,
        flash_sale_title: fs.flash_sale_title,
        flash_sale_from: format(fs.flash_sale_from, 'dd MMMM yyyy HH:mm'),
        flash_sale_until: format(fs.flash_sale_until, 'dd MMMM yyyy HH:mm'),
        product: fs.product,
    }))
}
</script>
<template>
    <AdminLayout title="Flash Sale">
        <div class="w-full">
            <FlashSaleTable
                :flashSales="flashSales"
                :fetchFlashSale="fetchFlashSale" />
        </div>
    </AdminLayout>
</template>
