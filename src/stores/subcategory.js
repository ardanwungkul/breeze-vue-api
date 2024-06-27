import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

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
        async addSubCategory(newSubCategory, processing) {
            processing.value = true
            try {
                const response = await axios.post(
                    '/api/subcategory',
                    newSubCategory,
                )
                console.log(response)
                this.subcategories.push(response.data)
                processing.value = false
            } catch (error) {
                this.error = error
                processing.value = false
            } finally {
                processing.value = false
            }
        },
        async deleteSubCategory(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/subcategory/${id}`)
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
    import.meta.hot.accept(
        acceptHMRUpdate(useSubCategoryStore, import.meta.hot),
    )
}
