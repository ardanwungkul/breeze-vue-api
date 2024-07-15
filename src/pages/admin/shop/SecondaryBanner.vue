<script setup>
import Banner1 from '@/assets/media/shop/secondary-banner/secondary-banner-1.jpg'
import Banner2 from '@/assets/media/shop/secondary-banner/secondary-banner-2.jpg'
import { ref } from 'vue'

const Banner = ref([
    {
        src: Banner1,
    },
    {
        src: Banner2,
    },
])
</script>
<template>
    <div class="space-y-3">
        <div>
            <label for="secondarybanner">
                <div
                    class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg w-min whitespace-nowrap">
                    <i class="fa-solid fa-plus"></i>
                    <p>Add Secondary Banner</p>
                </div>
            </label>
            <input
                type="file"
                name="secondarybanner"
                id="secondarybanner"
                class="hidden" />
        </div>
        <div class="grid grid-cols-1 gap-4">
            <div
                v-for="(item, index) in Banner"
                :key="index"
                class="border rounded-lg overflow-hidden">
                <img
                    :src="item.src"
                    class="h-full w-full object-cover lazyload"
                    alt="" />
            </div>
        </div>
    </div>
</template>
