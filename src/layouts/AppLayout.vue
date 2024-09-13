<script setup>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import { RouterView } from 'vue-router'

const props = defineProps({
    slug: String,
    id: String,
})
</script>
<template>
    <Navigation></Navigation>
    <div class="font-poppins bg-[#f8f8f6] min-h-screen pt-[57px]">
        <div class="">
            <slot />
        </div>
    </div>
    <Footer></Footer>
</template>
