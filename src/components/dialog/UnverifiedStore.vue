<script setup>
import { ref, computed } from 'vue'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'
import KYCVerification from './KYCVerification.vue'
import KYCImage from '@/assets/images/kyc-image.png'
import { useFileStore } from '../../stores/file'
import listOfAcceptedIndustryCategoriesArray from '@/data/listOfAcceptedIndustryCategories.js'
import countryArrayData from '@/data/countryArray.js'
import { useStoreStore } from '../../stores/store'

const props = defineProps({
    user: {
        type: Object,
        default: null,
    },
})
const storeStore = useStoreStore()
const listOfAcceptedIndustryCategories = listOfAcceptedIndustryCategoriesArray
const countryArray = countryArrayData

const form = ref({
    business_detail: {
        type: 'INDIVIDUAL',
        legal_name: null,
        trading_name: null,
        description: null,
        industry_category: '',
        industry_category_option: '',
        date_of_registration: null,
        country_of_operation: '',
    },
    individual_details: [
        {
            type: '',
            role: 'Owner',
            given_names: null,
            surname: null,
            phone_number: null,
            email: null,
            nationality: null,
            nationality_options: null,
            place_of_birth: null,
            date_of_birth: null,
            gender: null,
            tax_identification_number: null,
        },
    ],
    address: {
        country: null,
        city: null,
        province_state: null,
        street_line1: null,
        street_line2: null,
        district: null,
        sub_district: null,
        postal_code: '',
    },
    kyc_documents: [
        {
            country: 'ID',
            type: 'AUTHORIZED_PERSON_KTP_DOCUMENT',
            expires_at: null,
            file_id: null,
            file: null,
        },
        {
            country: 'ID',
            type: 'ID_INDIVIDUAL_NPWP',
            expires_at: null,
            file_id: null,
            file: null,
        },
    ],
    // CORPORATION: [
    //     {
    //         country: 'ID',
    //         type: 'ID_KTP',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_COMPANY_NPWP',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_NIB',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_AKTA',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_SKMENKEH',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    // ],
    // SOLE_PROPRIETORSHIP: [
    //     {
    //         country: 'ID',
    //         type: 'ID_KTP',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_INDIVIDUAL_NPWP',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_NIB',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_SPP_PP',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_SERT_PP',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    // ],

    // PARTNERSHIP: [
    //     {
    //         country: 'ID',
    //         type: 'ID_KTP',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_COMPANY_NPWP',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_NIB',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'ID_AKTA',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    // ],
    // FOREIGN: [
    //     {
    //         country: 'ID',
    //         type: 'PASSPORT',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'FOREIGN_BUSINESS_LICENSE',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    //     {
    //         country: 'ID',
    //         type: 'FOREIGN_REGISTRATION_DOCUMENT',
    //         expires_at: null,
    //         file_id: null,
    //         file: null,
    //     },
    // ],
    website_url: 'jb.com',
    phone_number: '6281223410886',
    email: 'ardanwungkul145@gmail.com',
})

const phone_number = ref()
const phone_number_data = ref()

function phoneNumberInput(value, info) {
    phone_number_data.value = info
    if (info.valid == true) {
        form.value.individual_details[0].phone_number = info.number
    } else {
        form.value.individual_details[0].phone_number = null
    }
}

const tab = ref(null)

const completedSteps = ref([])
const isTabEnabled = tabNumber => {
    if (tabNumber === 1) return true
    if (tabNumber === 2) return completedSteps.value.includes(1)
    if (tabNumber === 3) return completedSteps.value.includes(2)
    return false
}

const completeStep = stepNumber => {
    if (!completedSteps.value.includes(stepNumber)) {
        completedSteps.value.push(stepNumber)
        if (stepNumber !== 3) {
            tab.value++
        }
    } else {
        tab.value++
    }
}

const fileStore = useFileStore()
const fileInput = ref(null)
const uploadedFile = ref(null)
const filePreviewUrl = ref('')
const isUploading = ref(false)
const uploadError = ref('')

const uploadedFileName = computed(() => {
    return uploadedFile.value?.name || 'Uploaded file'
})

const uploadedFileSize = computed(() => {
    return uploadedFile.value?.size || 0
})

