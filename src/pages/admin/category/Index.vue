<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useSubCategoryStore } from '@/stores/subcategory'
import AdminLayout from '@/layouts/AdminLayout.vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'

const storeCategory = useCategoryStore()
const storeSubCategory = useSubCategoryStore()

const searchCategory = ref('')
const searchSubCategory = ref('')

const pageCategory = ref(1)
const pageSubCategory = ref(1)

const itemsPerPageCategory = ref(10)
const itemsPerPageSubCategory = ref(10)

const categories = ref([])
const subcategories = ref([])

const headersCategory = [
    { key: 'name', title: 'Product Category' },
    { key: 'id', title: 'Action', align: 'center' },
]
const headersSubCategory = [
    { key: 'name', title: 'Sub Category' },
    { key: 'category', title: 'Category' },
    { key: 'id', title: 'Action', align: 'center' },
]

const pageCount = computed(() => {
    return Math.ceil(
        filteredCategories.value.length / itemsPerPageCategory.value,
    )
})
const pageCountSub = computed(() => {
    return Math.ceil(
        filteredSubCategories.value.length / itemsPerPageSubCategory.value,
    )
})

const filteredCategories = computed(() => {
    return categories.value.filter(category => {
        return category.name.toLowerCase().includes(searchCategory.value)
    })
})
const filteredSubCategories = computed(() => {
    return subcategories.value.filter(subcategory => {
        return subcategory.name.toLowerCase().includes(searchSubCategory.value)
    })
})

onMounted(async () => {
    await fetchCategories()
    await fetchSubCategories()
})

async function fetchCategories() {
    await storeCategory.categoryAll()
    categories.value = storeCategory.allCategories.map(category => ({
        name: category.category_name,
        id: category.id,
    }))
}
async function fetchSubCategories() {
    await storeSubCategory.subCategoryAll()
    subcategories.value = storeSubCategory.allSubCategories.map(
        subcategory => ({
            name: subcategory.sub_category_name,
            category: subcategory.category.category_name,
            id: subcategory.id,
        }),
    )
}

const processing = ref(false)
const newCategoryName = ref('')
const newSubCategoryName = ref('')
const selectedCategoryId = ref('')

const addSubCategory = async () => {
    const newSubCategory = {
        sub_category_name: newSubCategoryName.value,
        category_id: selectedCategoryId.value,
    }
    await storeSubCategory.addSubCategory(newSubCategory, processing)
    newSubCategoryName.value = ''
    selectedCategoryId.value = ''
    await fetchSubCategories()
}

const addCategory = async () => {
    const newCategory = { category_name: newCategoryName.value }
    await storeCategory.addCategory(newCategory, processing)
    newCategoryName.value = ''
    await fetchCategories()
}

const deleteCategory = async id => {
    await storeCategory.deleteCategory(id, processing)
    await fetchCategories()
    await fetchSubCategories()
}
const deleteSubCategory = async id => {
    await storeSubCategory.deleteSubCategory(id, processing)
    await fetchSubCategories()
}
</script>

