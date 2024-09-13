<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { useArticleStore } from '@/stores/article'

const store = useArticleStore()
const props = defineProps({
    articles: Array,
    fetchArticles: Function,
})
const search = ref('')
const pageUser = ref(1)
const itemsPerPageTable = ref(10)

const headersTable = [
    { key: 'article_title', title: 'Title' },
    { key: 'article_status', title: 'Status', align: 'center' },
    { key: 'article_published_at', title: 'Publish Date', align: 'center' },
    { key: 'id', title: 'Action', align: 'center', sortable: false },
]
const pageCount = computed(() => {
    return Math.ceil(filteredTables.value.length / itemsPerPageTable.value)
})

const filteredTables = computed(() => {
    return props.articles.filter(article => {
        return article.article_title.toLowerCase().includes(search.value)
    })
})

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)

const deleteArticle = async id => {
    await store.deleteArticle(id, processing)
}

const publishArticle = async id => {
    await store.publishArticle(id, processing)
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <RouterLink :to="{ name: 'admin.article.create' }">
                    <div
                        v-bind="activatorProps"
                        class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg">
                        <i class="fa-solid fa-plus"></i>
                        <p>Add Article</p>
                    </div>
                </RouterLink>
                <svg
                    v-if="processing"
                    role="status"
                    class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <input
                    type="text"
                    v-model="search"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Articles" />
            </div>
            <v-data-table
                v-model:page="pageUser"
                :search="search"
                :headers="headersTable"
                :items="articles"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <button
                            @click="publishArticle(item.id)"
                            v-if="item.article_status == 'draft'"
                            class="flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                            <i class="fa-solid fa-check"></i>
                            <p>Publish</p>
                        </button>
                        <router-link
                            :to="{
                                name: 'admin.article.edit',
                                params: {
                                    id: item.id,
                                },
                            }"
                            class="flex gap-2 items-center text-white bg-secondary-2 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
                            <i class="fa-solid fa-pen"></i>
                            <p>Edit</p>
                        </router-link>
                        <ConfirmDelete
                            :label="'Delete'"
                            :type="'Article'"
                            :id="item.id"
                            :method="deleteArticle"></ConfirmDelete>
                    </div>
                </template>
                <template v-slot:item.article_published_at="{ item }">
                    <div
                        class="flex gap-3 items-center justify-center text-xs"
                        v-if="item.article_published_at">
                        <p>{{ formatDate(item.article_published_at) }}</p>
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageUser"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
