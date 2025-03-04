import axios from '@/lib/axios'
import { useStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useStoreStore = defineStore({
    id: 'store',
    state: () => ({
        store: [],
        authStatus: useStorage('authStatus', []),
        loading: false,
        error: null,
    }),
    getters: {
        allStore: state => state.store,
        authUser: state => state.authStatus === 204,
        isLoading: state => state.loading,
        getError: state => state.error,
    },
    actions: {
        async addStore(newStore, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/store', newStore)
                .then(response => {
                    processing.value = false
                    this.store.push(response.data)
                    console.log(response.data);
                    
                    // this.router.push({ name: 'admin.about-us.index' })
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                        console.log(error.response.data.errors)
                    ).flat()
                    
                    processing.value = false
                })
        },
        async reRegisteration(newStore, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/re-registeration', newStore)
                .then(response => {
                    processing.value = false
                    this.store.push(response.data)
                    console.log(response.data);
                    
                    this.router.push({ name: 'store.dashboard' })
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                        console.log(error.response.data.errors)
                    ).flat()
                    
                    processing.value = false
                })
        },
        async buyPackage(form, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/buy-package', form)
                .then(response => {
                    processing.value = true
                    console.log();
                    
                    if (!this.authUser) {
                        this.authStatus = 204
                    }

                    window.location = response.data.payment_url
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
        async paymentReseller(paymentid ,processing) {
            try {
                const response = await axios.get(
                    `api/buy-package/${paymentid}`,
                )
                if (response.status === 200) {
                    console.log(response.data);
                    
                    window.location = response.data.payment_url
                } else {
                    console.log(response.data);
                    
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    
                } else {
                    this.error = error
                }
            } finally {
                processing.value = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreStore, import.meta.hot))
}
