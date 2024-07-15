import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useShopPageStore = defineStore({
    id: 'shopPage',
    state: () => ({
        mainBanners: [],
        loading: false,
        error: null,
    }),
    getters: {
        allMainBanners: state => state.mainBanners,
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
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useShopPageStore, import.meta.hot))
}
