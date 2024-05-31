<script setup>
import Navigation from '@/components/Navigation.vue'
import { RouterView } from 'vue-router'
</script>
<template>
    <Navigation></Navigation>
    <div class="font-poppins bg-[#f8f8f6] min-h-screen pt-[57px]">
        <div class="max-w-[1140px] mx-auto">
            <slot />
        </div>
    </div>
</template>
