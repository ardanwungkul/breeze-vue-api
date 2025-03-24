import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import EditResellerPackage from '../components/dialog/edit/EditResellerPackage.vue'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useResellerPackageStore = defineStore({
    id: 'aboutus',
    state: () => ({
        resellerPackage: [],
        loading: false,
        error: null,
        singleResellerPackage: {},
    }),
    getters: {
        allResellerPackage: state => state.resellerPackage,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async resellerPackageAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/reseller-package')
                    .then(response => {
                        this.resellerPackage = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async editResellerPackage(
            updateResellerPackage,
            setErrors,
            setSuccess,
            processing,
            id,
        ) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/reseller-package/${id}`, updateResellerPackage)
                .then(response => {
                    processing.value = false
                    setSuccess.value = Object.values([
                        response.data.message,
                    ]).flat()
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
    import.meta.hot.accept(
        acceptHMRUpdate(useResellerPackageStore, import.meta.hot),
    )
}
