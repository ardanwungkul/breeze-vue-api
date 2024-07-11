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
    <AdminLayout title="Product Items">
        <div class="w-full">
            <ProductTable :products="products" :fetchProducts="fetchProducts" />
        </div>
    </AdminLayout>
</template>
