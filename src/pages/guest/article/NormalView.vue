<script setup>
// import person from '@/assets/images/person.jpeg'
// import flower from '@/assets/images/flower.jpeg'
import { ref, computed } from 'vue'
import banner5 from '@/assets/images/banner-5.jpeg'

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
                item.article_view_type === 'Normal' &&
                item.article_status == 'publish',
        )
    } else {
        return []
    }
})
const defaultItem = ref([
    {
        article_title: 'Skincare',
        article_content:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut eum similique repellat a laborum, rerum voluptates ipsam eos.',
        article_image: banner5,
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
    <div
        class="w-full max-w-[1320px] px-3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-24 md:pt-16 gap-7 mt-5">
        <div
            v-for="(item, index) in items"
            :key="i"
            class="bg-light-primary-1 rounded-lg shadow-lg p-3 relative flex flex-col">
            <v-img
                :src="
                    item.id
                        ? backendUrl +
                          '/storage/images/article/' +
                          item.id +
                          '/' +
                          item.article_image
                        : banner5
                "
                aspect-ratio="1"
                class="w-full rounded-t-lg"
                cover>
                <template v-slot:placeholder>
                    <div class="w-full h-full flex justify-center items-center">
                        <v-progress-circular
                            color=""
                            indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
            <div class="flex flex-col justify-between h-full p-3 gap-2">
                <div>
                    <div
                        class="text-start text-lg capitalize font-medium line-clamp-1">
                        {{ item.article_title }}
                    </div>
                    <div
                        class="line-clamp-3 text-sm"
                        v-html="item.article_content"></div>
                </div>
                <router-link
                    v-if="item.article_slug"
                    :to="{
                        name: 'user.article.show',
                        params: {
                            slug: item.article_slug,
                        },
                    }">
                    <button class="p-2 border w-min whitespace-nowrap">
                        View More
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>
