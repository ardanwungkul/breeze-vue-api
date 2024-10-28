<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import AddAddress from '@/components/dialog/add/AddAddress.vue'
import EditAddress from '@/components/dialog/edit/EditAddress.vue'
import { useAddressStore } from '@/stores/address'
import { useUsers } from '@/stores/user'

const address = ref([])
const storeAddress = useAddressStore()
const storeUser = useUsers()
const processing = ref(false)
onBeforeMount(() => {
    if (storeUser.authUser) {
        if (!storeUser.hasUserData) {
            storeUser.getData()
        }
    }
})
onMounted(async () => {
    await storeAddress.getData(storeUser.userData.id)
    fetchAddress()
})
const fetchAddress = async () => {
    address.value = storeAddress.address
}

const deleteAddress = async item => {
    await storeAddress.deleteData(item.id, processing)
}
const setDefaultAddress = async item => {
    const formData = new FormData()
    formData.append('id', item.id)
    formData.append('user_id', storeUser.userData.id)
    await storeAddress.setDefaultAddress(formData, processing)
}

watchEffect(() => {
    fetchAddress()
})
</script>
<template>
    <v-dialog>
        <template v-slot:activator="{ props: activatorProps }">
            <button v-bind="activatorProps" class="text-secondary-2">
                Change
            </button>
        </template>

        <template v-slot:default="{ isActive }">
            <div
                class="bg-light-primary-1 rounded-xl shadow-lg overflow-y-scroll w-full max-w-2xl invisible-scrollbar max-h-[90vh] mx-auto h-full">
                <div
                    class="flex justify-between gap-3 items-center text-lg border-b pb-3 p-5 sticky top-0 bg-white z-10">
                    <p class="font-medium">My Address</p>
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
                </div>
                <!-- Conditional content -->
                <div class="pt-3 w-full space-y-4 p-5 pb-0 h-full">
                    <!-- All Address -->
                    <div class="h-full relative divide-y">
                        <div
                            class="w-full flex flex-row gap-2 py-4"
                            v-if="address.length > 0"
                            v-for="(item, index) in address"
                            :key="index">
                            <div class="px-3 w-full">
                                <div class="flex justify-between">
                                    <div
                                        class="flex divide-x divide-typography-2 items-center">
                                        <p class="pr-3 font-semibold text-lg">
                                            {{ item.name }}
                                        </p>
                                        <p class="px-3 text-typography-2">
                                            {{ item.phone_number }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            v-if="item.isDefault"
                                            class="px-3 py-1 rounded-lg bg-ezzora-100 text-typography-2 text-sm shadow-lg border">
                                            Default Address
                                        </p>
                                    </div>
                                </div>
                                <div class="text-sm text-typography-2">
                                    <p>{{ item.detail }}</p>
                                    <p>
                                        {{ item.province.name }},
                                        {{ item.city.name }},
                                        {{ item.subdistrict.name }},
                                        {{ item.village.name }},
                                        {{ item.post_code.post_code }}
                                    </p>
                                    <div
                                        class="pt-2 flex items-center !divide-x-2 divide-black mt-2">
                                        <div
                                            class="divide-x divide-typography-2 flex">
                                            <div class="">
                                                <button
                                                    class="pr-3 hover:underline py-1 hover:text-secondary-3">
                                                    Use Address
                                                </button>
                                            </div>
                                            <div class="">
                                                <EditAddress :item="item" />
                                            </div>
                                            <div class="">
                                                <button
                                                    @click="deleteAddress(item)"
                                                    :disabled="item.isDefault"
                                                    :class="
                                                        item.isDefault
                                                            ? ''
                                                            : 'hover:text-red-500 hover:underline'
                                                    "
                                                    class="px-3 py-1">
                                                    Delete
                                                </button>
                                            </div>
                                            <div class="">
                                                <button
                                                    @click="
                                                        setDefaultAddress(item)
                                                    "
                                                    class="px-3 hover:underline py-1 hover:text-typography-2">
                                                    Set as Default Address
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-full flex flex-row gap-2 py-4">
                            <div
                                class="bg-ezzora-50 rounded-lg text-center w-full py-3">
                                <p class="text-center">
                                    Please Add Your Address First
                                </p>
                            </div>
                        </div>
                        <div
                            class="sticky bottom-0 py-3 bg-white w-full flex justify-between">
                            <button
                                type="button"
                                @click="isActive.value = false"
                                class="px-5 py-2 border rounded-lg duration-300 bg-ezzora-50 hover:bg-ezzora-100 text-sm shadow-lg">
                                Cancel
                            </button>
                            <AddAddress />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </v-dialog>
</template>
