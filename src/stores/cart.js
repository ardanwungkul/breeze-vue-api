import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        carts: [],
        loading: false,
        error: null,
        singleCart: {},
    }),
    getters: {
        allCart: state => state.carts,
        cartsCount: state => state.carts.length,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async cartAll(id, processing) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/cart/${id}`)
                    .then(response => {
                        this.carts = response.data
                    })
                processing.value = false
            } catch (error) {
                this.error = error
                processing.value = false
            } finally {
                this.loading = false
                processing.value = false
            }
        },
        async cartById(id) {
            this.loading = true
            try {
                const response = await axios.get(`/api/cart/cart-id/${id}`)
                if (response.status === 200) {
                    this.singleCart = response.data
                } else {
                    this.singleCart = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singleCart = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },

        async changeQuantity(form, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/cart-change-quantity', form)
                .then(response => {
                    processing.value = false
                    console.log(response)

                    // this.carts.push(response.data)
                    // this.router.push({ name: 'cart.index' })
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
        async getDataByMultipleId(form, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/cart-by-multiple-id', form)
                .then(response => {
                    processing.value = false
                    this.carts = response.data
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
        async addCart(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/cart', form)
                .then(response => {
                    processing.value = false
                    console.log(response.data)
                    if (response.data.status == 'new') {
                        this.carts.push(response.data.cart)
                    }
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
        async buyNow(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/cart', form)
                .then(response => {
                    processing.value = false
                    console.log(response.data)
                    if (response.data.status == 'new') {
                        this.carts.push(response.data.cart)
                    }
                    this.router.push({
                        name: 'cart.index',
                        query: { id: response.data.cart.id },
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
        async editCart(form, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/cart/${id}`, form)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'cart.index' })
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
        async deleteCart(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/cart/${id}`)
                this.carts = this.carts.filter(Cart => Cart.id !== id)
                processing.value = false
            } catch (error) {
                this.error = error
                console.log(this.error)
                processing.value = false
            } finally {
                processing.value = false
            }
        },
        async deleteSelectedCart(form, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.post(
                    `/api/delete-multiple-cart/`,
                    form,
                )
                this.carts = this.carts.filter(
                    cart => !response.data.includes(cart.id.toString()),
                )
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
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
