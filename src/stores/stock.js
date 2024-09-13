import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useStockStore = defineStore({
    id: 'stock',
    state: () => ({
        stocks: [],
        loading: false,
        error: null,
        create: {},
        edit: [],
        singleStock: {},
    }),
    getters: {
        allStock: state => state.stocks,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async stockAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/stock')
                    .then(response => {
                        this.stocks = response.data
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
                    .get('/api/stock/create')
                    .then(response => {
                        this.create = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async stockById(id) {
            this.loading = true
            try {
                const response = await axios.get(`/api/stock/${id}`)
                if (response.status === 200) {
                    this.singleStock = response.data
                } else {
                    this.singleStock = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singleStock = {}
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
                const response = await axios.get(`/api/stock/${id}/edit`)
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

        async addStock(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/stock', form)
                .then(response => {
                    processing.value = false
                    this.stocks.push(response.data)
                    this.router.push({ name: 'admin.stock.index' })
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
        async editStock(form, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/stock/${id}`, form)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'admin.stock.index' })
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
        async deleteStock(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/stock/${id}`)
                this.stocks = this.stocks.filter(Stock => Stock.id !== id)

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
    import.meta.hot.accept(acceptHMRUpdate(useStockStore, import.meta.hot))
}
