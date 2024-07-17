<script setup>
import { ref, onBeforeMount, watchEffect } from 'vue'
import { useFlashSaleStore } from '@/stores/shop-page/flash-sale'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import FlashSaleProductTable from '@/components/admin/shop/FlashSaleProductTable.vue'
import { useRoute, useRouter } from 'vue-router'

const storeFlashSale = useFlashSaleStore()
const flashSale = ref(null)
const router = useRouter()
const route = useRoute()
const flashSaleId = ref(route.params.id)
const title = ref(null)

onBeforeMount(async () => {
    getFlashSale(flashSaleId.value)
})
const getFlashSale = async id => {
    await storeFlashSale.getFlashSaleById(id)
    if (
        !storeFlashSale.singleFlashSale ||
        Object.keys(storeFlashSale.singleFlashSale).length === 0
    ) {
        router.replace('/404')
    } else {
        flashSale.value = storeFlashSale.singleFlashSale
        title.value = flashSale.value.flash_sale_title
    }
}
watchEffect(() => {
    getFlashSale(flashSaleId.value)
})
</script>
<template>
    <AdminLayout :title="title">
        <div class="w-full">
            <FlashSaleProductTable :flashSale="flashSale" />
        </div>
    </AdminLayout>
</template>
