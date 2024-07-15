<script setup>
import Banner from '@/assets/media/shop/side-banner/side-banner.png'
import { ref } from 'vue'

const SideBanner = ref([
    {
        src: Banner,
    },
])
</script>
<template>
    <div class="grid grid-cols-1 gap-4 place-content-center">
        <div v-for="(item, index) in SideBanner" :key="index">
            <img
                :src="item.src"
                class="h-60 object-contain lazyload mx-auto rounded-lg"
                alt="" />
        </div>
    </div>
</template>
