<script setup>
import { ref, computed, defineProps } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import { useSubCategoryStore } from '@/stores/subcategory'
import AddSubCategory from '@/components/dialog/add/AddSubCategory.vue'
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
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div class="bg-ezzora-100 p-5 rounded-lg space-y-3 border">
            <div class="flex justify-between items-center">
                <AddSubCategory
                    :method="addSubCategory"
                    :categories_option="categories_option"></AddSubCategory>
                <input
                    type="text"
                    v-model="searchSubCategory"
                    class="rounded-lg text-sm min-w-52"
                    placeholder="Search Product Category" />
            </div>
            <v-data-table
                v-model:page="pageSubCategory"
                :search="searchSubCategory"
                :headers="headersSubCategory"
                :items="subcategories"
                hide-default-footer
                :header-props="{
                    class: 'bg-ezzora-200',
                }"
                item-key="id"
                class="border shadow-lg">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <router-link :to="{ name: 'dashboard' }">
                            <div
                                class="flex gap-2 items-center text-white bg-orange-400 rounded-lg px-3 py-1">
                                <i class="fa-solid fa-pen"></i>
                                <p>Edit</p>
                            </div>
                        </router-link>
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
                class="bg-ezzora-200 rounded-lg"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
