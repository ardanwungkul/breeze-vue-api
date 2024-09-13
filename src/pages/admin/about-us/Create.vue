<script setup>
import { ref, computed } from 'vue'
import { useAboutUsStore } from '@/stores/aboutus'
import '@/assets/css/vue-select.css'
import ValidationErrors from '@/components/ValidationErrors.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import placeholderImage from '@/assets/images/placeholder-image.jpg'

const storeAboutUs = useAboutUsStore()

const about_us_title = ref('')
const about_us_description = ref('')
const about_us_main_image = ref('')
const about_us_second_image = ref('')

const processing = ref(false)
const setErrors = ref([])

const errors = computed(() => setErrors.value)

const imageSrc = ref(placeholderImage)
const imageSrc2 = ref(placeholderImage)

const handleAdd = async () => {
    processing.value = true

    const formData = new FormData()
    formData.append('about_us_title', about_us_title.value)
    formData.append('about_us_description', about_us_description.value)
    formData.append('about_us_main_image', about_us_main_image.value)
    formData.append('about_us_second_image', about_us_second_image.value)
    await storeAboutUs.addAboutUs(formData, setErrors, processing)
}

const changePlaceholder = event => {
    const file = event.target.files[0]
    if (file) {
        about_us_main_image.value = file
        imageSrc.value = URL.createObjectURL(file)
    }
}
const changePlaceholder2 = event => {
    const file = event.target.files[0]
    if (file) {
        about_us_second_image.value = file
        imageSrc2.value = URL.createObjectURL(file)
    }
}
</script>

<template>
    <AdminLayout title="Add About Us">
        <ValidationErrors class="w-full" :errors="errors" />
        <div class="w-full">
            <div
                class="w-full mx-auto bg-light-primary-1 dark:bg-dark-primary-2 dark:text-white rounded-lg shadow-lg duration-500">
                <div
                    class="flex justify-between border-b py-3 px-4 items-center">
                    <p class="font-medium text-lg">Add About Us</p>
                </div>
                <div class="px-5 py-3">
                    <form @submit.prevent="handleAdd">
                        <div class="grid grid-cols-2 gap-3 mb-3">
                            <div
                                class="flex flex-col justify-center items-center gap-3 text-sm">
                                <p>Main Image ( png )</p>
                                <div class="flex justify-center w-40 flex-none">
                                    <div class="relative">
                                        <img
                                            id="picture"
                                            :src="imageSrc"
                                            class="object-cover w-40 h-40 rounded-lg"
                                            alt="Placeholder Image" />
                                        <div
                                            class="absolute z-50 top-0 hover:!opacity-100 rounded-lg"
                                            style="opacity: 0">
                                            <label for="pictureInput">
                                                <div
                                                    class="w-40 h-40 bg-black opacity-60 flex items-center rounded-lg">
                                                    <p
                                                        class="text-center w-full">
                                                        <i
                                                            class="fa-solid fa-pen"
                                                            style="
                                                                color: #ffffff;
                                                            "></i>
                                                    </p>
                                                </div>
                                                <input
                                                    accept="image/png"
                                                    type="file"
                                                    class="absolute bottom-0 opacity-0 w-40 h-2"
                                                    id="pictureInput"
                                                    required
                                                    @change="
                                                        changePlaceholder
                                                    " />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex flex-col justify-center items-center gap-3 text-sm">
                                <p>Second Image</p>
                                <div class="flex justify-center w-40 flex-none">
                                    <div class="relative">
                                        <img
                                            id="picture2"
                                            :src="imageSrc2"
                                            class="object-cover w-40 h-40 rounded-lg"
                                            alt="Placeholder Image" />
                                        <div
                                            class="absolute z-50 top-0 hover:!opacity-100 rounded-lg"
                                            style="opacity: 0">
                                            <label for="pictureInput2">
                                                <div
                                                    class="w-40 h-40 bg-black opacity-60 flex items-center rounded-lg">
                                                    <p
                                                        class="text-center w-full">
                                                        <i
                                                            class="fa-solid fa-pen"
                                                            style="
                                                                color: #ffffff;
                                                            "></i>
                                                    </p>
                                                </div>
                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    class="absolute bottom-0 opacity-0 w-40 h-2"
                                                    id="pictureInput2"
                                                    required
                                                    @change="
                                                        changePlaceholder2
                                                    " />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex flex-col gap-2 text-sm">
                                <label for="about_us_title">Title</label>
                                <input
                                    class="text-sm rounded-lg w-full dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white duration-500"
                                    type="text"
                                    v-model="about_us_title"
                                    id="about_us_title"
                                    placeholder="Enter Title"
                                    required />
                            </div>
                            <div class="flex flex-col gap-2 text-sm">
                                <label for="about_us_description"
                                    >Description</label
                                >
                                <textarea
                                    class="text-sm rounded-lg w-full h-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white duration-500"
                                    v-model="about_us_description"
                                    id="about_us_description"
                                    placeholder="Enter Description"
                                    required></textarea>
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
        </div>
    </AdminLayout>
</template>
