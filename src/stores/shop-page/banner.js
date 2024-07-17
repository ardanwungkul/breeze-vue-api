import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useShopPageStore = defineStore({
    id: 'shopPage',
    state: () => ({
        mainBanners: [],
        secondaryBanners: [],
        sideBanners: [],
        loading: false,
        error: null,
    }),
    getters: {
        allMainBanners: state => state.mainBanners,
        allSecondaryBanners: state => state.secondaryBanners,
        allSideBanners: state => state.secondaryBanners,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getAllMainBanner() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/main-banner')

                    .then(response => {
                        this.mainBanners = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async addMainBanner(newBanner, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/main-banner', newBanner)
                .then(response => {
                    processing.value = false
                    this.mainBanners.push(response.data)
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
        async deleteMainBanner(id, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .delete(`/api/main-banner/delete/${id}`)
                .then(response => {
                    processing.value = false
                    this.mainBanners = this.mainBanners.filter(
                        banner => banner.id !== id,
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
        async updateMainBannerStatus(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/main-banner/status', form)
                .then(response => {
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
        async getAllSecondaryBanner() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/secondary-banner')
                    .then(response => {
                        this.secondaryBanners = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async addSecondaryBanner(newBanner, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/secondary-banner', newBanner)
                .then(response => {
                    processing.value = false
                    this.secondaryBanners.push(response.data)
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
        async deleteSecondaryBanner(id, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .delete(`/api/secondary-banner/delete/${id}`)
                .then(response => {
                    processing.value = false
                    this.secondaryBanners = this.secondaryBanners.filter(
                        banner => banner.id !== id,
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
        async updateSecondaryBannerStatus(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/secondary-banner/status', form)
                .then(response => {
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
        async getAllSideBanner() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/side-banner')
                    .then(response => {
                        this.sideBanners = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async addSideBanner(newBanner, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/side-banner', newBanner)
                .then(response => {
                    processing.value = false
                    this.sideBanners.push(response.data)
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
        async deleteSideBanner(id, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .delete(`/api/side-banner/delete/${id}`)
                .then(response => {
                    processing.value = false
                    this.sideBanners = this.sideBanners.filter(
                        banner => banner.id !== id,
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
        async updateSideBannerStatus(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/side-banner/status', form)
                .then(response => {
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
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useShopPageStore, import.meta.hot))
}
