<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'
import { useSubCategoryStore } from '@/stores/subcategory'
import { ref, onMounted, computed } from 'vue'
import { useVoucherStore } from '@/stores/voucher'
import placeholderImage from '@/assets/images/placeholder-image.jpg'
// import '@/assets/css/vuetify.css'

const store = useVoucherStore()
const subcategories = ref([])
const storeSubCategory = useSubCategoryStore()
const form = ref({
    voucher_name: null,
    voucher_code: null,
    voucher_validity: null,
    voucher_stock: null,
    sub_category_id: null,
    voucher_type: '',
    voucher_condition: '',
    voucher_condition_value: null,
    voucher_discount_type: '',
    voucher_discount_value: null,
    voucher_image_placeholder: placeholderImage,
    voucher_image: null,
    voucher_image_text_color: '#000000',
    voucher_auto_generate: false,
    voucher_maximum_value: null,
})

onMounted(async () => {
    await storeSubCategory.subCategoryAll()
    const fetchedSubcategories = storeSubCategory.subcategories
    subcategories.value = [
        { sub_category_name: 'Select All', id: 'select-all' },
        ...fetchedSubcategories,
    ]
})
const handleSelect = selected => {
    if (selected.id == 'select-all') {
        const allItems = subcategories.value.filter(
            item => item.id !== 'select-all',
        )
        form.value.sub_category_id = allItems.map(item => item)
    }
    if (Array.isArray(selected)) {
        const isSelectAll = selected.find(item => item.id === 'select-all')

        if (isSelectAll) {
            const allItems = subcategories.value.filter(
                item => item.id !== 'select-all',
            )
            form.value.sub_category_id = allItems.map(item => item.id)
        } else {
            form.value.sub_category_id = selected.map(item => item.id)
        }
    }
}
const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)

const inputCondition = async () => {
    if (form.value.voucher_condition == 'None') {
        form.value.voucher_condition_value = null
    }
}

