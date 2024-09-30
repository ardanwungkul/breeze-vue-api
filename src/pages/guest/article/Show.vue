<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import 'swiper/css'
import defaultImage from '@/assets/images/article-banner-view-default-1.jpg'
import { useRoute, useRouter } from 'vue-router'
import { useArticlePageStore } from '@/stores/article-page/article'
import { onBeforeMount, ref } from 'vue'
import Loading from '@/components/Loading.vue'

const isLoading = ref(true)
const store = useArticlePageStore()
const route = useRoute()
const router = useRouter()
const article = ref(null)
const slug = ref(route.params.slug)
const image = ref(null)

onBeforeMount(async () => {
    await store.getDataBySlug(slug.value, isLoading)

    if (!store.article || Object.keys(store.article).length === 0) {
        router.push({ name: 'page-not-found' })
    } else {
        article.value = store.article
        isLoading.value = store.loading
        image.value =
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/images/article/' +
            article.value.id +
            '/' +
            article.value.article_image
    }
})
</script>
<template>
    <AppLayout>
        <Loading :isLoading="isLoading" />
        <div class="w-full min-h-screen">
            <div class="fixed top-0 left-0 w-screen h-screen">
                <v-img
                    :src="article?.article_image ? image : defaultImage"
                    :class="article?.article_image ? '' : 'scale-x-[-1]'"
                    cover
                    class="h-screen">
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
            <div class="grid grid-cols-2 w-full">
                <div class="relative bg-white min-h-screen col-end-3">
                    <div
                        class="md:p-3 lg:p-5 flex flex-col items-center gap-4 justify-center text-gray-300">
                        <p class="text-8xl text-center uppercase">
                            {{ article?.category?.category_name }}
                        </p>
                        <p>{{ article?.article_title }}</p>
                    </div>
                    <hr
                        id="divider"
                        class="overflow-visible p-0 text-center opacity-20 font-sans"
                        style="border-top: medium double #333 !important" />
                    <blockquote
                        class="absolute w-[300px] border-l-[16px] border-gray-300 text-gray-300 bg-black -translate-x-full p-5 flex justify-center object-center text-3xl tracking-wide capitalize">
                        <p>
                            {{
                                article?.article_blockquote
                                    ? article?.article_blockquote
                                    : article?.article_title
                            }}
                        </p>
                    </blockquote>
                    <div
                        class="first-letter:text-7xl first-letter:font-semibold first-letter:mr-2 first-letter:float-left columns-2 sm:px-10 lg:px-12 py-10 gap-4">
                        <p v-html="article?.article_content"></p>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
<style>
#divider::after {
    content: '§';
    display: inline-block;
    position: relative;
    top: -0.7em;
    font-size: 1.5em;
    padding: 0 0.25em;
    background: #cccccc;
}
blockquote p::before {
    content: open-quote;
}
blockquote p::after {
    content: close-quote;
}
</style>
