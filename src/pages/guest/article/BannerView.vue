<script setup>
import { ref, computed } from 'vue'
import '@/assets/css/article.css'
import default_1 from '@/assets/images/article-banner-view-default-2.jpg'
import default_2 from '@/assets/images/article-banner-view-default-1.jpg'

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
                item.article_view_type === 'Banner' &&
                item.article_status == 'publish',
        )
    } else {
        return []
    }
})
const items = ref([
    {
        article_image: default_1,
        category: 'Skincare',
        article_title: 'Beauty Skin </br> Best Skincare',
        article_content:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi',
    },
    {
        article_image: default_2,
        category: 'Skincare',
        article_title: 'Beauty Skin </br> Best Skincare',
        article_content:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi',
    },
])

const bannerItem = computed(() => {
    if (article.value.length > 0) {
        return article.value
    } else {
        return items.value
    }
})
</script>
<template>
    <section class="h-screen flex items-center justify-center">
        <div
            class="carousel h-screen w-full overflow-hidden relative"
            ref="carousel">
            <div class="list" ref="list">
                <div
                    class="item w-full h-full absolute inset-0"
                    v-for="(item, index) in bannerItem"
                    :key="index">
                    <img
                        :src="
                            item.id
                                ? backendUrl +
                                  '/storage/images/article/' +
                                  item.id +
                                  '/' +
                                  item.article_image
                                : item.article_image
                        "
                        class="w-full h-full object-cover" />
                    <div class="max-w-[1140px] m-auto">
                        <div
                            class="content absolute md:top-[20%] top-[10%] md:max-w-[80%] pl-3 md:pl-0 pr-[30%] box-border text-[#fff] sm:mx-4">
                            <div class="author font-bold tracking-[10px]">
                                {{
                                    item.category
                                        ? item.category.category_name
                                        : item.category
                                }}
                            </div>
                            <div
                                v-html="item.article_title"
                                class="title md:text-[3em] font-bold leading-[1.3em] text-lg line-clamp-2"></div>
                            <div
                                class="topic md:text-[3em] font-bold leading-[1.3em] text-3xl">
                                {{ item.topic }}
                            </div>
                            <div
                                class="des md:text-base max-w-[30rem] text-sm line-clamp-4">
                                <div v-html="item.article_content"></div>
                            </div>
                            <div class="buttons mt-5">
                                <router-link
                                    v-if="item.article_slug"
                                    :to="{
                                        name: 'user.article.show',
                                        params: {
                                            slug: item.article_slug,
                                        },
                                    }">
                                    <button
                                        class="h-10 w-[130px] border-none bg-[#eee] tracking-[3px] font-medium text-black">
                                        SEE MORE
                                    </button>
                                </router-link>
                                <!-- <button
                                    class="h-10 w-[130px] tracking-[3px] font-medium text-white border border-white bg-transparent">
                                    SUBSCRIBE
                                </button> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="thumbnail absolute bottom-[50px] left-1/2 w-max z-[100] flex gap-5"
                ref="thumbnail">
                <div
                    class="item w-[150px] h-[220px] flex-shrink-0 relative"
                    v-for="(thumb, index) in bannerItem"
                    :key="index"
                    style="cursor: pointer">
                    <img
                        :src="
                            thumb.id
                                ? backendUrl +
                                  '/storage/images/article/' +
                                  thumb.id +
                                  '/' +
                                  thumb.article_image
                                : thumb.article_image
                        "
                        class="w-full h-full object-cover rounded-[20px]" />
                    <div
                        class="content text-[#fff] absolute bottom-[10px] left-[10px] right-[10px]">
                        <div
                            class="title font-medium line-clamp-1"
                            v-html="thumb.article_title"></div>
                        <div
                            class="description font-light line-clamp-1"
                            v-html="thumb.article_content"></div>
                    </div>
                </div>
            </div>
            <div
                class="arrows absolute top-[80%] right-[52%] z-[100] w-[300px] max-w-[30%] flex gap-[10px] items-center">
                <button
                    class="w-10 h-10 rounded-[50%] bg-[#eee4] border-none text-[#fff] font-mono font-bold duration-500 hover:bg-[#fff] hover:text-black"
                    id="prev"
                    ref="prev">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button
                    class="w-10 h-10 rounded-[50%] bg-[#eee4] border-none text-[#fff] font-mono font-bold duration-500 hover:bg-[#fff] hover:text-black"
                    id="next"
                    ref="next">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </section>
</template>
