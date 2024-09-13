<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import ArticleTable from '@/components/admin/article/ArticleTable.vue'
import { useArticleStore } from '@/stores/article'

const store = useArticleStore()

const articles = ref([])
onMounted(async () => {
    await store.articleAll()
    await fetchArticles()
})
async function fetchArticles() {
    articles.value = store.articles
}
watchEffect(async () => {
    await fetchArticles()
})
</script>
<template>
    <AdminLayout title="List Articles">
        <div class="w-full">
            <ArticleTable :articles="articles" :fetchArticles="fetchArticles" />
        </div>
    </AdminLayout>
</template>
