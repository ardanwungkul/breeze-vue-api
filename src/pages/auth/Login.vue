<script setup>
import { useRoute } from 'vue-router'
import { useUsers } from '@/stores/user'
import { computed, ref } from 'vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import Checkbox from '@/components/Checkbox.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import TextInput from '@/components/TextInput.vue'
import InputLabel from '@/components/InputLabel.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const route = useRoute()

const store = useUsers()

const form = ref({
    email: '',
    password: '',
    remember: false,
})

const processing = ref(false)

const setErrors = ref()

const errors = computed(() => setErrors.value)

const status = route.query.reset?.length > 0 ? atob(route.query.reset) : null

const submitLogin = () => {
    store.login(form, setErrors, processing)
}
</script>

<template>
    <GuestLayout>
        <div class="flex items-center w-full h-full space-y-4">
            <div
                v-if="status"
                class="font-medium text-sm text-green-600 w-full">
                {{ status }}
            </div>

            <ValidationErrors class="w-full" :errors="errors" />

            <form @submit.prevent="submitLogin" class="w-full">
                <div class="space-y-4">
                    <div class="flex justify-between items-end">
                        <p class="text-2xl font-bold text-gray-700">Login</p>
                        <router-link
                            class="text-sm text-blue-500 font-medium hover:underline"
                            :to="{ name: 'register' }">
                            Register
                        </router-link>
                    </div>
                    <div>
                        <TextInput
                            id="email"
                            v-model="form.email"
                            type="email"
                            class="mt-1 block w-full text-sm bg-orange-50 border-orange-100"
                            required
                            placeholder="E-mail"
                            autofocus
                            autocomplete="username" />
                    </div>

                    <div class="">
                        <TextInput
                            id="password"
                            v-model="form.password"
                            type="password"
                            class="mt-1 block w-full text-sm bg-orange-50 border-orange-100"
                            placeholder="Password"
                            required
                            autocomplete="current-password" />
                    </div>

                    <div class="flex items-center justify-end">
                        <router-link
                            to="/forgot-password"
                            class="hover:underline text-xs text-gray-600 hover:text-gray-900">
                            Forgot your password?
                        </router-link>
                    </div>
                    <button
                        type="submit"
                        class="font-poppins p-2 text-gray-700 hover:bg-[#f8f8f6] bg-[#f4f0ed] rounded-lg w-full text-center text-sm font-semibold font-cabinet uppercase tracking-widest transition-all shadow-lg">
                        LOGIN
                    </button>
                </div>
            </form>
        </div>
    </GuestLayout>
</template>
