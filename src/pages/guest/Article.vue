<script setup>
import { useArticlePageStore } from '@/stores/article-page/article'
import Loading from '@/components/Loading.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import BannerView from '@/pages/guest/article/BannerView.vue'
import HighlightView from '@/pages/guest/article/HighlightView.vue'
import NormalView from '@/pages/guest/article/NormalView.vue'
import MainBanner from '@/pages/guest/article/MainBanner.vue'
import { ref, onMounted } from 'vue'
import { setupCarousel } from '@/assets/js/article.js'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import '@/assets/css/vuetify.css'

const isLoading = ref(true)
const store = useArticlePageStore()
const data = ref()
const fetchData = async () => {
    await store.getData(isLoading)
    data.value = store.data
}

onMounted(() => {
    fetchData()
    setupCarousel()
})
</script>
<template>
    <AppLayout>
        <Loading :isLoading="isLoading" />
        <!-- Top -->
        <MainBanner />

        <!-- Get Update -->
        <div class="w-full flex justify-center">
            <div
                class="w-full flex flex-col md:flex-row align-middle justify-between px-5 md:mx-4 lg:px-0 py-5 max-w-[1140px]">
                <div class="flex items-center md:gap-10 gap-3 mb-3 md:mb-0">
                    <div class="">
                        <svg
                            class="feather feather-mail w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <div class="font-semibold">getupdate</div>
                </div>
                <input
                    type="text"
                    class="mb-3 md:mb-0 border-none h-8 px-4 w-full md:w-2/6 text-xs"
                    name=""
                    id=""
                    placeholder="Detail name" />
                <input
                    type="text"
                    class="mb-3 md:mb-0 border-none h-8 px-4 w-full md:w-2/6 text-xs"
                    name=""
                    id=""
                    placeholder="Gmail address" />
                <button class="border py-1 md:py-0 border-yellow-400 px-12">
                    Go
                </button>
            </div>
        </div>

        <BannerView :data="data" />

        <!-- Saya Orang -->
        <HighlightView :data="data" />
        <!-- Article -->
        <NormalView :data="data" />
        <div class="flex justify-center pt-8 pb-16">
            <button
                class="text-gray-600 p-3 border border-gray-600 hover:border-gray-400 bg-white">
                View All
            </button>
        </div>
        <!-- Videos -->
        <div
            class="w-full max-w-[1320px] px-4 mx-auto flex flex-col py-16 justify-center">
            <div class="text-3xl text-center mb-5">Videos</div>
            <div
                class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                <div
                    v-for="i in 3"
                    :key="i"
                    class="w-full min-h-52 rounded overflow-hidden">
                    <iframe
                        class="w-full h-full"
                        src="https://www.youtube.com/embed/otej7WLdPh0?si=hTKjPRESNEp9Gmd3"
                        title="YouTube video"
                        allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
