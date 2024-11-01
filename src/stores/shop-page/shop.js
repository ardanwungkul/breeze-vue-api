import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useShopStore = defineStore({
    id: 'shop',
    state: () => ({
        data: [],
        loading: false,
        error: null,
    }),
    actions: {
        async getData(loading) {
            loading.value = true
            try {
                const response = await axios.get('/api/shop-page')
                this.data = response.data
            } catch (error) {
                console.error('Error fetching data:', error)
                this.error = error
            } finally {
                loading.value = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useShopStore, import.meta.hot))
}
