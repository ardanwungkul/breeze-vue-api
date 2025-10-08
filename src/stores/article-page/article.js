import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useArticlePageStore = defineStore({
    id: 'articlePage',
    state: () => ({
        data: [],
        loading: false,
        error: null,
        article: {},
    }),
    getters: {
        allData: state => state.data,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData(loading) {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/article-page')
                    .then(response => {
                        this.data = response.data
                        loading.value = false
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getDataBySlug(slug, loading) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/article-page/${slug}`)
                    .then(response => {
                        this.article = response.data
                        loading.value = false
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useArticlePageStore, import.meta.hot),
    )
}
