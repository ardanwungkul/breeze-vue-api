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
        async addSubCategory(newSubCategory, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/subcategory', newSubCategory)
                .then(response => {
                    processing.value = false
                    this.subcategories.push(response.data)
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
        async editSubCategory(updateSubCategory, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/subcategory/${id}`, updateSubCategory)
                .then(response => {
                    processing.value = false
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
