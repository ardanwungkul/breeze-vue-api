import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSubCategoryStore = defineStore({
    id: 'subcategory',
    state: () => ({
        subcategories: [],
        loading: false,
        error: null,
    }),
    getters: {
        allSubCategories: state => state.subcategories,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async subCategoryAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/subcategory')
                    .then(response => {
                        this.subcategories = response.data
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
        acceptHMRUpdate(useSubCategoryStore, import.meta.hot),
    )
}
