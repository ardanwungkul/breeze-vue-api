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
        async categoryWithSubCategory() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/category-with-subcategory')
                    .then(response => {
                        this.categories = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async addCategory(newCategory, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/category', newCategory)
                .then(response => {
                    processing.value = false
                    this.categories.push(response.data)
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
        async editCategory(updateCategory, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/category/${id}`, updateCategory)
                .then(response => {
                    processing.value = false
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