<template>
    <AdminLayout>
        <div class="w-full space-y-5">
            <p class="text-2xl font-bold">Product Category</p>
            <div class="relative">
                <div class="bg-neutral-100 p-5 rounded-lg space-y-3 border">
                    <div class="flex justify-between items-center">
                        <v-dialog>
                            <template
                                v-slot:activator="{ props: activatorProps }">
                                <div
                                    v-bind="activatorProps"
                                    class="bg-neutral-500 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer">
                                    <i class="fa-solid fa-plus"></i>
                                    <p>Add Category</p>
                                </div>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <div
                                    class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
                                    <div
                                        class="flex justify-between border-b py-3 px-4 items-center">
                                        <p class="font-medium text-lg">
                                            Add Category
                                        </p>
                                        <button
                                            @click="isActive.value = false"
                                            class="fa-solid fa-x rounded-xl hover:bg-gray-100 px-3 py-2"></button>
                                    </div>
                                    <div class="px-5 py-3">
                                        <form @submit.prevent="addCategory">
                                            <div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label for="category_name"
                                                        >Category Name</label
                                                    >
                                                    <div
                                                        class="flex gap-5 justify-between">
                                                        <input
                                                            class="text-sm rounded-lg bg-gray-100 w-full"
                                                            type="text"
                                                            v-model="
                                                                newCategoryName
                                                            "
                                                            id="category_name"
                                                            placeholder="Enter Category Name"
                                                            required />
                                                        <button
                                                            class="bg-neutral-500 hover:bg-neutral-600 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3">
                                                            <i
                                                                class="fa-solid fa-plus"></i>
                                                            <svg
                                                                v-if="
                                                                    processing
                                                                "
                                                                role="status"
                                                                class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                                viewBox="0 0 100 101"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                    fill="currentColor" />
                                                                <path
                                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                    fill="currentFill" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </template>
                        </v-dialog>
                        <input
                            type="text"
                            v-model="searchCategory"
                            class="rounded-lg text-sm min-w-52"
                            placeholder="Search Product Category" />
                    </div>
                    <v-data-table
                        v-model:page="pageCategory"
                        :search="searchCategory"
                        :headers="headersCategory"
                        :items="categories"
                        hide-default-footer
                        :header-props="{
                            class: 'bg-neutral-200',
                        }"
                        item-key="id"
                        class="border shadow-lg">
                        <template v-slot:item.id="{ item }">
                            <div
                                class="flex gap-3 items-center justify-center text-xs">
                                <router-link :to="{ name: 'dashboard' }">
                                    <div
                                        class="flex gap-2 items-center text-white bg-orange-400 rounded-lg px-3 py-1">
                                        <i class="fa-solid fa-pen"></i>
                                        <p>Edit</p>
                                    </div>
                                </router-link>
                                <ConfirmDelete
                                    :type="'Category'"
                                    :id="item.id"
                                    :method="deleteCategory"></ConfirmDelete>
                            </div>
                        </template>
                    </v-data-table>
                    <v-pagination
                        v-model="pageCategory"
                        :length="pageCount"
                        class="fill-gray-600 bg-gray-200 rounded-lg"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
            <div class="relative">
                <div class="bg-neutral-100 p-5 rounded-lg space-y-3 border">
                    <div class="flex justify-between items-center">
                        <v-dialog>
                            <template
                                v-slot:activator="{ props: activatorProps }">
                                <div
                                    v-bind="activatorProps"
                                    class="bg-neutral-500 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer">
                                    <i class="fa-solid fa-plus"></i>
                                    <p>Add Sub Category</p>
                                </div>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <div
                                    class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
                                    <div
                                        class="flex justify-between border-b py-3 px-4 items-center">
                                        <p class="font-medium text-lg">
                                            Add Sub Category
                                        </p>
                                        <button
                                            @click="isActive.value = false"
                                            class="fa-solid fa-x rounded-xl hover:bg-gray-100 px-3 py-2"></button>
                                    </div>
                                    <div class="px-5 py-3">
                                        <form @submit.prevent="addSubCategory">
                                            <div class="space-y-3">
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label for="category_name"
                                                        >Sub Category
                                                        Name</label
                                                    >
                                                    <input
                                                        class="text-sm rounded-lg bg-gray-100 w-full"
                                                        type="text"
                                                        v-model="
                                                            newSubCategoryName
                                                        "
                                                        id="category_name"
                                                        placeholder="Enter Sub Category Name"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label for="category_id"
                                                        >Category</label
                                                    >
                                                    <div
                                                        class="flex gap-5 justify-between">
                                                        <select
                                                            class="text-sm rounded-lg bg-gray-100 w-full"
                                                            id="category_id"
                                                            v-model="
                                                                selectedCategoryId
                                                            "
                                                            required>
                                                            <option
                                                                value=""
                                                                disabled
                                                                selected>
                                                                Select Category
                                                            </option>
                                                            <option
                                                                :value="
                                                                    itemCategories.id
                                                                "
                                                                v-for="(
                                                                    itemCategories,
                                                                    cat
                                                                ) in categories"
                                                                :key="cat">
                                                                {{
                                                                    itemCategories.name
                                                                }}
                                                            </option>
                                                        </select>
                                                        <button
                                                            class="bg-neutral-500 hover:bg-neutral-600 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3">
                                                            <i
                                                                class="fa-solid fa-plus"></i>
                                                            <svg
                                                                v-if="
                                                                    processing
                                                                "
                                                                role="status"
                                                                class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                                viewBox="0 0 100 101"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                    fill="currentColor" />
                                                                <path
                                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                    fill="currentFill" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </template>
                        </v-dialog>
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
                            class: 'bg-neutral-200',
                        }"
                        item-key="id"
                        class="border shadow-lg">
                        <template v-slot:item.id="{ item }">
                            <div
                                class="flex gap-3 items-center justify-center text-xs">
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
                        class="mt-4"
                        :total-visible="5">
                    </v-pagination>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
