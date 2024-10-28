<script setup>
import { onMounted, ref, computed, onBeforeMount } from 'vue'
import { useAddressStore } from '@/stores/address'
import { useUsers } from '@/stores/user'

const storeAddress = useAddressStore()
const storeUser = useUsers()
const processing = ref(false)
const form = ref({
    selectedProvince: null,
    selectedCity: null,
    selectedSubdistrict: null,
    selectedVillage: null,
    selectedPostCode: null,
    name: null,
    phoneNumber: null,
    detail: null,
})

const provinces = ref([])
const cities = ref([])
const subdistricts = ref([])
const villages = ref([])
const post_codes = ref([])

const toggleOpenProvince = ref(false)
const tab = ref(null)
const isActive = ref(false)
const inputNewAddress = computed(() => {
    const p = form.value.selectedProvince?.name || ''
    const c = form.value.selectedCity?.name || ''
    const s = form.value.selectedSubdistrict?.name || ''
    const v = form.value.selectedVillage?.name || ''
    const pc = form.value.selectedPostCode?.post_code || ''

    return [p, c, s, v, pc].filter(Boolean).join(', ')
})

onMounted(async () => {
    await storeAddress.getProvince()
    provinces.value = storeAddress.province
})
onBeforeMount(() => {
    if (storeUser.authUser) {
        if (!storeUser.hasUserData) {
            storeUser.getData()
        }
    }
})
const onProvinceSelect = async province => {
    form.value.selectedCity = null
    form.value.selectedSubdistrict = null
    form.value.selectedVillage = null
    form.value.selectedPostCode = null
    cities.value = []
    subdistricts.value = []
    villages.value = []
    post_codes.value = []

    form.value.selectedProvince = province
    tab.value = 'city'

    await storeAddress.getCitiesByProvince(province.id)
    cities.value = storeAddress.city
}
const onCitySelect = async city => {
    form.value.selectedSubdistrict = null
    form.value.selectedVillage = null
    form.value.selectedPostCode = null
    subdistricts.value = []
    villages.value = []
    post_codes.value = []

    form.value.selectedCity = city
    tab.value = 'district'

    await storeAddress.getSubdistrictsByCity(city.id)
    subdistricts.value = storeAddress.subdistrict
}
const onSubdistrictSelect = async subdistrict => {
    form.value.selectedVillage = null
    form.value.selectedPostCode = null
    villages.value = []
    post_codes.value = []

    form.value.selectedSubdistrict = subdistrict
    tab.value = 'village'
    await storeAddress.getVillagesBySubdistrict(subdistrict.id)
    villages.value = storeAddress.village
    await storeAddress.getPostCodeByVillage(subdistrict.id)
    post_codes.value = storeAddress.post_code
}
const onVillageSelect = async village => {
    form.value.selectedVillage = village
    tab.value = 'post_code'
}
const onPostCodeSelect = async post_code => {
    form.value.selectedPostCode = post_code
    toggleOpenProvince.value = false
}

