<script setup>
import video1 from '@/assets/videos/shop-video-1.mp4'
import video2 from '@/assets/videos/shop-video-2.mp4'
import video3 from '@/assets/videos/shop-video-3.mp4'
import { ref } from 'vue'

const videos = ref([
    {
        src: video1,
    },
    {
        src: video2,
    },
    {
        src: video3,
    },
])
</script>
<template>
    <div class="grid grid-cols-4 gap-4">
        <div
            v-for="(item, index) in videos"
            :key="index"
            class="border rounded-lg h-40 !border-white overflow-hidden">
            <video
                poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s"
                alt=""
                controls
                class="h-full w-full object-cover lazyload">
                <source :src="item.src" type="video/mp4" />
            </video>
        </div>
    </div>
</template>
