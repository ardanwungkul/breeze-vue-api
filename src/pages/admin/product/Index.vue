<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/product'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import ProductTable from '@/components/admin/product/ProductTable.vue'

const storeProduct = useProductStore()

const products = ref([])
onMounted(async () => {
    await storeProduct.productAll()
    await fetchProducts()
})
async function fetchProducts() {
    products.value = storeProduct.products
    products.value.forEach(product => {
        product.product_stock = 0
    })
}
</script>
<template>
    <AdminLayout title="Product Items">
        <div class="w-full">
            <ProductTable :products="products" :fetchProducts="fetchProducts" />
        </div>
    </AdminLayout>
</template>
