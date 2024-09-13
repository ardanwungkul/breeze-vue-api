import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useArticleStore = defineStore({
    id: 'article',
    state: () => ({
        articles: [],
        loading: false,
        error: null,
        create: {},
        edit: [],
        singleArticle: {},
        slugCreated: {},
    }),
    getters: {
        allArticle: state => state.articles,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async articleAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/article')
                    .then(response => {
                        this.articles = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getDataCreate() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/article/create')
                    .then(response => {
                        this.create = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async articleById(id) {
            this.loading = true
            try {
                const response = await axios.get(
                    `/api/article/article-id/${id}`,
                )
                if (response.status === 200) {
                    this.singleArticle = response.data
                } else {
                    this.singleArticle = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singleArticle = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },
        async getDataEdit(id) {
            this.loading = true
            try {
                const response = await axios.get(`/api/article/${id}/edit`)
                this.edit = response.data
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.edit = []
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },

        async addArticle(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/article', form)
                .then(response => {
                    processing.value = false
                    this.articles.push(response.data)
                    this.router.push({ name: 'admin.article.index' })
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },
        async editArticle(form, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/article/${id}`, form)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'admin.article.index' })
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },
        async deleteArticle(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/article/${id}`)
                this.articles = this.articles.filter(
                    Article => Article.id !== id,
                )

                processing.value = false
            } catch (error) {
                this.error = error
                console.log(this.error)
                processing.value = false
            } finally {
                processing.value = false
            }
        },
        async publishArticle(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.post(
                    `/api/article-change-status/${id}`,
                )
                const updatedArticleId = response.data.id
                const articleIndex = this.articles.findIndex(
                    article => article.id === updatedArticleId,
                )
                if (articleIndex !== -1) {
                    this.articles[articleIndex] = {
                        ...this.articles[articleIndex],
                        ...response.data,
                    }
                }

                processing.value = false
            } catch (error) {
                this.error = error
                console.log(this.error)
                processing.value = false
            } finally {
                processing.value = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useArticleStore, import.meta.hot))
}
