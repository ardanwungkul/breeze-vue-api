<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/product'
import AdminLayout from '@/layouts/AdminLayout.vue'
import 'vuetify/styles'
import ProductTable from '@/components/admin/product/ProductTable.vue'

const storeProduct = useProductStore()

const products = ref([])
onMounted(async () => {
    await fetchProducts()
})
async function fetchProducts() {
    await storeProduct.productAll()
    products.value = storeProduct.allProduct.map(product => ({
        name: product.product_name,
        id: product.id,
        subcategory: product.subcategory,
        product_price: product.product_price,
        product_stock: product.product_stock,
        product_tag: product.product_tag,
        product_image: product.product_image,
        subcategory_id: product.subcategory_id,
    }))
}
</script>
<template>
    <AdminLayout>
        <div class="w-full space-y-5">
            <p class="text-2xl font-bold text-ezzora-900">Product Items</p>

            <ProductTable :products="products" :fetchProducts="fetchProducts" />
        </div>
    </AdminLayout>
</template>
