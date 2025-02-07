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
        product: {},
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
        async purchaseUser(id, processing) {
            processing.value = true
            try {
                const response = await axios
                    .get(`/api/purchase/user/${id}`)
                    .then(response => {
                        this.payments = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                processing.value = false
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
        async paymentById(id, loading) {
            loading.value = true
            try {
                const response = await axios.get(`/api/payment-by-id/${id}`)
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
                loading.value = false
            }
        },
        async paymentByInvoiceCode(invoice, loading) {
            loading.value = true
            try {
                const response = await axios.get(
                    `/api/payment-by-invoice-code/${invoice}`,
                )
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
                loading.value = false
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
        async checkQrPacking(
            form,
            setErrors,
            processing,
            invoice,
            qr,
            setSuccess,
            payment,
        ) {
            await csrf()
            processing.value = true
            qr.value.paused = true
            axios
                .post(`/api/scan-product-by-invoice-code/${invoice}`, form)
                .then(response => {
                    payment.value.forEach(item => {
                        if (item.product.id === response.data.product.id) {
                            if (item.scanned < item.quantity) {
                                if (
                                    response.data.product.product_code_type ==
                                    'common_code'
                                ) {
                                    if (
                                        !item.code.includes(response.data.code)
                                    ) {
                                        item.code.push(response.data.code)
                                    }

                                    item.scanned += 1
                                } else {
                                    if (
                                        !item.code.includes(response.data.code)
                                    ) {
                                        item.code.push(response.data.code)
                                        item.scanned += 1
                                    } else {
                                        setErrors.value = Object.values([
                                            'Product Already Packed',
                                        ]).flat()
                                    }
                                }
                            } else {
                                setErrors.value = Object.values([
                                    'Product Already Packed',
                                ]).flat()
                            }
                        }
                    })
                    processing.value = false
                    qr.value.paused = false
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                    qr.value.paused = false
                })
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
        async checkout(form, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/payment-checkout', form)
                .then(response => {
                    processing.value = false
                    console.log(response.data)

                    window.location = response.data.payment_url
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
        async createOrder(id, processing, setErrors, setSuccess) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.post(
                    `/api/payment-create-order/${id}`,
                )
                console.log(response)
                setSuccess.value = Object.values([
                    response.data.biteship.original.message,
                ])
                this.payments = this.payments.filter(
                    Payment => Payment.id !== id,
                )

                processing.value = false
            } catch (error) {
                console.log(error)

                if (error.response.status !== 422) throw error

                setErrors.value = Object.values(
                    error.response.data.errors,
                ).flat()
                processing.value = false
            } finally {
                processing.value = false
            }
        },
        async downloadWaybill(invoice) {
            this.loading = true
            try {
                window.location.href =
                    import.meta.env.VITE_PUBLIC_BACKEND_URL +
                    `/api/biteship/download-waybill/${invoice}`
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePaymentStore, import.meta.hot))
}
