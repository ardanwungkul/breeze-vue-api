<script setup>
import { ref, onMounted, computed } from 'vue'
import { useResellerPackageStore } from '@/stores/resellerpackage'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import ResellerPackageTable from '@/components/admin/reseller-package/ResellerPackageTable.vue'

const storeResellerPackage = useResellerPackageStore()

const resellerPackage = ref([])
onMounted(async () => {
    await fetchResellerPackage()
})

async function fetchResellerPackage() {
    await storeResellerPackage.resellerPackageAll()
    
    resellerPackage.value = storeResellerPackage.allResellerPackage.map(resellerPackage => ({
        id: resellerPackage.id,
        name: resellerPackage.name,
        price: resellerPackage.price,
        plakat: resellerPackage.plakat,
        neon_etalase: resellerPackage.neon_etalase,
        rack_product: resellerPackage.rack_product,
        interior_design: resellerPackage.interior_design,
        interior_design: resellerPackage.interior_design,
        application_crm: resellerPackage.application_crm,
        application_finance: resellerPackage.application_finance,
        application_logistic: resellerPackage.application_logistik,
        bonus: resellerPackage.bonus,
    }))
    
}
</script>
<template>
    <AdminLayout title="Reseller Package List">
        <div class="w-full">
            <ResellerPackageTable :resellerPackage="resellerPackage" :fetchResellerPackage="fetchResellerPackage" />
        </div>
    </AdminLayout>
</template>
