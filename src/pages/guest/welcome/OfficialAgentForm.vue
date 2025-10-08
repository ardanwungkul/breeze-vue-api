<script setup>
import { onMounted, ref } from 'vue'
import { useUsers } from '../../../stores/user'
import { computed } from 'vue'
import { useResponseStore } from '../../../stores/response'

const props = defineProps({
    method: {
        type: Function,
        required: true,
    },
})

const responseStore = useResponseStore()

const form = ref({
    username: null,
    store_name: null,
    email: null,
    password: null,
    tnc: null,
})

const userStore = useUsers()

onMounted(async () => {
    if (userStore.authUser) {
        if (!userStore.hasUserData) {
            userStore.getData()
        }
    }
})

const handleStore = async () => {
    await props.method(form.value)
}

async function addError(messages) {
    responseStore.addError(messages)
}
</script>

<template>
    <div>
        <v-dialog>
            <template #activator="{ props: activatorProps }">
                <button
                    v-if="!userStore.hasUserData"
                    class="text-sm bg-secondary-3 hover:bg-opacity-80 text-typography-1 font-medium p-2 px-3 duration-300 hover:border-transparent rounded-xl w-full"
                    v-bind="activatorProps">
                    Join Us
                </button>
                <button
                    v-else
                    class="text-sm bg-secondary-3 hover:bg-opacity-80 text-typography-1 font-medium p-2 px-3 duration-300 hover:border-transparent rounded-xl w-full"
                    @click="
                        addError(
                            'You Already Login on Another User. Please Logout First',
                        )
                    ">
                    Join Us
                </button>
            </template>

            <template #default="{ isActive }">
                <div
                    class="w-full max-w-xl mx-auto bg-light-primary-1 rounded-xl shadow-lg py-3 sm:py-5 mt-4 relative">
                    <button
                        class="fa-solid fa-xmark rounded-xl hover:bg-gray-100 px-3 py-2 absolute top-3 right-3 z-10"
                        @click="isActive.value = false"></button>
                    <div
                        class="px-5 py-3 relative invisible-scrollbar max-h-[80vh] overflow-y-scroll">
                        <div
                            class="w-full flex flex-col bg-white rounded-lg text-base font-normal px-2 space-y-3">
                            <form @submit.prevent="handleStore">
                                <div class="w-full space-y-3">
                                    <div
                                        class="grid grid-cols-2 text-sm sm:text-base gap-3 sm:gap-2 mb-2">
                                        <div class="flex flex-col col-span-1">
                                            <label
                                                class="text-blue-600 font-medium mb-1 text-sm"
                                                for="username"
                                                >Username</label
                                            >
                                            <input
                                                id="username"
                                                v-model="form.username"
                                                class="text-sm border border-gray-300 duration-300 rounded-lg"
                                                autocomplete="new-username"
                                                placeholder="Input Your username"
                                                required
                                                type="text" />
                                        </div>
                                        <div class="flex flex-col col-span-1">
                                            <label
                                                class="text-blue-600 font-medium mb-1 text-sm"
                                                for="store_name"
                                                >Store Name</label
                                            >
                                            <input
                                                id="store_name"
                                                v-model="form.store_name"
                                                class="text-sm border border-gray-300 duration-300 rounded-lg"
                                                autocomplete="new-storename"
                                                placeholder="Input Your Store Name"
                                                required
                                                type="text" />
                                        </div>
                                        <div class="flex flex-col col-span-2">
                                            <label
                                                class="text-blue-600 font-medium mb-1 text-sm"
                                                for="store_address"
                                                >Email</label
                                            >
                                            <input
                                                id="store_address"
                                                v-model="form.email"
                                                autocomplete="new-email-address"
                                                placeholder="Input Your Company Mail Address"
                                                class="text-sm border border-gray-300 duration-300 rounded-lg"
                                                required
                                                type="email" />
                                        </div>
                                        <div class="flex flex-col col-span-2">
                                            <label
                                                class="text-blue-600 font-medium mb-1 text-sm"
                                                for="password"
                                                >Password</label
                                            >
                                            <input
                                                id="password"
                                                v-model="form.password"
                                                autocomplete="new-password"
                                                placeholder="Input Your Password"
                                                type="password"
                                                required
                                                class="text-sm border border-gray-300 duration-300 rounded-lg" />
                                        </div>
                                    </div>
                                    <div
                                        class="px-2 flex flex-row items-start gap-2">
                                        <input
                                            v-model="form.tnc"
                                            class="rounded border w-4 h-4 border-typography-2 mt-1"
                                            type="checkbox"
                                            required
                                            name="" />
                                        <div class="text-xs text-typography-2">
                                            Term and Condition: Lorem ipsum
                                            dolor sit amet consectetur
                                            adipisicing elit. Amet laudantium
                                            inventore ex eos. Quas aliquid
                                            dolores quis laudantium impedit
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <button
                                            :class="[
                                                !form.tnc
                                                    ? 'cursor-not-allowed opacity-50'
                                                    : '',
                                                processing
                                                    ? 'cursor-progress'
                                                    : '',
                                            ]"
                                            class="w-full py-2 border rounded-xl font-bold duration-300 text-blue-600 border-blue-600 focus:bg-blue-600/30 hover:bg-blue-600/30">
                                            Register to Be Partner
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </template>
        </v-dialog>
    </div>
</template>
