<script setup>
import { ref } from 'vue'
import '@/assets/css/vuetify.css'

const processing = ref(false)
const props = defineProps({
    method: {
        type: Function,
        required: true,
    },
    categories_option: Array,
})
const newSubCategoryName = ref('')
const selectedCategoryId = ref('')
const handleAdd = async () => {
    processing.value = true
    const newSubCategory = {
        sub_category_name: newSubCategoryName.value,
        category_id: selectedCategoryId.value,
    }
    await props.method(newSubCategory, processing)
    newSubCategoryName.value = ''
    selectedCategoryId.value = ''
    processing.value = false
}
</script>

<template>
    <v-dialog>
        <template v-slot:activator="{ props: activatorProps }">
            <div
                v-bind="activatorProps"
                class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg">
                <i class="fa-solid fa-plus"></i>
                <p>Add Sub Category</p>
            </div>
        </template>

        <template v-slot:default="{ isActive }">
            <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
                <div
                    class="flex justify-between border-b py-3 px-4 items-center">
                    <p class="font-medium text-lg">Add Sub Category</p>
                    <button
                        @click="isActive.value = false"
                        class="fa-solid fa-x rounded-xl hover:bg-gray-100 px-3 py-2"></button>
                </div>
                <div class="px-5 py-3">
                    <form @submit.prevent="handleAdd">
                        <div class="space-y-3">
                            <div class="flex flex-col gap-2 text-sm">
                                <label for="category_name"
                                    >Sub Category Name</label
                                >
                                <input
                                    class="text-sm rounded-lg bg-gray-100 w-full"
                                    type="text"
                                    v-model="newSubCategoryName"
                                    id="category_name"
                                    placeholder="Enter Sub Category Name"
                                    required />
                            </div>
                            <div class="flex flex-col gap-2 text-sm">
                                <label for="category_id">Category</label>
                                <div class="">
                                    <v-autocomplete
                                        required
                                        rounded="lg"
                                        tile="false"
                                        bg-color="#f3f4f6"
                                        focused
                                        v-model="selectedCategoryId"
                                        :items="
                                            categories_option
                                        "></v-autocomplete>
                                </div>
                            </div>
                            <button
                                class="bg-secondary-3 hover:bg-opacity-90 text-white px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3">
                                <p>Add</p>
                                <i class="fa-solid fa-plus"></i>
                                <svg
                                    v-if="processing"
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
                    </form>
                </div>
            </div>
        </template>
    </v-dialog>
</template>
<style>
.v-field__input {
    align-items: center;
    color: inherit;
    -moz-column-gap: 2px;
    column-gap: 2px;
    display: flex;
    flex-wrap: wrap;
    letter-spacing: 0.009375em;
    opacity: var(--v-high-emphasis-opacity);
    max-height: 40px !important;
    min-height: 40px !important;
    min-width: 0;
    padding-inline: var(--v-field-padding-start) var(--v-field-padding-end);
    padding-top: none !important;
    padding-bottom: none !important;
    border-radius: 8px !important;
    position: relative;
    width: 100%;
}
.v-field__input input {
    background-color: transparent;
    border-style: none;
}

.v-field__input input:focus {
    outline: none;
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
}
</style>
