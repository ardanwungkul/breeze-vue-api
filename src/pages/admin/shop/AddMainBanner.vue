<script setup>
import { useShopPageStore } from '@/stores/shop-page/shop.js'
import { ref, computed } from 'vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)

const shopStore = useShopPageStore()
const file = ref(null)

const addMainBanner = async () => {
    processing.value = true
    const formData = new FormData()
    formData.append('file', file.value)
    await shopStore.addMainBanner(formData, setErrors, processing)
    file.value = null
}
const handleFileChange = event => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
        file.value = selectedFile
    }
    addMainBanner()
}
</script>
<template>
    <div>
        <form @submit.prevent="addMainBanner">
            <label for="main_banner">
                <div
                    class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg w-min whitespace-nowrap">
                    <i class="fa-solid fa-plus"></i>
                    <p>Add Main Banner</p>
                </div>
            </label>
            <ValidationErrors class="w-full" :errors="errors" />
            <input
                type="file"
                @change="handleFileChange"
                accept="image/*,video/*"
                id="main_banner"
                class="hidden" />
        </form>
    </div>
</template>
