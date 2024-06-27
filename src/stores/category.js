import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useCategoryStore = defineStore({
    id: 'category',
    state: () => ({
        categories: [],
        loading: false,
        error: null,
    }),
    getters: {
        allCategories: state => state.categories,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async categoryAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/category')
                    .then(response => {
                        this.categories = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async addCategory(newCategory, processing) {
            processing.value = true
            try {
                const response = await axios.post('/api/category', newCategory)
                this.categories.push(response.data)
                processing.value = false
            } catch (error) {
                this.error = error
                processing.value = false
            } finally {
                processing.value = false
            }
        },
        async deleteCategory(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/category/${id}`)
                processing.value = false
            } catch (error) {
                this.error = error
                processing.value = false
            } finally {
                processing.value = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
}
