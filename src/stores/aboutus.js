import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useAboutUsStore = defineStore({
    id: 'aboutus',
    state: () => ({
        aboutus: [],
        loading: false,
        error: null,
        singleAboutUs: {}
    }),
    getters: {
        allAboutUs: state => state.aboutus,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async aboutUsAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/about-us')
                    .then(response => {
                        this.aboutus = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async addAboutUs(newAboutUs, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/about-us', newAboutUs)
                .then(response => {
                    processing.value = false
                    this.aboutus.push(response.data)
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
        async aboutUsById(id) {
            this.loading = true
            try {
                const response = await axios.get(`/api/about-us/${id}`)
                if (response.status === 200) {
                    this.singleAboutUs = response.data
                } else {
                    this.singleAboutUs = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singleAboutUs = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },
        async editAboutUs(updateAboutUs, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/about-us/${id}`, updateAboutUs)
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
        async deleteAboutUs(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/about-us/${id}`)
                processing.value = false
                console.log(response);
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
    import.meta.hot.accept(
        acceptHMRUpdate(useAboutUsStore, import.meta.hot),
    )
}
