import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useWelcome = defineStore({
    id: 'welcome',
    state: () => ({
        data: [],
        loading: false,
        error: null,
    }),
    getters: {
        allData: state => state.data,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getData() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/welcome-page')
                    .then(response => {
                        this.data = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useWelcome, import.meta.hot))
}
