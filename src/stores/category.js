import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

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
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
}
