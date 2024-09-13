<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
    main_banner: Object,
})

const backendURl = ref(import.meta.env.VITE_PUBLIC_BACKEND_URL)

const activeVideo = ref(0)

const toggleVideo = async i => {
    activeVideo.value = i
}
</script>
<template>
    <div class="w-full min-h-52 md:min-h-96 relative overflow-hidden bg-black">
        <div
            v-for="(item, index) in main_banner"
            :key="index"
            :class="{
                active: activeVideo === index,
                'z-0': activeVideo !== index,
            }"
            class="absolute top-0 left-0 curved-c w-full min-h-full overflow-hidden flex justify-center items-center">
            <video
                v-if="item.main_banner_type == 'video'"
                class="mt-0 md:mt-auto object-cover w-full h-full"
                :src="
                    backendURl +
                    '/storage/media/shop/main-banner/' +
                    item.main_banner_media
                "
                :alt="item.main_banner_alt"
                autoplay
                muted
                loop></video>
            <img
                v-if="item.main_banner_type == 'image'"
                :src="
                    backendURl +
                    '/storage/media/shop/main-banner/' +
                    item.main_banner_media
                "
                class="mt-0 md:mt-auto object-cover w-full h-full"
                :alt="item.main_banner_alt" />
        </div>
        <div
            class="w-full min-h-96 bg-black/50 absolute top-0 left-0 z-20"></div>
        <div
            class="absolute top-0 right-8 md:right-14 flex flex-col min-h-full gap-5 justify-center z-30">
            <RouterLink
                to="#"
                class="ml-0.5 w-5 min-h-5 duration-200 hover:scale-125">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 1227"
                    fill="none">
                    <g clip-path="url(#a)">
                        <path
                            d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                            fill="#ffffff"
                            class="fill-000000"></path>
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path
                                fill="#ffffff"
                                d="M0 0h1200v1227H0z"
                                class="fill-ffffff"></path>
                        </clipPath>
                    </defs>
                </svg>
            </RouterLink>
            <RouterLink to="#" class="w-6 min-h-6 duration-200 hover:scale-125">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 56.7 56.7"
                    xml:space="preserve">
                    <path
                        d="M28.2 16.7c-7 0-12.8 5.7-12.8 12.8s5.7 12.8 12.8 12.8S41 36.5 41 29.5s-5.8-12.8-12.8-12.8zm0 21c-4.5 0-8.2-3.7-8.2-8.2s3.7-8.2 8.2-8.2 8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"
                        fill="#ffffff"
                        class="fill-000000"></path>
                    <circle
                        cx="41.5"
                        cy="16.4"
                        r="2.9"
                        fill="#ffffff"
                        class="fill-000000"></circle>
                    <path
                        d="M49 8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7 0-14.5 5.8-14.5 14.5v20.5c0 4.3 1.4 8 4.2 10.7 2.7 2.6 6.3 3.9 10.4 3.9h20.4c4.3 0 7.9-1.4 10.5-3.9 2.7-2.6 4.1-6.3 4.1-10.6V19.3c0-4.2-1.4-7.8-4-10.4zm-.4 31c0 3.1-1.1 5.6-2.9 7.3s-4.3 2.6-7.3 2.6H18c-3 0-5.5-.9-7.3-2.6C8.9 45.4 8 42.9 8 39.8V19.3c0-3 .9-5.5 2.7-7.3 1.7-1.7 4.3-2.6 7.3-2.6h20.6c3 0 5.5.9 7.3 2.7 1.7 1.8 2.7 4.3 2.7 7.2v20.6z"
                        fill="#ffffff"
                        class="fill-000000"></path>
                </svg>
            </RouterLink>
            <RouterLink to="#" class="w-6 min-h-6 duration-200 hover:scale-125">
                <svg
                    viewBox="0 0 56.693 56.693"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M40.43 21.739h-7.645v-5.014c0-1.883 1.248-2.322 2.127-2.322h5.395V6.125l-7.43-.029c-8.248 0-10.125 6.174-10.125 10.125v5.518h-4.77v8.53h4.77v24.137h10.033V30.269h6.77l.875-8.53z"
                        fill="#ffffff"
                        class="fill-000000"></path>
                </svg>
            </RouterLink>
        </div>
        <div
            class="absolute bottom-4 md:bottom-9 flex flow-row w-full gap-5 justify-center z-30">
            <button
                v-for="(item, index) in main_banner"
                :key="index"
                @click="toggleVideo(index)"
                :class="{
                    'w-8': activeVideo === index,
                    'w-4': activeVideo !== index,
                }"
                class="min-h-4 rounded-[8px] duration-300 bg-white"></button>
        </div>
    </div>
</template>
