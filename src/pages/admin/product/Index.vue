<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/product'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import ProductTable from '@/components/admin/product/ProductTable.vue'

const storeProduct = useProductStore()

const products = ref([])
onMounted(async () => {
    await fetchProducts()
})
async function fetchProducts() {
    await storeProduct.productAll()
    products.value = storeProduct.products
}
</script>
<template>
    <AdminLayout title="Product Items">
        <div class="w-full">
            <ProductTable :products="products" :fetchProducts="fetchProducts" />
        </div>
    </AdminLayout>
</template>
