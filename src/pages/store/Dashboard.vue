<script setup>
import { ref, computed, onMounted } from 'vue'

import { useUsers } from '@/stores/user'

import StoreLayout from '@/layouts/StoreLayout.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const user = ref()
const storeUser = useUsers()
const processing = ref(false)

onMounted(async () => {
    await fetchUser()
})

async function fetchUser() {
    await storeUser.getData()
    user.value = storeUser.userData.store
    // console.log(user.value);
    
}

const setErrors = ref([])
const errors = computed(() => setErrors.value)
</script>

<template>
    <StoreLayout title="Dashboard">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            v-show="user?.xendit_id === null"
            class="flex items-center justify-between p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert">
            <div class=" flex">
                <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    The email you provided cannot be used. Please 
                    <RouterLink :to="{ name: 'store.reregister' }" class=" underline underline-offset-2 hover:text-red-600 dark:hover:text-red-200 duration-300">
                        register again
                    </RouterLink> 
                    using a different email address.
                </div>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-5">
            <div class="grid grid-cols-2 col-span-2 gap-5">
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-24"></div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-24"></div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-24"></div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-24"></div>
            </div>
            <div
                class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>
            <div
                class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>

            <div class="col-span-2 grid gap-5">
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-40"></div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-40"></div>
            </div>
            <div class="col-span-2 flex flex-col gap-5">
                <div class="grid grid-cols-2 gap-5 h-24 flex-none">
                    <div
                        class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>
                    <div
                        class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>
                </div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>
            </div>
        </div>
    </StoreLayout>
</template>
