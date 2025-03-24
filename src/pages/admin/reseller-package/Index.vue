<script setup>
import { ref, onMounted, computed } from 'vue'
import { useResellerPackageStore } from '@/stores/resellerpackage'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import ResellerPackageTable from '@/components/admin/reseller-package/ResellerPackageTable.vue'
import { useProductStore } from '@/stores/product'

const storeResellerPackage = useResellerPackageStore()
const storeProduct = useProductStore()

const resellerPackage = ref([])
const product = ref([])

onMounted(async () => {
    await fetchResellerPackage()
    await fetchProduct()
})

async function fetchResellerPackage() {
    await storeResellerPackage.resellerPackageAll()
    resellerPackage.value = storeResellerPackage.allResellerPackage
}

async function fetchProduct() {
    await storeProduct.productAll()
    product.value = storeProduct.products
}
</script>
<template>
    <AdminLayout title="Reseller Package List">
        <div class="w-full">
            <ResellerPackageTable
                :product="product"
                :resellerPackage="resellerPackage"
                :fetchResellerPackage="fetchResellerPackage" />
        </div>
    </AdminLayout>
</template>
