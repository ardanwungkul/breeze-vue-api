import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useProductStore = defineStore({
    id: 'product',
    state: () => ({
        products: [],
        loading: false,
        error: null,
    }),
    getters: {
        allProduct: state => state.products,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async productAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/product')
                    .then(response => {
                        this.products = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async addProduct(newProduct, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/product', newProduct)
                .then(response => {
                    processing.value = false
                    this.products.push(response.data)
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
        async editProduct(updateProduct, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .put(`/api/product/${id}`, updateProduct)
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
        async deleteProduct(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/product/${id}`)
                console.log(response)
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
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