const AddVoucher = async () => {
    const formData = new FormData()
    formData.append('voucher_name', form.value.voucher_name)
    if (!form.value.voucher_auto_generate) {
        formData.append('voucher_code', form.value.voucher_code)
    }
    if (form.value.voucher_maximum_value) {
        formData.append(
            'voucher_maximum_value',
            form.value.voucher_maximum_value,
        )
    }
    formData.append('voucher_validity', form.value.voucher_validity)
    formData.append('voucher_stock', form.value.voucher_stock)
    formData.append('voucher_type', form.value.voucher_type)
    formData.append('voucher_condition', form.value.voucher_condition)
    formData.append(
        'voucher_condition_value',
        form.value.voucher_condition_value,
    )
    form.value.sub_category_id.forEach(subcategories => {
        formData.append('sub_category_id[]', subcategories.id)
    })
    formData.append('voucher_discount_type', form.value.voucher_discount_type)
    formData.append('voucher_discount_value', form.value.voucher_discount_value)
    if (form.value.voucher_image) {
        formData.append('voucher_image', form.value.voucher_image)
        formData.append(
            'voucher_image_text_color',
            form.value.voucher_image_text_color,
        )
    }
    formData.append('voucher_auto_generate', form.value.voucher_auto_generate)
    await store.addVoucher(formData, setErrors, processing)
}
const changePlaceholder = event => {
    const file = event.target.files[0]
    if (file) {
        form.value.voucher_image_placeholder = URL.createObjectURL(file)
        form.value.voucher_image = file
    }
}
</script>
<template>
    <AdminLayout title="Add Voucher">
        <!-- {{ form }} -->
        <ValidationErrors class="w-full" :errors="errors" />
        <div class="w-full">
            <div class="px-5 py-3">
                <form @submit.prevent="AddVoucher">
                    <div class="space-y-3">
                        <div
                            class="border dark:!border-typography-3 dark-primary-2 border-gray-300 p-3 rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 transition-all">
                            <div class="grid grid-cols-2 gap-3 p-3">
                                <div class="flex flex-col gap-2 text-sm">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="voucher_name"
                                        >Voucher Name</label
                                    >
                                    <input
                                        v-model="form.voucher_name"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="text"
                                        id="voucher_name"
                                        placeholder="Enter Voucher Name"
                                        required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <div class="flex justify-between">
                                        <label
                                            class="dark:text-light-primary-1"
                                            for="voucher_code"
                                            >Voucher Code</label
                                        >
                                        <v-tooltip text="Auto Generate Code">
                                            <template
                                                v-slot:activator="{ props }">
                                                <input
                                                    v-bind="props"
                                                    type="checkbox"
                                                    v-model="
                                                        form.voucher_auto_generate
                                                    "
                                                    class="rounded-full"
                                                    id="" />
                                            </template>
                                        </v-tooltip>
                                    </div>
                                    <input
                                        v-model="form.voucher_code"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="text"
                                        :disabled="form.voucher_auto_generate"
                                        :value="
                                            form.voucher_auto_generate
                                                ? 'Code Voucher Auto Generate'
                                                : form.voucher_code
                                        "
                                        id="voucher_code"
                                        placeholder="Enter Voucher Code"
                                        required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="voucher_validity"
                                        >Voucher Validity</label
                                    >
                                    <input
                                        v-model="form.voucher_validity"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="date"
                                        id="voucher_validity"
                                        placeholder="Enter Voucher Validity"
                                        required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="voucher_stock"
                                        >Voucher Stock</label
                                    >
                                    <input
                                        v-model="form.voucher_stock"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="number"
                                        id="voucher_stock"
                                        placeholder="Enter Voucher Stock"
                                        required />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="subcategory_id"
                                        >Apply On</label
                                    >
                                    <multiselect
                                        v-model="form.sub_category_id"
                                        :options="subcategories"
                                        :searchable="true"
                                        :close-on-select="false"
                                        label="sub_category_name"
                                        :multiple="true"
                                        track-by="sub_category_name"
                                        :preserve-search="true"
                                        placeholder="Select Categories"
                                        @select="handleSelect">
                                        <template #option="{ option }">
                                            <div>
                                                {{ option.sub_category_name }}
                                            </div>
                                        </template>
                                    </multiselect>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="voucher_type"
                                        >Voucher type</label
                                    >
                                    <select
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="text"
                                        id="voucher_type"
                                        v-model="form.voucher_type"
                                        required>
                                        <option value="" selected disabled>
                                            Select Voucher Type
                                        </option>
                                        <option value="Auto Apply Code">
                                            Auto Apply Code
                                        </option>
                                        <option value="Apply Code">
                                            Apply Code
                                        </option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="voucher_condition"
                                        >Condition</label
                                    >
                                    <select
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="text"
                                        id="voucher_condition"
                                        v-model="form.voucher_condition"
                                        @change="inputCondition"
                                        required>
                                        <option value="" selected disabled>
                                            Select Voucher Condition
                                        </option>
                                        <option value="None">None</option>
                                        <option value="Minimum Purchase">
                                            Minimum Purchase
                                        </option>
                                        <option value="Minimum Order">
                                            Minimum Order
                                        </option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="voucher_conditon_value"
                                        >Condition Value</label
                                    >
                                    <input
                                        v-model="form.voucher_condition_value"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="number"
                                        id="voucher_conditon_value"
                                        placeholder="Enter Voucher Condition Value"
                                        :required="
                                            form.voucher_condition != 'None'
                                        "
                                        :disabled="
                                            form.voucher_condition == 'None' ||
                                            form.voucher_condition == ''
                                        " />
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="voucher_discount_type"
                                        >Voucher Discount Type</label
                                    >
                                    <select
                                        v-model="form.voucher_discount_type"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="text"
                                        id="voucher_discount_type"
                                        required>
                                        <option value="" selected disabled>
                                            Select Discount Type
                                        </option>
                                        <option value="Percent">Percent</option>
                                        <option value="Amount">Amount</option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2 text-sm">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="voucher_discount_value"
                                        >Voucher Discount Value</label
                                    >
                                    <input
                                        v-model="form.voucher_discount_value"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="number"
                                        id="voucher_discount_value"
                                        placeholder="Enter Voucher Condition Value"
                                        required />
                                </div>
                                <div
                                    class="flex flex-col gap-2 text-sm col-span-2"
                                    v-if="
                                        form.voucher_discount_type == 'Percent'
                                    ">
                                    <label
                                        class="dark:text-light-primary-1"
                                        for="voucher_maximum_value"
                                        >Voucher Maximum Value</label
                                    >
                                    <input
                                        v-model="form.voucher_maximum_value"
                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                        type="number"
                                        id="voucher_maximum_value"
                                        placeholder="Enter Voucher Maximum Value" />
                                </div>
                                <div class="col-span-2 space-y-2">
                                    <p class="dark:text-light-primary-1">
                                        Voucher Image
                                    </p>
                                    <div
                                        class="w-full border rounded-lg p-3 space-y-3">
                                        <div class="relative">
                                            <div
                                                class="rounded-lg flex justify-center gap-3 items-start">
                                                <label for="voucher_image">
                                                    <div class="relative">
                                                        <img
                                                            id="picture"
                                                            :src="
                                                                form.voucher_image_placeholder
                                                            "
                                                            class="object-contain h-40 rounded-lg border shadow-lg"
                                                            alt="Placeholder Image" />
                                                        <div
                                                            class="w-full h-40 bg-black opacity-0 hover:opacity-60 flex items-center rounded-lg absolute top-0">
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
                                                            id="voucher_image"
                                                            @change="
                                                                changePlaceholder
                                                            " />
                                                    </div>
                                                </label>
                                                <v-dialog max-width="500">
                                                    <template
                                                        v-slot:activator="{
                                                            props: activatorProps,
                                                        }">
                                                        <button
                                                            class="shadow-lg rounded-full w-7 h-7 fle items-center justify-center"
                                                            type="button"
                                                            v-bind="
                                                                activatorProps
                                                            ">
                                                            <i
                                                                :style="
                                                                    'color:' +
                                                                    form.voucher_image_text_color
                                                                "
                                                                class="fa-solid fa-font underline drop-shadow-2xl stroke-black"></i>
                                                        </button>
                                                    </template>

                                                    <template
                                                        v-slot:default="{
                                                            isActive,
                                                        }">
                                                        <div
                                                            class="bg-light-primary-1 p-3 rounded-lg">
                                                            <div
                                                                class="flex justify-between border-b pb-3 px-3">
                                                                <p
                                                                    class="font-medium">
                                                                    Change Code
                                                                    Font Color
                                                                </p>
                                                                <button
                                                                    type="button"
                                                                    @click="
                                                                        isActive.value = false
                                                                    ">
                                                                    <i
                                                                        class="fa-solid fa-x"></i>
                                                                </button>
                                                            </div>
                                                            <div
                                                                class="p-3 flex justify-center">
                                                                <v-color-picker
                                                                    v-model="
                                                                        form.voucher_image_text_color
                                                                    "
                                                                    :modes="[
                                                                        'hex',
                                                                        'hexa',
                                                                    ]"></v-color-picker>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </v-dialog>
                                            </div>
                                        </div>
                                    </div>
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
