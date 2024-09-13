<script setup>
import defaultImage1 from '@/assets/images/article-highlight-default-1.jpeg'
import defaultImage2 from '@/assets/images/article-highlight-default-2.jpeg'
import { ref, computed } from 'vue'

const props = defineProps({
    data: Array,
    required: true,
    default: () => [],
})
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL

const article = computed(() => {
    if (Array.isArray(props.data) && props.data.length > 0) {
        return props.data.filter(
            item =>
                item.article_view_type === 'Highlight' &&
                item.article_status == 'publish',
        )
    } else {
        return []
    }
})
const defaultItem = ref([
    {
        article_title: 'Article',
        article_content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores reprehenderit illum sunt corporis exmaiores numquam, ut error voluptates rem fugiat officia nostrum sit natus doloremque distinctio.',
        article_image_featured_1: defaultImage1,
        article_image_featured_2: defaultImage2,
        article_category: 'Blog',
    },
])
const items = computed(() => {
    if (article.value.length > 0) {
        return article.value
    } else {
        return defaultItem.value
    }
})
</script>
<template>
    <v-carousel
        show-arrows="hover"
        hide-delimiters="true"
        height="100%"
        class="overflow-visible w-full !max-w-[1140px] mx-auto"
        style="overflow-y: visible">
        <v-carousel-item v-for="(item, index) in items" :key="index" class="">
            <div
                class="flex flex-row justify-center min-h-[80vw] md:min-h-screen gap-5 pb-16 py-0 md:py-16 relative mt-10 md:mt-0">
                <div
                    class="max-w-[70vw] md:max-w-[43%] text-center absolute bottom-[20%] md:bottom-[10%] left-10 md:left-60 z-20 py-5 px-7 border-black border bg-ezzora-50">
                    <div
                        style="font-family: 'Grand Hotel'"
                        class="text-xl md:text-3xl mb-4 line-clamp-1">
                        {{ item.article_title }}
                    </div>
                    <hr class="border-black mb-4" />
                    <div
                        class="text-[10px] md:text-xs mb-4 line-clamp-4"
                        v-html="item.article_content"></div>
                    <router-link
                        v-if="item.article_slug"
                        :to="{
                            name: 'user.article.show',
                            params: {
                                slug: item.article_slug,
                            },
                        }">
                        <button class="border border-black p-2 text-xs">
                            VIEW MORE
                        </button>
                    </router-link>
                </div>
                <div
                    style="background-color: rgb(241, 237, 237)"
                    class="absolute z-10 md:z-0 w-[20vw] h-32 max-h-[80px] md:max-h-screen md:w-[26vh] md:min-h-[25vh] -rotate-90 top-12 left-2 md:top-64 md:left-10 text-sm md:text-xl font-light">
                    -{{ item.id ? item.category?.category_name : 'Blog' }}
                </div>
                <div
                    style="background-color: rgb(241, 237, 237)"
                    class="absolute w-[20vw] md:w-[26vh] h-32 md:min-h-[25vh] rotate-90 top-24 right-8 md:top-96 md:right-10 text-sm md:text-xl font-light text-right"></div>
                <div
                    class="w-[47vw] md:w-[47%] h-[30vw] md:min-h-[35vh] max-h-[35vh] relative">
                    <v-img
                        :src="
                            item.id && item.article_image_featured_2
                                ? backendUrl +
                                  '/storage/images/article/' +
                                  item.id +
                                  '/' +
                                  item.article_image_featured_2
                                : defaultImage2
                        "
                        aspect-ratio="1"
                        cover
                        class="min-w-full min-h-full">
                        <template v-slot:placeholder>
                            <div
                                class="w-full h-full flex justify-center items-center">
                                <v-progress-circular
                                    color=""
                                    indeterminate></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                </div>
                <div
                    class="w-[35vw] md:w-[35%] h-[40vw] md:min-h-[60vh] max-h-[60vh] relative">
                    <v-img
                        :src="
                            item.id && item.article_image_featured_1
                                ? backendUrl +
                                  '/storage/images/article/' +
                                  item.id +
                                  '/' +
                                  item.article_image_featured_1
                                : defaultImage1
                        "
                        aspect-ratio="1"
                        class="min-w-full min-h-full"
                        cover>
                        <template v-slot:placeholder>
                            <div
                                class="w-full h-full flex justify-center items-center">
                                <v-progress-circular
                                    color=""
                                    indeterminate></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                </div>
            </div>
        </v-carousel-item>
    </v-carousel>
    <!-- <div
        class="w-full max-w-[1140px] mx-auto flex flex-row justify-center min-h-[80vw] md:min-h-screen gap-5 pb-16 py-0 md:py-16 relative mt-10 md:mt-0">
        <div
            class="max-w-[70vw] md:max-w-[43%] text-center absolute top-32 md:top-[24rem] left-10 md:left-60 z-20 py-5 px-7 border-black border bg-ezzora-50">
            <div
                style="font-family: 'Grand Hotel'"
                class="text-xl md:text-3xl mb-4">
                Saya Orang
            </div>
            <hr class="border-black mb-4" />
            <div class="text-[10px] md:text-xs mb-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Asperiores reprehenderit illum sunt corporis ex maiores numquam,
                ut error dignissimos voluptates rem fugiat officia nostrum sit
                natus doloremque distinctio.
            </div>
            <button class="border border-black p-2 text-xs">LEARN MORE</button>
        </div>
        <div
            style="background-color: rgb(241, 237, 237)"
            class="absolute w-[20vw] h-32 max-h-[80px] md:max-h-screen md:w-[26vh] md:min-h-[25vh] -rotate-90 top-12 left-2 md:top-64 md:left-10 text-sm md:text-xl font-light">
            -Blog
        </div>
        <div
            style="background-color: rgb(241, 237, 237)"
            class="absolute w-[20vw] md:w-[26vh] h-32 md:min-h-[25vh] rotate-90 top-24 right-8 md:top-96 md:right-10 text-sm md:text-xl font-light text-right"></div>
        <div
            class="w-[47vw] md:w-[47%] h-[30vw] md:min-h-[35vh] max-h-[35vh] relative">
            <v-img :src="defaultImage2" aspect-ratio="1" class="min-w-full min-h-full">
                <template v-slot:placeholder>
                    <div class="w-full h-full flex justify-center items-center">
                        <v-progress-circular
                            color=""
                            indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
        </div>
        <div
            class="w-[35vw] md:w-[35%] h-[40vw] md:min-h-[60vh] max-h-[60vh] relative">
            <v-img :src="defaultImage1" aspect-ratio="1" class="min-w-full min-h-full">
                <template v-slot:placeholder>
                    <div class="w-full h-full flex justify-center items-center">
                        <v-progress-circular
                            color=""
                            indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
        </div>
    </div> -->
</template>
