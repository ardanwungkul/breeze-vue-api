<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { ref, onMounted, computed } from 'vue'
import { useSubCategoryStore } from '@/stores/subcategory'
import { useProductStore } from '@/stores/product'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import placeholderImage from '@/assets/images/placeholder-image.jpg'
import Cropper from '@/components/dialog/Cropper.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'
import QrScanner from '@/components/dialog/QrScanner.vue'

const storeProduct = useProductStore()
const storeSubCategory = useSubCategoryStore()
const subcategories = ref([])

onMounted(async () => {
    await fetchSubCategories()
})
async function fetchSubCategories() {
    await storeSubCategory.subCategoryAll()
    subcategories.value = storeSubCategory.allSubCategories
}

const product_name = ref('')
const product_price = ref('')
const product_code = ref('')
const product_code_type = ref('')
const product_image = ref('')
const selectedCategory = ref([])
const product_image_3d = ref('')

const qr = ref({
    paused: false,
    alert: false,
})

const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const imageSrc = ref(placeholderImage)
const croppedImage = ref('')
const showCropper = ref(false)

const imageGallery = ref([])
const img3D = ref()

const AddProduct = async () => {
    processing.value = true

    const formData = new FormData()
    formData.append('product_name', product_name.value)
    formData.append('product_price', product_price.value)
    formData.append('product_code_type', product_code_type.value)
    formData.append('product_image', product_image.value)
    if (product_code.value !== '' && product_code.value !== null) {
        formData.append('product_code', product_code.value)
    }
    selectedCategory.value.forEach(category => {
        if (category) {
            formData.append('sub_category[]', category.id)
        }
    })
    formData.append(
        'product_image_3d',
        product_image_3d.value ? product_image_3d.value : 'null',
    )

    imageGallery.value.forEach((image, index) => {
        if (image.file) {
            formData.append(`gallery[]`, image.file)
        }
    })
    await storeProduct.addProduct(formData, setErrors, processing)
}

const changePlaceholder = event => {
    const file = event.target.files[0]
    if (file) {
        imageSrc.value = URL.createObjectURL(file)
        showCropper.value = true
    }
}
const handleUpload3D = event => {
    const file = event.target.files[0]
    if (file) {
        img3D.value = URL.createObjectURL(file)
        product_image_3d.value = file
    }
}

const dataURLtoFile = (dataURL, filename) => {
    const [header, base64Data] = dataURL.split(',')
    const mime = header.match(/:(.*?);/)[1]
    const byteString = atob(base64Data)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i)
    }

    return new File([uint8Array], filename, { type: mime })
}
const handleCrop = async method => {
    if (method == 'cancel') {
        showCropper.value = false
        imageSrc.value = placeholderImage
        product_image.value = ''
    } else if (method == 'crop') {
        croppedImage.value = cropper.getDataURL()
        const files = dataURLtoFile(croppedImage.value, 'cropper.jpg')
        product_image.value = files
        imageSrc.value = croppedImage.value
        showCropper.value = false
    }
}

