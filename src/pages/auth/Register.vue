<script setup>
import { useUsers } from '@/stores/user'
import { computed, ref } from 'vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import TextInput from '@/components/TextInput.vue'
import InputLabel from '@/components/InputLabel.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const store = useUsers()

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
})

const processing = ref(false)

const setErrors = ref()

const errors = computed(() => setErrors.value)

const submitRegister = () => {
    store.register(form, setErrors, processing)
}
</script>

<template>
    <GuestLayout>
        <div class="flex h-full w-full items-center">
            <div class="space-y-4 w-full">
                <ValidationErrors :errors="errors" />

                <form @submit.prevent="submitRegister">
                    <div class="space-y-4">
                        <div class="flex justify-between items-end">
                            <p class="text-2xl font-bold text-gray-700">
                                Register
                            </p>
                            <router-link
                                class="text-sm text-blue-500 font-medium hover:underline"
                                :to="{ name: 'login' }">
                                Login
                            </router-link>
                        </div>
                        <div class="space-y-4">
                            <div>
                                <TextInput
                                    id="name"
                                    v-model="form.name"
                                    type="text"
                                    class="mt-1 block w-full text-sm border border-orange-100 bg-orange-50"
                                    required
                                    placeholder="Name"
                                    autofocus
                                    autocomplete="name" />
                            </div>

                            <div class="">
                                <TextInput
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    class="mt-1 block w-full text-sm border border-orange-100 bg-orange-50"
                                    required
                                    placeholder="E-Mail"
                                    autocomplete="username" />
                            </div>

                            <div class="">
                                <TextInput
                                    id="password"
                                    v-model="form.password"
                                    type="password"
                                    class="mt-1 block w-full text-sm border border-orange-100 bg-orange-50"
                                    required
                                    placeholder="Password"
                                    autocomplete="new-password" />
                            </div>

                            <div class="">
                                <TextInput
                                    id="password_confirmation"
                                    v-model="form.password_confirmation"
                                    type="password"
                                    class="mt-1 block w-full text-sm border border-orange-100 bg-orange-50"
                                    required
                                    placeholder="Confirm Password"
                                    autocomplete="new-password" />
                            </div>

                            <button
                                type="submit"
                                class="font-poppins p-2 text-gray-700 hover:bg-[#f8f8f6] bg-[#f4f0ed] rounded-lg w-full text-center text-sm font-semibold font-cabinet uppercase tracking-widest transition-all shadow-lg">
                                REGISTER
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
