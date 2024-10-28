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
        async getProvince() {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/address/province/`)
                    .then(response => {
                        this.province = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getCitiesByProvince(id) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/address/cities/${id}`)
                    .then(response => {
                        this.city = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getSubdistrictsByCity(id) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/address/subdistrict/${id}`)
                    .then(response => {
                        this.subdistrict = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getVillagesBySubdistrict(id) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/address/village/${id}`)
                    .then(response => {
                        this.village = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getPostCodeByVillage(id) {
            this.loading = true
            try {
                const response = await axios
                    .get(`/api/address/post-code/${id}`)
                    .then(response => {
                        this.post_code = response.data
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
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAddressStore, import.meta.hot))
}
