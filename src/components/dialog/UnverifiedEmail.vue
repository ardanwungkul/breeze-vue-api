<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import srcEmailSentLottie from '@/assets/lottie/EmailVerification.lottie'

const props = defineProps({
    user: {
        type: Object,
        default: null,
    },
})
</script>
<template>
    <div
        class="w-full h-screen fixed z-[999999999] p-10 bg-black/10 backdrop-blur-sm flex items-center justify-center">
        <div
            class="bg-ezzora-50 dark:bg-dark-primary-2 border dark:border-white rounded-xl p-10 flex flex-col items-center justify-center">
            <DotLottieVue
                class="max-h-96 flex-none"
                autoplay
                loop
                :src="srcEmailSentLottie" />
            <p class="dark:text-gray-400 text-sm max-w-lg text-center">
                We've Just Sent Email to <span>{{ user.email }}</span>
            </p>
            <p class="dark:text-gray-400 text-sm max-w-sm text-center">
                Please Check Your Inbox and Click The Link to Verify Your
                Account.
            </p>
            <button
                class="bg-green-200 rounded-lg w-full text-green-600 mt-3 py-1 !border !border-green-600 font-medium"
                @click="$router.go(0)">
                Refresh
            </button>
        </div>
    </div>
</template>
