import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useCouriers = defineStore({
    id: 'couriers',
    state: () => ({
        couriers: [],
        loading: false,
        error: null,
    }),
    getters: {
        allCouriers: state => state.couriers,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async getCouriers() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/couriers')
                    .then(response => {
                        this.couriers = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async changeStatus(id, status) {
            this.loading = true
            console.log(id)

            try {
                const response = await axios
                    .get(`/api/couriers/${id}`)
                    .then(response => {
                        this.couriers = response.data
                        console.log(response)
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
    import.meta.hot.accept(acceptHMRUpdate(useCouriers, import.meta.hot))
}
