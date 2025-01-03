import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useProductStore = defineStore({
    id: 'product',
    state: () => ({
        products: [],
        loading: false,
        error: null,
        singleProduct: {},
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
        async productBySlugId(slug, id) {
            this.loading = true
            try {
                const response = await axios.get(
                    `/api/product/product-slug/${slug}/${id}`,
                )
                if (response.status === 200) {
                    this.singleProduct = response.data
                } else {
                    this.singleProduct = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singleProduct = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },
        async productById(id) {
            this.loading = true
            try {
                const response = await axios.get(
                    `/api/product/product-id/${id}`,
                )
                if (response.status === 200) {
                    this.singleProduct = response.data
                } else {
                    this.singleProduct = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singleProduct = {}
                } else {
                    this.error = error
                }
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
                    this.router.push({ name: 'admin.product.index' })
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
                .post(`/api/product/${id}`, updateProduct)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'admin.product.index' })
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
                console.log(this.error)
                processing.value = false
            } finally {
                processing.value = false
            }
        },
        async deleteVariant(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(
                    `/api/product-variant/${id}`,
                )
                console.log(response)
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
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