const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileUpload = async event => {
    const file = event.target.files[0]
    if (!file) return

    uploadError.value = ''

    uploadedFile.value = file

    if (file.type.startsWith('image/')) {
        filePreviewUrl.value = URL.createObjectURL(file)
    }

    const formData = new FormData()
    formData.append('file', file)

    await fileStore.post(formData, form, isUploading)
}

const editFile = () => {
    triggerFileInput()
}

const removeFile = () => {
    if (filePreviewUrl.value) {
        URL.revokeObjectURL(filePreviewUrl.value)
    }

    form.value.kyc_documents[0].file_id = null
    uploadedFile.value = null
    filePreviewUrl.value = ''
    uploadError.value = ''
    isUploading.value = false

    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
const shortenFileName = (fileName, maxLength = 25) => {
    if (!fileName) return ''

    if (fileName.length <= maxLength) {
        return fileName
    }

    const extension = fileName.split('.').pop()
    const nameWithoutExtension = fileName.slice(0, -(extension.length + 1))

    const charsEachSide = Math.floor((maxLength - extension.length - 3) / 2)

    const start = nameWithoutExtension.slice(0, charsEachSide)
    const end = nameWithoutExtension.slice(-charsEachSide)

    return `${start}...${end}.${extension}`
}

async function submit() {
    await storeStore.kyc(form)
}

function selectedIndustryCategory(value) {
    form.value.business_detail.industry_category = value.value
}
function removedIndustryCategory(value) {
    form.value.business_detail.industry_category = null
}
function selectedNationality(value) {
    form.value.individual_details[0].nationality = value.code
}
function removedNationality(value) {
    form.value.individual_details[0].nationality = null
}
</script>
<template>
    <div
        class="w-full h-screen fixed z-[99999999] p-10 bg-black/10 backdrop-blur-sm flex items-center justify-center">
        <div
            class="flex w-full h-full bg-ezzora-50 dark:bg-dark-primary-2 border dark:border-white rounded-xl px-10 py-5 max-w-4xl">
            <div class="h-full border-r pr-10 flex-none text-xs">
                <ul class="space-y-5">
                    <li class="flex items-center gap-2">
                        <div
                            :class="
                                user !== null ? 'text-white !bg-green-500' : ''
                            "
                            class="rounded-full w-6 h-6 border dark:border-typography-1 flex items-center justify-center">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <p class="dark:text-white">Create your account</p>
                    </li>
                    <li class="flex items-center gap-2">
                        <div
                            :class="
                                user?.store?.status_kyc == null
                                    ? 'border-dashed'
                                    : ''
                            "
                            class="rounded-full w-6 h-6 border dark:border-typography-1 flex items-center justify-center">
                            <i
                                class=""
                                :class="
                                    user?.store?.status_kyc == 'VERIFIED'
                                        ? 'fa-solid fa-check'
                                        : ''
                                "></i>
                        </div>
                        <p class="dark:text-white">Complete activation form</p>
                    </li>
                </ul>
            </div>
            <!-- <KYCVerification /> -->
            <div
                v-if="user?.store?.status_kyc == null"
                class="h-full pl-10 w-full">
                <div class="dark:text-white h-full">
                    <div class="w-full flex flex-col h-full">
                        <!-- <pre class="text-[8px]">
                            {{ form }}
                        </pre> -->
                        <v-tabs
                            v-model="tab"
                            align-tabs="center"
                            grow="true"
                            height="auto">
                            <v-tab :value="1">
                                <div
                                    class="pt-1 pb-3 flex flex-col justify-center items-center gap-2">
                                    <div
                                        class="border rounded-full w-7 h-7 border-white flex items-center justify-center">
                                        <p>1</p>
                                    </div>
                                    <p>Business Details</p>
                                </div>
                            </v-tab>
                            <v-tab :value="2" :disabled="!isTabEnabled(2)">
                                <div
                                    class="pt-1 pb-3 flex flex-col justify-center items-center gap-2">
                                    <div
                                        class="border rounded-full w-7 h-7 border-white flex items-center justify-center">
                                        <p>2</p>
                                    </div>
                                    <p>Individual Details</p>
                                </div>
                            </v-tab>
                            <v-tab :value="3" :disabled="!isTabEnabled(3)">
                                <div
                                    class="pt-1 pb-3 flex flex-col justify-center items-center gap-2">
                                    <div
                                        class="border rounded-full w-7 h-7 border-white flex items-center justify-center">
                                        <p>3</p>
                                    </div>
                                    <p>Verification</p>
                                </div>
                            </v-tab>
                        </v-tabs>
                        <v-tabs-window v-model="tab" class="h-full">
                            <v-tabs-window-item :value="1" class="h-full">
                                <div
                                    class="flex w-full h-full overflow-y-scroll invisible-scrollbar !py-5 !px-1">
                                    <form
                                        class="w-full"
                                        @submit.prevent="completeStep(1)">
                                        <div
                                            class="space-y-3 w-full h-full relative overflow-y-auto invisible-scrollbar">
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="type"
                                                    >Type Of Business</label
                                                >
                                                <select
                                                    id="type"
                                                    v-model="
                                                        form.business_detail
                                                            .type
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    <option
                                                        value=""
                                                        selected
                                                        disabled>
                                                        Select Type Of Business
                                                    </option>
                                                    <option
                                                        value="CORPORATION"
                                                        disabled>
                                                        Corporation
                                                    </option>
                                                    <option
                                                        value="PARTNERSHIP"
                                                        disabled>
                                                        Partnership
                                                    </option>
                                                    <option
                                                        value="SOLE_PROPRIETORSHIP"
                                                        disabled>
                                                        Sole Proprietorship
                                                    </option>
                                                    <option value="INDIVIDUAL">
                                                        Individual
                                                    </option>
                                                </select>
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="legal_name"
                                                    >Legal Name</label
                                                >
                                                <input
                                                    id="legal_name"
                                                    v-model="
                                                        form.business_detail
                                                            .legal_name
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Business Legal Name"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="trading_name"
                                                    >Business Name</label
                                                >
                                                <input
                                                    id="trading_name"
                                                    v-model="
                                                        form.business_detail
                                                            .trading_name
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Business/Brand Name"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="description"
                                                    >Description</label
                                                >
                                                <textarea
                                                    id="description"
                                                    v-model="
                                                        form.business_detail
                                                            .description
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Description of the business"
                                                    rows="3"
                                                    required>
                              ></textarea
                                                >
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="industry_category"
                                                    >Industry Category</label
                                                >
                                                <multiselect
                                                    v-model="
                                                        form.business_detail
                                                            .industry_category_option
                                                    "
                                                    :options="
                                                        listOfAcceptedIndustryCategories
                                                    "
                                                    :searchable="true"
                                                    :close-on-select="true"
                                                    label="view"
                                                    :multiple="false"
                                                    track-by="view"
                                                    :preserve-search="true"
                                                    placeholder=" Select Industry Category"
                                                    :required="true"
                                                    @select="
                                                        selectedIndustryCategory
                                                    "
                                                    @remove="
                                                        removedIndustryCategory
                                                    " />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="date_of_registration"
                                                    >Date Of Registration</label
                                                >
                                                <input
                                                    id="date_of_registration"
                                                    v-model="
                                                        form.business_detail
                                                            .date_of_registration
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="date"
                                                    placeholder="Enter Date Of Registration"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="country_of_operation"
                                                    >Country Of Operation</label
                                                >
                                                <select
                                                    id="country_of_operation"
                                                    v-model="
                                                        form.business_detail
                                                            .country_of_operation
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected>
                                                        Select Country Of
                                                        Operation
                                                    </option>
                                                    <option value="ID">
                                                        Indonesia
                                                    </option>
                                                    <option value="PH">
                                                        Philippines
                                                    </option>
                                                    <option value="VN">
                                                        Vietnam
                                                    </option>
                                                    <option value="MY">
                                                        Malaysia
                                                    </option>
                                                    <option value="TH">
                                                        Thailand
                                                    </option>
                                                </select>
                                            </div>
                                            <div
                                                class="flex justify-end sticky bottom-0 pt-3 dark:bg-dark-primary-2">
                                                <button
                                                    class="bg-green-200 text-green-700 px-5 py-1 text-sm rounded-lg"
                                                    type="submit">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </v-tabs-window-item>
                            <v-tabs-window-item :value="2" class="h-full">
                                <div
                                    class="flex w-full h-full overflow-y-scroll invisible-scrollbar !py-5 !px-1">
                                    <form
                                        class="w-full"
                                        @submit.prevent="completeStep(2)">
                                        <div
                                            class="space-y-3 w-full h-full relative overflow-y-auto invisible-scrollbar px-1">
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="type"
                                                    >Individual Type</label
                                                >
                                                <select
                                                    id="type"
                                                    v-model="
                                                        form
                                                            .individual_details[0]
                                                            .type
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    <option
                                                        value=""
                                                        selected
                                                        disabled>
                                                        Select Type Of
                                                        Individual
                                                    </option>
                                                    <option value="PIC">
                                                        PIC
                                                    </option>
                                                    <option
                                                        value="Incorporator">
                                                        Incorporator
                                                    </option>
                                                </select>
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="given_names"
                                                    >Given Names</label
                                                >
                                                <input
                                                    id="given_names"
                                                    v-model="
                                                        form
                                                            .individual_details[0]
                                                            .given_names
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Your Given Names"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="surname"
                                                    >Surname</label
                                                >
                                                <input
                                                    id="surname"
                                                    v-model="
                                                        form
                                                            .individual_details[0]
                                                            .surname
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Your Surname"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm dark">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="phone_number"
                                                    >Phone Number</label
                                                >
                                                <vue-tel-input
                                                    id="phone_number"
                                                    v-model="phone_number"
                                                    class="text-sm !rounded-lg bg-light-primary-1 w-full hover:!dark:bg-dark-primary-2 dark:!bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3 dark:dark-theme"
                                                    mode="international"
                                                    default-country="ID"
                                                    :auto-format="true"
                                                    :enable-long-numbers="true"
                                                    :dropdown-options="{
                                                        showSearchBox: true,
                                                        showFlags: true,
                                                    }"
                                                    :input-options="{
                                                        styleClasses:
                                                            'bg-dark-primary-1',
                                                        required: true,
                                                        type: 'tel',
                                                    }"
                                                    :valid-characters-only="
                                                        true
                                                    "
                                                    @on-input="
                                                        phoneNumberInput
                                                    " />
                                                <p
                                                    v-if="
                                                        phone_number_data?.valid ===
                                                        false
                                                    "
                                                    class="text-xs text-red-500">
                                                    Invalid Format Phone Number
                                                </p>
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="email"
                                                    >Email</label
                                                >
                                                <input
                                                    id="email"
                                                    v-model="
                                                        form
                                                            .individual_details[0]
                                                            .email
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="email"
                                                    placeholder="Enter Your E-Mail Address"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="nationality"
                                                    >Nationality</label
                                                >
                                                <multiselect
                                                    v-model="
                                                        form
                                                            .individual_details[0]
                                                            .nationality_options
                                                    "
                                                    :options="countryArray"
                                                    :searchable="true"
                                                    :close-on-select="true"
                                                    label="name"
                                                    :multiple="false"
                                                    track-by="name"
                                                    :preserve-search="true"
                                                    placeholder="Select Nationality"
                                                    required
                                                    @select="
                                                        selectedNationality
                                                    "
                                                    @remove="
                                                        removedNationality
                                                    " />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="place_of_birth"
                                                    >Place Of Birth</label
                                                >
                                                <input
                                                    id="place_of_birth"
                                                    v-model="
                                                        form
                                                            .individual_details[0]
                                                            .place_of_birth
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Your Place Of Birth"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="date_of_birth"
                                                    >Date Of Birth</label
                                                >
                                                <input
                                                    id="date_of_birth"
                                                    v-model="
                                                        form
                                                            .individual_details[0]
                                                            .date_of_birth
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="date"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="gender"
                                                    >Gender</label
                                                >
                                                <select
                                                    id="gender"
                                                    v-model="
                                                        form
                                                            .individual_details[0]
                                                            .gender
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    <option
                                                        :value="null"
                                                        selected
                                                        disabled>
                                                        Select Gender
                                                    </option>
                                                    <option value="MALE">
                                                        MALE
                                                    </option>
                                                    <option value="FEMALE">
                                                        FEMALE
                                                    </option>
                                                    <option value="Other">
                                                        OTHER
                                                    </option>
                                                </select>
                                            </div>
                                            <fieldset
                                                class="border border-typography-2 rounded-lg text-sm p-5 space-y-3 w-full">
                                                <legend class="p-5">
                                                    Address
                                                </legend>
                                                <div
                                                    class="flex flex-col gap-2 text-sm !-mt-5">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="country"
                                                        >Country</label
                                                    >
                                                    <select
                                                        id="country"
                                                        v-model="
                                                            form.address.country
                                                        "
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required>
                                                        <option
                                                            :value="null"
                                                            selected
                                                            disabled>
                                                            Select Country
                                                        </option>
                                                        <option value="ID">
                                                            Indonesia
                                                        </option>
                                                        <option value="PH">
                                                            Philippines
                                                        </option>
                                                        <option value="VN">
                                                            Vietnam
                                                        </option>
                                                        <option value="MY">
                                                            Malaysia
                                                        </option>
                                                        <option value="TH">
                                                            Thailand
                                                        </option>
                                                    </select>
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="city"
                                                        >City</label
                                                    >
                                                    <input
                                                        id="city"
                                                        v-model="
                                                            form.address.city
                                                        "
                                                        type="text"
                                                        placeholder="Enter City"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="province_state"
                                                        >Province State</label
                                                    >
                                                    <input
                                                        id="province_state"
                                                        v-model="
                                                            form.address
                                                                .province_state
                                                        "
                                                        type="text"
                                                        placeholder="Enter Province State"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="street_line1"
                                                        >Street Line 1</label
                                                    >
                                                    <input
                                                        id="street_line1"
                                                        v-model="
                                                            form.address
                                                                .street_line1
                                                        "
                                                        type="text"
                                                        placeholder="Enter Street Line 1"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="street_line2"
                                                        >Street Line 2</label
                                                    >
                                                    <input
                                                        id="street_line2"
                                                        v-model="
                                                            form.address
                                                                .street_line2
                                                        "
                                                        type="text"
                                                        placeholder="Enter Street Line 2"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="district"
                                                        >District</label
                                                    >
                                                    <input
                                                        id="district"
                                                        v-model="
                                                            form.address
                                                                .district
                                                        "
                                                        type="text"
                                                        placeholder="Enter District"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="sub_district"
                                                        >Sub District</label
                                                    >
                                                    <input
                                                        id="sub_district"
                                                        v-model="
                                                            form.address
                                                                .sub_district
                                                        "
                                                        type="text"
                                                        placeholder="Enter Sub District"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="postal_code"
                                                        >Postal Code</label
                                                    >
                                                    <input
                                                        id="postal_code"
                                                        v-model="
                                                            form.address
                                                                .postal_code
                                                        "
                                                        type="number"
                                                        placeholder="Enter Postal Code"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required
                                                        @input="
                                                            form.address.postal_code =
                                                                form.address.postal_code.toString()
                                                        " />
                                                </div>
                                            </fieldset>

                                            <div
                                                class="flex justify-end sticky bottom-0 pt-3 dark:bg-dark-primary-2">
                                                <button
                                                    class="bg-green-200 text-green-700 px-5 py-1 text-sm rounded-lg"
                                                    type="submit">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </v-tabs-window-item>
                            <v-tabs-window-item :value="3" class="h-full">
                                <div
                                    class="flex w-full h-full overflow-y-scroll invisible-scrollbar !py-5 !px-1">
                                    <div
                                        class="w-full h-full dark:bg-dark-primary-2 rounded-xl relative max-w-sm mx-auto">
                                        <img
                                            :src="KYCImage"
                                            class="w-full max-w-40 mx-auto"
                                            alt="" />
                                        <div class="px-5 py-3">
                                            <p
                                                class="dark:text-white text-center text-2xl font-semibold font-poppins tracking-widest">
                                                Let's Verify KYC
                                            </p>
                                        </div>
                                        <form @submit.prevent="submit">
                                            <div class="space-y-3">
                                                <button
                                                    type="button"
                                                    class="flex gap-5 items-center p-3 w-full"
                                                    :disabled="isUploading"
                                                    @click="triggerFileInput">
                                                    <i
                                                        class="fa-solid fa-id-card !text-3xl text-gray-600 dark:text-gray-300"></i>
                                                    <div
                                                        class="w-full text-left">
                                                        <p
                                                            class="text-sm font-medium dark:text-white">
                                                            Take a Picture of
                                                            Your Valid ID
                                                        </p>
                                                        <p
                                                            class="text-xs font-light text-gray-500 dark:text-gray-400">
                                                            To check your
                                                            personal
                                                            informations are
                                                            correct
                                                        </p>
                                                    </div>
                                                    <i
                                                        class="fa-solid text-gray-400"
                                                        :class="
                                                            form
                                                                .kyc_documents[0]
                                                                .file_id
                                                                ? 'fa-check-circle text-green-500'
                                                                : 'fa-chevron-right'
                                                        "></i>
                                                </button>
                                                <!-- File Preview -->
                                                <div
                                                    v-if="
                                                        form.kyc_documents[0]
                                                            .file_id
                                                    "
                                                    class="mt-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                                                    <div
                                                        class="flex items-center justify-between">
                                                        <div
                                                            class="flex items-center space-x-3">
                                                            <i
                                                                class="fa-solid fa-file text-blue-500 text-xl"></i>
                                                            <div>
                                                                <p
                                                                    class="text-sm font-medium dark:text-white">
                                                                    {{
                                                                        shortenFileName(
                                                                            uploadedFileName,
                                                                        )
                                                                    }}
                                                                </p>
                                                                <p
                                                                    class="text-xs text-gray-500 dark:text-gray-400">
                                                                    {{
                                                                        formatFileSize(
                                                                            uploadedFileSize,
                                                                        )
                                                                    }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flex items-center space-x-2">
                                                            <!-- Tombol Edit -->
                                                            <button
                                                                :disabled="
                                                                    isUploading
                                                                "
                                                                type="button"
                                                                class="text-blue-500 hover:text-blue-700 transition-colors"
                                                                @click="
                                                                    editFile
                                                                ">
                                                                <i
                                                                    class="fa-solid fa-pen-to-square text-lg"></i>
                                                            </button>
                                                            <!-- Tombol Hapus -->
                                                            <button
                                                                type="button"
                                                                class="text-red-500 hover:text-red-700 transition-colors"
                                                                :disabled="
                                                                    isUploading
                                                                "
                                                                @click="
                                                                    removeFile
                                                                ">
                                                                <i
                                                                    class="fa-solid fa-times text-lg"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <!-- Image Preview -->
                                                    <div
                                                        v-if="
                                                            form
                                                                .kyc_documents[0]
                                                                .file_id
                                                        "
                                                        class="mt-3">
                                                        <img
                                                            :src="
                                                                filePreviewUrl
                                                            "
                                                            alt="Preview"
                                                            class="w-full object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                                                            :style="{
                                                                maxHeight:
                                                                    previewImageHeight +
                                                                    'px',
                                                            }" />
                                                    </div>
                                                </div>

                                                <!-- Loading State -->
                                                <div
                                                    v-if="isUploading"
                                                    class="mt-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                                                    <div
                                                        class="flex items-center space-x-3">
                                                        <i
                                                            class="fa-solid fa-spinner fa-spin text-blue-500 text-xl"></i>
                                                        <div>
                                                            <p
                                                                class="text-sm font-medium dark:text-white">
                                                                Uploading
                                                                file...
                                                            </p>
                                                            <p
                                                                class="text-xs text-gray-500 dark:text-gray-400">
                                                                Please wait
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Error Message -->
                                                <div
                                                    v-if="uploadError"
                                                    class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                                    <p class="text-sm">
                                                        {{ uploadError }}
                                                    </p>
                                                </div>

                                                <input
                                                    ref="fileInput"
                                                    type="file"
                                                    class="hidden"
                                                    accept="image/*"
                                                    capture="environment"
                                                    @change="
                                                        handleFileUpload
                                                    " />
                                                <input
                                                    v-model="
                                                        form.kyc_documents[0]
                                                            .file_id
                                                    "
                                                    type="hidden"
                                                    name="id_file" />

                                                <!-- Submit Button -->
                                                <button
                                                    v-if="
                                                        form.kyc_documents[0]
                                                            .file_id &&
                                                        !isUploading
                                                    "
                                                    type="submit"
                                                    class="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors mt-4">
                                                    Complete Verification
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <!-- <form
                                        class="w-full"
                                        @submit.prevent="tab++">
                                        <div
                                            class="space-y-3 w-full h-full relative overflow-y-auto invisible-scrollbar px-1">
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="country"
                                                    >Country</label
                                                >
                                                <select
                                                    id="country"
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    <option value="" disabled>
                                                        Select Country
                                                    </option>
                                                    <option selected value="ID">
                                                        Indonesia
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="pb-10">
                                                <div
                                                    v-if="
                                                        form.business_detail
                                                            .type ==
                                                        'CORPORATION'
                                                    "
                                                    class="!space-y-3">
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_ktp"
                                                            >ID Card</label
                                                        >
                                                        <input
                                                            id="corporation_id_ktp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_company_npwp"
                                                            >NPWP Company</label
                                                        >
                                                        <input
                                                            id="corporation_id_company_npwp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_nib"
                                                            >NIB</label
                                                        >
                                                        <input
                                                            id="corporation_id_nib"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_akta"
                                                            >Deed of
                                                            Incorporation</label
                                                        >
                                                        <input
                                                            id="corporation_id_akta"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_skmenkeh"
                                                            >SKMENKEH</label
                                                        >
                                                        <input
                                                            id="corporation_id_skmenkeh"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="
                                                        form.business_detail
                                                            .type ==
                                                        'SOLE_PROPRIETORSHIP'
                                                    "
                                                    class="!space-y-3">
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_ktp"
                                                            >ID Card</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_ktp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_individual_npwp"
                                                            >Individual
                                                            NPWP</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_individual_npwp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_nib"
                                                            >NIB</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_nib"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_spp_pp"
                                                            >SPP PP</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_spp_pp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_sert_pp"
                                                            >Sertification
                                                            PP</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_sert_pp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="
                                                        form.business_detail
                                                            .type ==
                                                        'INDIVIDUAL'
                                                    "
                                                    class="!space-y-3">
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="individual_id_card"
                                                            >ID Card</label
                                                        >
                                                        <input
                                                            id="individual_id_card"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="individual_id_npwp"
                                                            >Individual
                                                            NPWP</label
                                                        >
                                                        <input
                                                            id="individual_id_npwp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="
                                                        form.business_detail
                                                            .type ==
                                                        'PARTNERSHIP'
                                                    "
                                                    class="!space-y-3">
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="partnership_id_card"
                                                            >ID Card</label
                                                        >
                                                        <input
                                                            id="partnership_id_card"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="partnership_id_company_npwp"
                                                            >NPWP Company</label
                                                        >
                                                        <input
                                                            id="partnership_id_company_npwp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="partnership_id_nib"
                                                            >NIB</label
                                                        >
                                                        <input
                                                            id="partnership_id_nib"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="partnership_id_akta"
                                                            >Deed Of
                                                            Corporation</label
                                                        >
                                                        <input
                                                            id="partnership_id_akta"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="flex justify-end sticky bottom-0 pt-3 dark:bg-dark-primary-2">
                                            <button
                                                class="bg-green-200 text-green-700 px-5 py-1 text-sm rounded-lg"
                                                type="submit">
                                                Next
                                            </button>
                                        </div>
                                    </form> -->
                                </div>
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.vti__dropdown:hover,
.vti__dropdown:active,
.vti__dropdown:focus,
.vti__dropdown.open {
    background-color: #1d1d29 !important;
    border-radius: 0.5rem 0 0 0.5rem !important;
}

.dark .vti__dropdown-list {
    padding: 5px;
    background-color: #1d1d29 !important;
    border: 1px solid #11121e;
    border-radius: 8px !important;
}
.dark .vti__dropdown-list::-webkit-scrollbar {
    display: none;
}
.dark .vti__dropdown-item.highlighted {
    background-color: #1d1d29 !important;
    padding: 4px 5px;
}
.dark .vti__dropdown-item {
    background-color: #11121e !important;
    padding: 4px 5px;
}
.dark .vti__dropdown:hover {
    background-color: #1d1d29 !important;
}
.vti__search_box {
    width: 100%;
}
.dark .vti__input.vti__search_box {
    background-color: #1d1d29 !important;
    margin: 0px;
    margin-bottom: 10px;
    font-size: 14px;
    border-radius: 8px !important;
}
.vti__input {
    font-size: 14px;
}
</style>
