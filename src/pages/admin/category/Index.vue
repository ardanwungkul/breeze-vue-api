<script setup>
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'
import AdminLayout from '@/layouts/AdminLayout.vue'

const store = useCategoryStore()
const categories = ref([])
const headers = [
    { key: 'name', title: 'Product Category' },
    { key: 'id', title: 'Action' },
]

onMounted(async () => {
    await fetchCategories()
})

async function fetchCategories() {
    await store.categoryAll()
    categories.value = store.allCategories.map(category => ({
        name: category.category_name,
        id: category.id,
    }))
}
</script>

<template>
    <AdminLayout>
        <div class="w-full">
            <p class="text-2xl font-bold">Product Category</p>
            <div class="relative">
                <div class="overflow-hidden rounded-lg">
                    <v-data-table
                        :headers="headers"
                        :items="categories"
                        item-key="id"
                        class="elevation-1">
                        <template v-slot:items="props">
                            <td>{{ props.item.name }}</td>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
