<script setup>
import { onMounted, ref, computed, onBeforeMount } from 'vue'
import { useAddressStore } from '@/stores/address'
import { useUsers } from '@/stores/user'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'
import debounce from 'lodash/debounce'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

const storeAddress = useAddressStore()
const storeUser = useUsers()
const processing = ref(false)
const leaflet = ref({
    zoom: 2,
    marker: {
        long: null,
        lat: null,
    },
    center: [51.505, -0.159],
})
const options = ref([])
const isActive = ref(false)
const form = ref({
    search: null,
    map_id: null,
    subdistrict: null,
    city: null,
    province: null,
    post_code: null,
    name: null,
    phoneNumber: null,
    detail: null,
})
onBeforeMount(() => {
    if (storeUser.authUser) {
        if (!storeUser.hasUserData) {
            storeUser.getData()
        }
    }
})

const addNewAddress = async () => {
    if (
        (leaflet.value.marker.long == null) &
        (leaflet.value.marker.lat == null)
    ) {
        alert('Please Select Pin on Maps.')
        return
    }
    const formData = new FormData()
    formData.append('subdistrict', form.value.subdistrict)
    formData.append('city', form.value.city)
    formData.append('province', form.value.province)
    formData.append('post_code', form.value.post_code)
    formData.append('map_id', form.value.map_id)
    formData.append('name', form.value.name)
    formData.append('phone_number', form.value.phoneNumber)
    formData.append('detail', form.value.detail)
    formData.append('user_id', storeUser.userData.id)
    formData.append('latitude', leaflet.value.marker.lat)
    formData.append('longitude', leaflet.value.marker.long)

    await storeAddress.addData(formData, processing)
    isActive.value = false
}

const onSearchChange = debounce(async query => {
    if (query.length < 3) return
    const formData = new FormData()
    formData.append('input', query)
    await storeAddress.searchAddress(formData, options)
}, 500)

const onSelectSearchAddress = async () => {
    form.value.subdistrict =
        form.value.search.administrative_division_level_3_name
    form.value.city = form.value.search.administrative_division_level_2_name
    form.value.province = form.value.search.administrative_division_level_1_name
    form.value.post_code = form.value.search.postal_code
        ? form.value.search.postal_code
        : null
    form.value.map_id = form.value.search.id

    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            form.value.search.name,
        )}&format=json`,
    )
    const data = await response.json()

    if (data.length > 0) {
        leaflet.value.center = [
            parseFloat(data[0].lat),
            parseFloat(data[0].lon),
        ]
        leaflet.value.zoom = 15
    } else {
        console.error('No results found for query:', form.value.search.name)
    }
}
const onMapClick = event => {
    const { lat, lng } = event.latlng
    leaflet.value.marker.lat = lat
    leaflet.value.marker.long = lng
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
                    class="p-5 text-lg font-semibold border-b sticky top-0 z-10 bg-white">
                    Add New Address
                </p>
                <div class="p-5 pb-0 bg-white">
                    <form @submit.prevent="addNewAddress" class="pb-5">
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
                                <div
                                    class="relative w-full flex justify-end col-span-2">
                                    <multiselect
                                        v-model="form.search"
                                        :options="options"
                                        :searchable="true"
                                        :close-on-select="true"
                                        label="name"
                                        track-by="name"
                                        class="!text-xs"
                                        :preserve-search="true"
                                        @select="onSelectSearchAddress()"
                                        @search-change="onSearchChange"
                                        placeholder="Select Address"></multiselect>
                                </div>
                                <div class="relative w-full">
                                    <input
                                        autocomplete="new-address"
                                        readonly
                                        autocapitalize="off"
                                        autocorrect="off"
                                        v-model="form.subdistrict"
                                        type="text"
                                        required
                                        class="border w-full rounded-lg text-sm cursor-default"
                                        placeholder="Sub District" />
                                </div>
                                <div class="relative w-full">
                                    <input
                                        autocomplete="new-address"
                                        readonly
                                        autocapitalize="off"
                                        autocorrect="off"
                                        v-model="form.city"
                                        type="text"
                                        required
                                        class="border w-full rounded-lg text-sm cursor-default"
                                        placeholder="City" />
                                </div>
                                <div class="relative w-full">
                                    <input
                                        autocomplete="new-address"
                                        readonly
                                        autocapitalize="off"
                                        autocorrect="off"
                                        v-model="form.province"
                                        type="text"
                                        required
                                        class="border w-full rounded-lg text-sm cursor-default"
                                        placeholder="Province" />
                                </div>
                                <div class="relative w-full">
                                    <input
                                        autocomplete="new-address"
                                        autocapitalize="off"
                                        autocorrect="off"
                                        v-model="form.post_code"
                                        type="text"
                                        required
                                        class="border w-full rounded-lg text-sm"
                                        placeholder="Enter Postal Code" />
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
                                v-if="form.search"
                                class="w-full aspect-[2/1] rounded-lg overflow-hidden">
                                <l-map
                                    @click="onMapClick"
                                    :use-global-leaflet="false"
                                    :zoom="leaflet.zoom"
                                    :center="leaflet.center">
                                    <l-tile-layer
                                        :z-index="1"
                                        max-zoom="19"
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        layer-type="base"
                                        name="OpenStreetMap"></l-tile-layer>
                                    <l-marker
                                        v-if="
                                            leaflet.marker.lat &&
                                            leaflet.marker.long
                                        "
                                        :lat-lng="[
                                            leaflet.marker.lat,
                                            leaflet.marker.long,
                                        ]"></l-marker>
                                </l-map>
                            </div>
                        </div>
                        <div
                            class="pt-5 flex justify-end sticky bottom-0 pb-5 bg-white border-t z-[5000]">
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
.leaflet-pane {
    z-index: 10 !important;
}
</style>
