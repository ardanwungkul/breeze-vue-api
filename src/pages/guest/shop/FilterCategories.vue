<script setup>
import { RouterLink } from 'vue-router'
import { useCategoryStore } from '@/stores/Category'
import { ref, onMounted } from 'vue'

const storeCategory = useCategoryStore()
const allCategories = ref([])
const categories = ref([])
const props = defineProps({
    type: {
        type: String,
    },
})

onMounted(async () => {
    await fetchCategories()
})

async function fetchCategories() {
    await storeCategory.categoryWithSubCategory()
    categories.value = storeCategory.allCategories.map(category => ({
        name: category.category_name,
        id: category.id,
        subcategories: category.sub_category
    }))
    console.log(categories);
}
const activeDiv = ref();
</script>
<template>
    <div class="border border-t-transparent py-4 mb-5">
        <div class="font-medium mb-4 px-4">Categories</div>
        <div
            v-for="item in categories"
            :key="item.id"
            class="w-full">
            <div
                @click="
                activeDiv = (activeDiv === item.id) ? 0 : item.id
                "
                class="w-full flex flex-row px-4 py-2 justify-between border-b hover:text-darkbrownshop">
                <div class="">{{ item.name }}</div>
                <div 
                    :class="{
                        'rotate-180': activeDiv === item.id,
                        '': activeDiv !== item.id,
                    }"
                    class=" duration-300">
                    <svg
                        class="feather feather-chevron-down"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>
            <div
                :class="{
                    block: activeDiv === item.id,
                    hidden: activeDiv !== item.id,
                }"
                class="bg-brownshop py-4">
                <button
                    v-for="subcategory in item.subcategories"
                    :key="subcategory.id"
                    class="w-full py-1 px-4 text-left hover:bg-white">
                    {{ subcategory.sub_category_name }}
                </button>
            </div>
        </div>
    </div>
</template>