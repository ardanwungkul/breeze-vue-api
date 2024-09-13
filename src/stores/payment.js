import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const usePaymentStore = defineStore({
    id: 'payment',
    state: () => ({
        payments: [],
        loading: false,
        error: null,
        create: {},
        edit: [],
        singlePayment: {},
    }),
    getters: {
        allPayment: state => state.payments,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async paymentAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/payment')
                    .then(response => {
                        this.payments = response.data
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
                    .get('/api/payment/create')
                    .then(response => {
                        this.create = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async paymentById(id) {
            this.loading = true
            try {
                const response = await axios.get(`/api/payment/${id}`)
                if (response.status === 200) {
                    this.singlePayment = response.data
                } else {
                    this.singlePayment = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singlePayment = {}
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
                const response = await axios.get(`/api/payment/${id}/edit`)
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

        async addPayment(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/payment', form)
                .then(response => {
                    processing.value = false
                    this.payments.push(response.data)
                    this.router.push({ name: 'admin.payment.index' })
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
        async editPayment(form, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/payment/${id}`, form)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'admin.payment.index' })
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
        async deletePayment(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/payment/${id}`)
                this.payments = this.payments.filter(
                    Payment => Payment.id !== id,
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
    import.meta.hot.accept(acceptHMRUpdate(usePaymentStore, import.meta.hot))
}
