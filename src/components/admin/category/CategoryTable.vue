<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import AddCategory from '@/components/dialog/add/AddCategory.vue'
import EditCategory from '@/components/dialog/edit/EditCategory.vue'
import { useCategoryStore } from '@/stores/category'
import ValidationErrors from '@/components/ValidationErrors.vue'

const setErrors = ref([])
const errors = computed(() => setErrors.value)

const storeCategory = useCategoryStore()
const props = defineProps({
    categories: Array,
    fetchCategories: Function,
    fetchSubCategories: Function,
})
const searchCategory = ref('')
const pageCategory = ref(1)
const itemsPerPageCategory = ref(10)

const headersCategory = [
    { key: 'name', title: 'Product Category' },
    { key: 'id', title: 'Action', align: 'center' },
]
const pageCount = computed(() => {
    return Math.ceil(
        filteredCategories.value.length / itemsPerPageCategory.value,
    )
})

const filteredCategories = computed(() => {
    return props.categories.filter(category => {
        return category.name.toLowerCase().includes(searchCategory.value)
    })
})

const processing = ref(false)
const addCategory = async newCategory => {
    await storeCategory.addCategory(newCategory, setErrors, processing)
    watchEffect(() => {
        props.fetchCategories()
    }, props.categories)
}
const deleteCategory = async id => {
    await storeCategory.deleteCategory(id, processing)
    watchEffect(() => {
        props.fetchCategories()
    }, props.categories)
    await props.fetchSubCategories()
}
const editCategory = async (updateCategory, id) => {
    await storeCategory.editCategory(updateCategory, setErrors, processing, id)
    watchEffect(() => {
        props.fetchCategories()
    }, props.categories)
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <AddCategory :method="addCategory"></AddCategory>
                <input
                    type="text"
                    v-model="searchCategory"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Product Category" />
            </div>
            <v-data-table
                v-model:page="pageCategory"
                :search="searchCategory"
                :headers="headersCategory"
                :items="categories"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <EditCategory :category="item" :method="editCategory" />
                        <ConfirmDelete
                            :label="'Delete'"
                            :type="'Category'"
                            :id="item.id"
                            :method="deleteCategory"></ConfirmDelete>
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageCategory"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
