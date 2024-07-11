<script setup>
import { ref, computed, defineProps, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import { useSubCategoryStore } from '@/stores/subcategory'
import AddSubCategory from '@/components/dialog/add/AddSubCategory.vue'
import EditSubCategory from '@/components/dialog/edit/EditSubCategory.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const setErrors = ref([])
const errors = computed(() => setErrors.value)

const storeSubCategory = useSubCategoryStore()
const props = defineProps({
    categories: Array,
    categories_option: Array,
    subcategories: Array,
    fetchCategories: Function,
    fetchSubCategories: Function,
})
const searchSubCategory = ref('')
const pageSubCategory = ref(1)
const itemsPerPageSubCategory = ref(10)
const headersSubCategory = [
    { key: 'name', title: 'Sub Category' },
    { key: 'category', title: 'Category' },
    { key: 'id', title: 'Action', align: 'center' },
]
const pageCountSub = computed(() => {
    return Math.ceil(
        filteredSubCategories.value.length / itemsPerPageSubCategory.value,
    )
})
const filteredSubCategories = computed(() => {
    return props.subcategories.filter(subcategory => {
        return subcategory.name.toLowerCase().includes(searchSubCategory.value)
    })
})
const processing = ref(false)

const addSubCategory = async newSubCategory => {
    await storeSubCategory.addSubCategory(newSubCategory, setErrors, processing)
    await props.fetchSubCategories()
}

const deleteSubCategory = async id => {
    await storeSubCategory.deleteSubCategory(id, processing)
    await props.fetchSubCategories()
}
const editSubCategory = async (updateSubCategory, id) => {
    await storeSubCategory.editSubCategory(
        updateSubCategory,
        setErrors,
        processing,
        id,
    )
    watchEffect(() => {
        props.fetchSubCategories()
    }, props.subcategories)
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <AddSubCategory
                    :method="addSubCategory"
                    :categories_option="categories_option"></AddSubCategory>
                <input
                    type="text"
                    v-model="searchSubCategory"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Product Category" />
            </div>
            <v-data-table
                v-model:page="pageSubCategory"
                :search="searchSubCategory"
                :headers="headersSubCategory"
                :items="subcategories"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <EditSubCategory
                            :subcategory="item"
                            :categories_option="categories_option"
                            :method="editSubCategory" />
                        <ConfirmDelete
                            :type="'Sub Category'"
                            :id="item.id"
                            :method="deleteSubCategory"></ConfirmDelete>
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageSubCategory"
                :length="pageCountSub"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
