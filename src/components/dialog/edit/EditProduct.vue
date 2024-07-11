<script setup>
import { ref, onMounted } from 'vue'
import vSelect from 'vue-select'
import '@/assets/css/vue-select.css'
import { useSubCategoryStore } from '@/stores/subcategory'

const storeSubCategory = useSubCategoryStore()
const subcategories = ref([])
const subcategories_option = ref([])

onMounted(async () => {
    await fetchSubCategories()
})
async function fetchSubCategories() {
    await storeSubCategory.subCategoryAll()
    subcategories.value = storeSubCategory.allSubCategories.map(
        subcategory => ({
            name: subcategory.sub_category_name,
            category: subcategory.category.category_name,
            id: subcategory.id,
        }),
    )
    subcategories_option.value = storeSubCategory.allSubCategories.map(
        subcategory => ({
            id: subcategory.id,
            label: subcategory.sub_category_name,
            name: subcategory.sub_category_name,
        }),
    )
}

const props = defineProps({
    method: {
        type: Function,
        required: true,
    },
    product: Object,
})
const product_name = ref(props.product.name)
const product_price = ref(props.product.product_price)
const product_stock = ref(props.product.product_stock)
const product_image = ref(null)
const product_tag = ref(props.product.product_tag)
const selectedCategory = ref(
    props.product.subcategory ? props.product.subcategory.id : null,
)
const processing = ref(false)
const imageSrc = ref(
    import.meta.env.VITE_PUBLIC_BACKEND_URL +
        '/storage/images/product/' +
        props.product.product_image,
)

const handleEdit = async () => {
    processing.value = true

    const formData = new FormData()
    formData.append('product_name', product_name.value)
    formData.append('product_price', product_price.value)
    formData.append('product_stock', product_stock.value)
    formData.append('product_image', product_image.value)
    formData.append('product_tag', product_tag.value)
    formData.append('_method', 'PUT')
    await props.method(formData, props.product.id)
    processing.value = false
}

const changePlaceholder = event => {
    const file = event.target.files[0]
    if (file) {
        product_image.value = file
        imageSrc.value = URL.createObjectURL(file)
    }
}
</script>

<template>
    <v-dialog>
        <template v-slot:activator="{ props: activatorProps }">
            <div
                v-bind="activatorProps"
                class="flex gap-2 items-center text-white bg-secondary-2 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                <i class="fa-solid fa-pen"></i>
                <p>Edit</p>
            </div>
        </template>

        <template v-slot:default="{ isActive }">
            <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
                <div
                    class="flex justify-between border-b py-3 px-4 items-center">
                    <p class="font-medium text-lg">Edit Product</p>
                    <button
                        @click="isActive.value = false"
                        class="fa-solid fa-x rounded-xl hover:bg-gray-100 px-3 py-2"></button>
                </div>

                <div class="px-5 py-3">
                    <form
                        @submit.prevent="handleEdit"
                        enctype="multipart/form-data">
                        <div class="space-y-3">
                            <div class="grid grid-cols-2 gap-3">
                                <div class="col-span-2 flex justify-center">
                                    <div
                                        class="flex justify-center w-40 flex-none">
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
                                                        accept="image/*"
                                                        type="file"
                                                        class="absolute bottom-0 opacity-0 w-40 h-2"
                                                        id="pictureInput"
                                                        @change="
                                                            changePlaceholder
                                                        " />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label for="product_name">Name</label>
                                    <input
                                        class="text-sm rounded-lg bg-gray-100 w-full"
                                        type="text"
                                        v-model="product_name"
                                        id="product_name"
                                        placeholder="Enter Product Name"
                                        required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label for="product_price">Price</label>
                                    <input
                                        class="text-sm rounded-lg bg-gray-100 w-full"
                                        type="number"
                                        v-model="product_price"
                                        id="product_price"
                                        placeholder="Enter Product Price"
                                        required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label for="product_stock">Stock</label>
                                    <input
                                        class="text-sm rounded-lg bg-gray-100 w-full"
                                        type="number"
                                        v-model="product_stock"
                                        id="product_stock"
                                        placeholder="Enter Product Stock"
                                        required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label for="product_tag">Tag</label>
                                    <input
                                        class="text-sm rounded-lg bg-gray-100 w-full"
                                        type="text"
                                        v-model="product_tag"
                                        id="product_tag"
                                        placeholder="Enter Product Tag"
                                        required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label for="product_tag">Category</label>
                                    <vSelect
                                        v-model="selectedCategory"
                                        :options="subcategories_option"
                                        placeholder="Enter Category"
                                        class="w-full">
                                        <option value=""></option>
                                    </vSelect>
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