const addNewAddress = async () => {
    if (
        !form.value.selectedProvince?.id ||
        !form.value.selectedCity?.id ||
        !form.value.selectedSubdistrict?.id ||
        !form.value.selectedVillage?.id ||
        !form.value.selectedPostCode?.id
    ) {
        alert('Please make sure all address fields are filled.')
        return
    }
    const formData = new FormData()
    formData.append('province_id', form.value.selectedProvince.id)
    formData.append('city_id', form.value.selectedCity.id)
    formData.append('subdistrict_id', form.value.selectedSubdistrict.id)
    formData.append('village_id', form.value.selectedVillage.id)
    formData.append('post_code_id', form.value.selectedPostCode.id)
    formData.append('name', form.value.name)
    formData.append('phone_number', form.value.phoneNumber)
    formData.append('detail', form.value.detail)
    formData.append('user_id', storeUser.userData.id)

    await storeAddress.addData(formData, processing)
    isActive.value = false
}
</script>
<template>
    <v-dialog max-width="678" class="h-[90vh]" v-model="isActive">
        <template v-slot:activator="{ props: activatorProps }">
            <button
                v-bind="activatorProps"
                class="px-5 py-2 border rounded-lg duration-300 bg-ezzora-50 hover:bg-ezzora-100 text-sm shadow-lg">
                Add New Address
            </button>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card
                class="h-full !rounded-lg invisible-scrollbar"
                :max-width="768">
                <p
                    class="p-5 text-lg font-semibold border-b sticky top-0 bg-white">
                    Add New Address
                </p>
                <div class="p-5">
                    <form @submit.prevent="addNewAddress">
                        <div class="space-y-6 w-full">
                            <div class="w-full grid grid-cols-2 gap-3">
                                <div class="relative w-full">
                                    <input
                                        type="text"
                                        autocomplete="new-address"
                                        autocapitalize="off"
                                        autocorrect="off"
                                        v-model="form.name"
                                        required
                                        class="border w-full rounded-lg text-sm"
                                        placeholder="Enter Full Name" />
                                </div>
                                <div class="relative w-full">
                                    <input
                                        autocomplete="new-address"
                                        autocapitalize="off"
                                        autocorrect="off"
                                        v-model="form.phoneNumber"
                                        type="text"
                                        required
                                        class="border w-full rounded-lg text-sm"
                                        placeholder="Enter Phone Number" />
                                </div>
                            </div>
                            <div class="relative w-full">
                                <p
                                    class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                    Province, City, District, Village, Postal
                                    Code
                                </p>
                                <input
                                    type="text"
                                    autocomplete="new-address"
                                    autocapitalize="off"
                                    autocorrect="off"
                                    class="border w-full rounded-lg text-sm"
                                    @focus="toggleOpenProvince = true"
                                    @blur="toggleOpenProvince = false"
                                    v-model="inputNewAddress"
                                    readonly
                                    placeholder=" Province, City, District, Village, Postal Code" />
                                <div
                                    v-if="toggleOpenProvince"
                                    @mousedown.prevent
                                    class="border border-typography-2 w-full mt-3 rounded-lg z-10 absolute">
                                    <v-tabs
                                        color="primary"
                                        v-model="tab"
                                        bg-color="white"
                                        class="rounded-lg">
                                        <v-tab
                                            value="province"
                                            class="!text-sm !normal-case !font-semibold"
                                            >Province</v-tab
                                        >
                                        <v-tab
                                            value="city"
                                            class="!text-sm !normal-case !font-semibold"
                                            :disabled="!form.selectedProvince"
                                            >City</v-tab
                                        >
                                        <v-tab
                                            value="district"
                                            class="!text-sm !normal-case !font-semibold"
                                            :disabled="!form.selectedCity"
                                            >District</v-tab
                                        >
                                        <v-tab
                                            value="village"
                                            class="!text-sm !normal-case !font-semibold"
                                            :disabled="
                                                !form.selectedSubdistrict
                                            "
                                            >Village</v-tab
                                        >
                                        <v-tab
                                            value="post_code"
                                            class="!text-sm !normal-case !font-semibold"
                                            :disabled="!form.selectedVillage"
                                            >Post Code</v-tab
                                        >
                                    </v-tabs>

                                    <v-tabs-window v-model="tab">
                                        <v-tabs-window-item
                                            value="province"
                                            class="overflow-y-scroll max-h-60 !p-0 bg-white rounded-lg">
                                            <div
                                                class="border p-3 bg-white hover:!bg-light-primary-2 cursor-pointer"
                                                v-for="(
                                                    province, index
                                                ) in provinces"
                                                :key="index">
                                                <div
                                                    @click="
                                                        onProvinceSelect(
                                                            province,
                                                        )
                                                    "
                                                    :class="
                                                        form.selectedProvince &&
                                                        form.selectedProvince
                                                            ?.id == province.id
                                                            ? 'text-green-500'
                                                            : ''
                                                    ">
                                                    {{ province.name }}
                                                </div>
                                            </div>
                                        </v-tabs-window-item>

                                        <v-tabs-window-item
                                            value="city"
                                            class="overflow-y-scroll max-h-60 !p-0 bg-white rounded-lg">
                                            <div
                                                class="border p-3 bg-white hover:!bg-light-primary-2 cursor-pointer"
                                                v-for="(city, index) in cities"
                                                :key="index">
                                                <div
                                                    @click="onCitySelect(city)"
                                                    :class="
                                                        form.selectedCity &&
                                                        form.selectedCity?.id ==
                                                            city.id
                                                            ? 'text-green-500'
                                                            : ''
                                                    ">
                                                    {{ city.name }}
                                                </div>
                                            </div>
                                        </v-tabs-window-item>

                                        <v-tabs-window-item
                                            value="district"
                                            class="overflow-y-scroll max-h-60 !p-0 bg-white rounded-lg">
                                            <div
                                                class="border p-3 bg-white hover:!bg-light-primary-2 cursor-pointer"
                                                v-for="(
                                                    district, index
                                                ) in subdistricts"
                                                :key="index">
                                                <div
                                                    @click="
                                                        onSubdistrictSelect(
                                                            district,
                                                        )
                                                    "
                                                    :class="
                                                        form.selectedSubdistrict &&
                                                        form.selectedSubdistrict
                                                            ?.id == district.id
                                                            ? 'text-green-500'
                                                            : ''
                                                    ">
                                                    {{ district.name }}
                                                </div>
                                            </div>
                                        </v-tabs-window-item>
                                        <v-tabs-window-item
                                            value="village"
                                            class="overflow-y-scroll max-h-60 !p-0 bg-white rounded-lg">
                                            <div
                                                class="border p-3 bg-white hover:!bg-light-primary-2 cursor-pointer"
                                                v-for="(
                                                    village, index
                                                ) in villages"
                                                :key="index">
                                                <div
                                                    @click="
                                                        onVillageSelect(village)
                                                    "
                                                    :class="
                                                        form.selectedVillage &&
                                                        form.selectedVillage
                                                            ?.id == village.id
                                                            ? 'text-green-500'
                                                            : ''
                                                    ">
                                                    {{ village.name }}
                                                </div>
                                            </div>
                                        </v-tabs-window-item>
                                        <v-tabs-window-item
                                            value="post_code"
                                            class="overflow-y-scroll max-h-60 !p-0 bg-white rounded-lg">
                                            <div
                                                class="border p-3 bg-white hover:!bg-light-primary-2 cursor-pointer"
                                                v-for="(
                                                    post_code, index
                                                ) in post_codes"
                                                :key="index">
                                                <div
                                                    @click="
                                                        onPostCodeSelect(
                                                            post_code,
                                                        )
                                                    "
                                                    :class="
                                                        form.selectedPostCode &&
                                                        form.selectedPostCode
                                                            ?.id == post_code.id
                                                            ? 'text-green-500'
                                                            : ''
                                                    ">
                                                    {{ post_code.post_code }}
                                                </div>
                                            </div>
                                        </v-tabs-window-item>
                                    </v-tabs-window>
                                </div>
                            </div>
                            <div class="relative w-full">
                                <textarea
                                    autocomplete="new-address"
                                    autocapitalize="off"
                                    autocorrect="off"
                                    v-model="form.detail"
                                    required
                                    rows="5"
                                    class="border !border-typography-2 w-full rounded-lg text-sm"
                                    placeholder="Street Name, Building, House No."></textarea>
                            </div>
                            <div
                                class="pt-5 flex justify-end sticky bottom-5 bg-white border-t">
                                <div class="flex flex-row gap-3">
                                    <button
                                        type="button"
                                        @click="isActive.value = false"
                                        class="border py-2 px-5 text-sm rounded-lg duration-300 hover:bg-neutral-100">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        class="border py-2 px-5 text-sm rounded-lg bg-secondary-3 text-white duration-300 hover:opacity-80">
                                        Save Address
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </v-card>
        </template>
    </v-dialog>
</template>
<style>
.v-dialog {
    z-index: 999999 !important;
}
</style>
