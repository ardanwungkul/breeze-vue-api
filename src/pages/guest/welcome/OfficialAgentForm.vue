<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    method: {
        type: Function,
        required: true,
    },
    resellerPackage: Object,
    user: Object,
})

const user = props.user

const processing = ref(false)
const setErrors = ref([])
const inputUsername = ref(user?.name ?? '')
const inputStoreName = ref('')
const inputEmail = ref(user?.email ?? '')
const inputPassword = ref(user ? '********' : '')
const termCondition = ref('')

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const resellerPackage = computed(() => props.resellerPackage)

const handleStore = async () => {
    processing.value = true

    const formData = new FormData()

    formData.append('user_id', user?.id)
    formData.append('name', inputUsername.value)
    formData.append('store_name', inputStoreName.value)
    formData.append('store_level', resellerPackage.value.level)
    formData.append('email', inputEmail.value)
    formData.append('password', inputPassword.value)
    formData.append('package_id', resellerPackage.value.id)
    formData.append('package_name', resellerPackage.value.name)
    formData.append('package_price', resellerPackage.value.price)

    await props.method(formData, processing)
    // processing.value = false
}
</script>

<template>
    <v-dialog>
        <template v-slot:activator="{ props: activatorProps }">
            <button
                v-bind="activatorProps"
                :disabled="user?.store"
                :class="
                    user?.store ? 'bg-ezzora-600/30' : 'hover:bg-ezzora-600/30'
                "
                class="p-3 border rounded-xl font-bold duration-300 border-ezzora-600">
                {{ user?.store ? 'Packet Active' : 'Select Package' }}
            </button>
        </template>

        <template v-slot:default="{ isActive }">
            <div
                class="w-full max-w-4xl mx-auto bg-light-primary-1 rounded-xl shadow-lg max-h-[80vh] py-3 sm:py-5 mt-4 relative">
                <button
                    @click="isActive.value = false"
                    class="fa-solid fa-xmark rounded-xl hover:bg-gray-100 px-3 py-2 absolute top-3 right-3 z-10"></button>
                <div
                    class="px-5 py-3 max-h-full overflow-y-scroll relative invisible-scrollbar">
                    <div
                        class="w-full flex flex-col overflow-auto bg-white rounded-lg text-base font-normal px-2 space-y-3">
                        <div class="text-xl sm:text-2xl">
                            Upgrade Your Plan {{ resellerPackage.name }}
                        </div>
                        <div class="text-sm sm:text-base text-gray-500 mb-7">
                            Price : Rp{{ formatPrice(resellerPackage.price) }}
                        </div>
                        <form @submit.prevent="handleStore">
                            <div class="w-full space-y-3">
                                <div
                                    class="grid grid-cols-1 text-sm sm:text-base sm:grid-cols-2 gap-3 sm:gap-5 mb-7">
                                    <div class="flex flex-col">
                                        <label
                                            class="text-blue-600 font-medium mb-2"
                                            for="username"
                                            >Username</label
                                        >
                                        <input
                                            id="username"
                                            v-model="inputUsername"
                                            :disabled="user"
                                            :class="
                                                user
                                                    ? ' cursor-not-allowed opacity-50'
                                                    : ' '
                                            "
                                            class="text-sm sm:text-base border border-gray-300 duration-300 rounded-lg"
                                            type="text" />
                                    </div>
                                    <div class="flex flex-col">
                                        <label
                                            class="text-blue-600 font-medium mb-2"
                                            for="store_name"
                                            >Store Name</label
                                        >
                                        <input
                                            id="store_name"
                                            v-model="inputStoreName"
                                            class="text-sm sm:text-base border border-gray-300 duration-300 rounded-lg"
                                            type="text" />
                                    </div>
                                    <div class="flex flex-col">
                                        <label
                                            class="text-blue-600 font-medium mb-2"
                                            for="store_address"
                                            >Email</label
                                        >
                                        <input
                                            id="store_address"
                                            v-model="inputEmail"
                                            :disabled="user"
                                            :class="
                                                user
                                                    ? ' cursor-not-allowed opacity-50'
                                                    : ' '
                                            "
                                            class="text-sm sm:text-base border border-gray-300 duration-300 rounded-lg"
                                            type="email" />
                                    </div>
                                    <div class="flex flex-col">
                                        <label
                                            class="text-blue-600 font-medium mb-2"
                                            for="password"
                                            >Password</label
                                        >
                                        <input
                                            id="password"
                                            v-model="inputPassword"
                                            autocomplete="current-password"
                                            :disabled="user"
                                            :class="
                                                user
                                                    ? ' cursor-not-allowed opacity-50'
                                                    : ' '
                                            "
                                            class="text-sm sm:text-base border border-gray-300 duration-300 rounded-lg"
                                            :type="
                                                user ? 'text' : 'password'
                                            " />
                                    </div>
                                </div>
                                <div
                                    class="px-2 flex flex-row items-start gap-2">
                                    <input
                                        class="rounded border w-4 h-4 border-typography-2 mt-1"
                                        v-model="termCondition"
                                        type="checkbox"
                                        name=""
                                        id="" />
                                    <div
                                        class="text-xs sm:text-sm text-typography-2">
                                        Term and Condition: Lorem ipsum dolor
                                        sit amet consectetur adipisicing elit.
                                        Amet laudantium inventore ex eos. Quas
                                        aliquid dolores quis laudantium impedit
                                    </div>
                                </div>
                                <div class="w-full">
                                    <button
                                        :disabled="!termCondition"
                                        :class="[
                                            !termCondition
                                                ? 'cursor-not-allowed opacity-50'
                                                : '',
                                            processing ? 'cursor-progress' : '',
                                        ]"
                                        class="w-full py-3 border rounded-xl font-bold duration-300 text-blue-600 border-blue-600 focus:bg-blue-600/30 hover:bg-blue-600/30">
                                        Buy Package
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </template>
    </v-dialog>
</template>