function handleUploadGallery(event) {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
        if (imageGallery.value.length >= 9) {
            break
        }
        const file = files[i]
        const reader = new FileReader()
        reader.onload = e => {
            imageGallery.value.push({ url: e.target.result, file })
        }
        reader.readAsDataURL(file)
    }
    event.target.value = ''
}
function removeGallery(index) {
    imageGallery.value.splice(index, 1)
}
</script>
<template>
    <AdminLayout title="Add Products">
        <ValidationErrors class="w-full" :errors="errors" />
        <Cropper
            :showCropper="showCropper"
            :img="imageSrc"
            :method="handleCrop"
            :aspect="1" />
        <div class="w-full">
            <div class="px-5 py-3">
                <form
                    @submit.prevent="AddProduct"
                    enctype="multipart/form-data">
                    <div class="space-y-3">
                        <div
                            class="border dark:!border-typography-3 dark-primary-2 border-gray-300 p-3 rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 transition-all">
                            <p
                                class="dark:text-light-primary-1 font-medium text-lg pb-2 border-b mb-3 px-3">
                                Product Details
                            </p>
                            <div class="grid grid-cols-2 gap-3 p-3">
                                <div
                                    class="flex flex-col gap-2 text-sm col-span-2">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="product_name"
                                        >Name</label
                                    >
                                    <input
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="text"
                                        v-model="product_name"
                                        id="product_name"
                                        placeholder="Enter Product Name"
                                        required />
                                </div>
                                <div
                                    class="flex flex-col gap-2 text-sm col-span-2">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="product_price"
                                        >Price</label
                                    >
                                    <input
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="number"
                                        v-model="product_price"
                                        id="product_price"
                                        placeholder="Enter Product Price"
                                        required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <div class="flex justify-between">
                                        <label
                                            class="dark:text-light-primary-1"
                                            for="product_code_type"
                                            >Product Code Type</label
                                        >
                                    </div>
                                    <select
                                        name="product_code_type"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        id="product_code_type"
                                        required
                                        v-model="product_code_type">
                                        <option value="" selected disabled>
                                            Select Product Code Type
                                        </option>
                                        <option value="unique_code">
                                            Unique Code
                                        </option>
                                        <option value="common_code">
                                            Common Code
                                        </option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <div class="flex justify-between">
                                        <label
                                            class="dark:text-light-primary-1"
                                            for="product_code"
                                            >Product Code</label
                                        >
                                        <v-dialog>
                                            <template
                                                v-slot:activator="{
                                                    props: activatorProps,
                                                }">
                                                <button
                                                    type="button"
                                                    v-bind="activatorProps"
                                                    @click="qr.paused = false">
                                                    <i
                                                        class="fa-solid fa-camera dark:text-typography-1"></i>
                                                </button>
                                            </template>

                                            <template
                                                v-slot:default="{ isActive }">
                                                <div>
                                                    <div>
                                                        <QrScanner
                                                            :qr="qr"
                                                            v-model:result="
                                                                product_code
                                                            "
                                                            :show="isActive" />
                                                    </div>
                                                </div>
                                            </template>
                                        </v-dialog>
                                    </div>
                                    <input
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="text"
                                        v-model="product_code"
                                        id="product_code"
                                        placeholder="Enter Product Code" />
                                </div>
                                <div
                                    class="flex flex-col col-span-2 gap-2 text-sm">
                                    <label class="dark:text-light-primary-1"
                                        >Category</label
                                    >
                                    <multiselect
                                        v-model="selectedCategory"
                                        :options="subcategories"
                                        :searchable="true"
                                        :close-on-select="false"
                                        label="sub_category_name"
                                        :multiple="true"
                                        track-by="sub_category_name"
                                        :preserve-search="true"
                                        placeholder="Select Categories"></multiselect>
                                </div>
                            </div>
                        </div>
                        <div
                            class="border dark:!border-typography-3 dark-primary-2 border-gray-300 p-3 rounded-lg bg-light-primary-1 dark:bg-dark-primary-2">
                            <p
                                class="dark:text-light-primary-1 font-medium text-lg pb-2 border-b mb-3 px-3">
                                Product Images
                            </p>
                            <div class="flex flex-wrap gap-3 px-3">
                                <div class="flex justify-center w-32 flex-none">
                                    <div class="relative">
                                        <div
                                            class="absolute top-1 right-1 z-20 bg-secondary-3 rounded px-1 text-white">
                                            <p class="text-[10px]">
                                                Main Image
                                            </p>
                                        </div>
                                        <img
                                            id="picture"
                                            :src="imageSrc"
                                            class="object-cover w-32 h-32 rounded-lg border shadow-lg"
                                            alt="Placeholder Image" />
                                        <div
                                            class="absolute z-50 top-0 hover:!opacity-100 rounded-lg"
                                            style="opacity: 0">
                                            <label for="pictureInput">
                                                <div
                                                    class="w-32 h-32 bg-black opacity-60 flex items-center rounded-lg">
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
                                                    id="pictureInput"
                                                    required
                                                    @change="
                                                        changePlaceholder
                                                    " />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="group relative"
                                    v-for="(image, index) in imageGallery"
                                    :key="index">
                                    <img
                                        :src="image.url"
                                        alt="Uploaded Image"
                                        class="w-32 h-32 rounded-lg" />
                                    <div
                                        class="group-hover:opacity-100 opacity-0 absolute bottom-0 w-full flex items-center justify-center py-1 backdrop-blur-2xl bg-dark-primary-1/30">
                                        <button
                                            @click="removeGallery(index)"
                                            type="button">
                                            <i
                                                class="fa-regular fa-trash text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <label
                                    v-if="imageGallery.length !== 9"
                                    for="inputGallery"
                                    class="w-32 h-32 border-dashed border !border-typography-2 rounded-lg flex-none flex justify-center items-center dark:hover:bg-dark-primary-1 hover:bg-light-primary-2 cursor-pointer">
                                    <div
                                        class="flex items-center justify-center flex-col">
                                        <i
                                            class="fa-regular fa-image text-typography-2 text-2xl"></i>
                                        <p class="text-typography-2 text-xs">
                                            Add Photo
                                            {{ imageGallery.length }}/9
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        name="inputGallery"
                                        @change="handleUploadGallery"
                                        id="inputGallery" />
                                </label>
                            </div>
                            <div class="my-5">
                                <p
                                    class="dark:text-light-primary-1 font-medium text-lg pb-2 border-b mb-3 px-3">
                                    Product Image 3D
                                </p>
                                <div class="px-3">
                                    {{ product_image_3d }}
                                    <label
                                        for="image3D"
                                        class="w-32 h-32 border-dashed border !border-typography-2 rounded-lg flex-none flex justify-center items-center dark:hover:bg-dark-primary-1 hover:bg-light-primary-2 cursor-pointer overflow-hidden">
                                        <div
                                            v-if="!img3D"
                                            class="flex items-center justify-center flex-col">
                                            <i
                                                class="fa-regular fa-image text-typography-2 text-2xl"></i>
                                            <p
                                                class="text-typography-2 text-xs text-center">
                                                Add Product Image 3D
                                            </p>
                                        </div>
                                        <img :src="img3D" v-if="img3D" alt="" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            class="hidden"
                                            @change="handleUpload3D"
                                            id="image3D" />
                                    </label>
                                </div>
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
    </AdminLayout>
</template>
