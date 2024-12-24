import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useAddressStore = defineStore({
    id: 'address',
    state: () => ({
        loading: false,
        error: null,
        province: [],
        city: [],
        subdistrict: [],
        village: [],
        post_code: [],
        address: [],
        couriers: {},
    }),
    getters: {
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData(id) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/address-by-id/${id}`)
                    .then(response => {
                        this.address = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async searchAddress(form, options) {
            this.loading = true
            try {
                const response = await axios
                    .post(`/api/biteship/map/`, form)
                    .then(response => {
                        console.log(response)

                        options.value = response.data.areas
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async addData(form, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/address', form)
                .then(response => {
                    processing.value = false
                    console.log(response)

                    this.address.push(response.data)
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
        async editData(form, id, processing) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/address/${id}`, form)
                .then(response => {
                    processing.value = false
                    console.log(response)

                    const index = this.address.findIndex(
                        address => address.id === id,
                    )

                    if (index !== -1) {
                        this.address[index] = response.data
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
        async setDefaultAddress(form, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.post(
                    `/api/set-default-address`,
                    form,
                )
                this.address = response.data
                processing.value = false
            } catch (error) {
                this.error = error
                console.log(this.error)
                processing.value = false
            } finally {
                processing.value = false
            }
        },
        async deleteData(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/address/${id}`)
                this.address = this.address.filter(ad => ad.id !== id)
                processing.value = false
            } catch (error) {
                this.error = error
                console.log(this.error)
                processing.value = false
            } finally {
                processing.value = false
            }
        },
        async getRate(form, processing, couriers) {
            await csrf()
            processing.value = true
            axios
                .post('/api/biteship/rates', form)
                .then(response => {
                    processing.value = false
                    console.log(response)
                    couriers.value = response.data.pricing
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
    import.meta.hot.accept(acceptHMRUpdate(useAddressStore, import.meta.hot))
}
