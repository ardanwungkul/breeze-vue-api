import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import AddProduct from '../../components/dialog/add/AddProduct.vue'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useFlashSaleStore = defineStore({
    id: 'flash-sale',
    state: () => ({
        flashSales: [],
        loading: false,
        error: null,
        singleFlashSale: {},
    }),
    getters: {
        allFlashSales: state => state.flashSales,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async flashSaleAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/flash-sale')
                    .then(response => {
                        this.flashSales = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getFlashSaleById(id) {
            this.loading = true
            try {
                const response = await axios.get(`/api/flash-sale/${id}`)
                if (response.status === 200) {
                    this.singleFlashSale = response.data
                } else {
                    this.singleFlashSale = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singleFlashSale = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },
        async addFlashSale(newFlashSale, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/flash-sale', newFlashSale)
                .then(response => {
                    processing.value = false
                    this.flashSales.push(response.data)
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
        async addProduct(id, form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/flash-sale/${id}/product`, form)
                .then(response => {
                    processing.value = false
                    response.data.added_products.forEach(product => {
                        this.singleFlashSale.flash_sale_product.push(product)
                    })
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
        async deleteFlashSale(id, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .delete(`api/flash-sale/${id}`)
                .then(response => {
                    this.flashSales = this.flashSales.filter(
                        FlashSale => FlashSale.id !== id,
                    )
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
        async deleteFlashSaleProduct(id, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .delete(`api/flash-sale-product/${id}/`)
                .then(response => {
                    processing.value = false
                    this.singleFlashSale.flash_sale_product =
                        this.singleFlashSale.flash_sale_product.filter(
                            product => product.id !== id,
                        )
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
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFlashSaleStore, import.meta.hot))
}
