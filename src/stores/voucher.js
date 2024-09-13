import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useVoucherStore = defineStore({
    id: 'voucher',
    state: () => ({
        vouchers: [],
        loading: false,
        error: null,
        singleVoucher: {},
    }),
    getters: {
        allVoucher: state => state.vouchers,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async voucherAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/voucher')
                    .then(response => {
                        this.vouchers = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async voucherById(id) {
            this.loading = true
            try {
                const response = await axios.get(
                    `/api/voucher/voucher-id/${id}`,
                )
                if (response.status === 200) {
                    this.singleVoucher = response.data
                } else {
                    this.singleVoucher = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singleVoucher = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },

        async addVoucher(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/voucher', form)
                .then(response => {
                    processing.value = false
                    this.vouchers.push(response.data)
                    this.router.push({ name: 'admin.voucher.index' })
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
        async editVoucher(form, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/voucher/${id}`, form)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'admin.voucher.index' })
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
        async deleteVoucher(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/voucher/${id}`)
                this.vouchers = this.vouchers.filter(
                    Voucher => Voucher.id !== id,
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
        async downloadVoucher(id, processing) {
            processing.value = true
            try {
                const url =
                    import.meta.env.VITE_PUBLIC_BACKEND_URL +
                    `/api/voucher/download/${id}`
                window.open(url, '_blank')

                processing.value = false
            } catch (error) {
                this.error = error
                console.log(this.error)
                processing.value = false
            } finally {
                processing.value = false
            }
        },
        async downloadAllVoucher(id, processing) {
            processing.value = true
            try {
                const url =
                    import.meta.env.VITE_PUBLIC_BACKEND_URL +
                    `/api/voucher/download-all/${id}`
                window.open(url, '_blank')

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
    import.meta.hot.accept(acceptHMRUpdate(useVoucherStore, import.meta.hot))
}
