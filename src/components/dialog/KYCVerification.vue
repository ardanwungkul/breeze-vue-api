<script setup>
import KYCImage from '@/assets/images/kyc-image.png'
</script>
<template>
    <div
        class="fixed w-full max-w-sm h-screen z-[999999999999999] dark:bg-dark-primary-2 border-white border rounded-xl top-0 left-[calc(50%-12rem)]">
        <img :src="KYCImage" class="w-full max-w-xs mx-auto" alt="" />
        <div class="px-5 py-3">
            <p
                class="dark:text-white text-center text-2xl font-semibold font-poppins tracking-widest">
                Let's Verify KYC
            </p>
            <p
                class="text-gray-400 font-light fontp-poppins tracking-widest leading-5 text-sm mt-3 text-center">
                Please Submit the following documents verify your profile.
            </p>
        </div>
    </div>
</template>
