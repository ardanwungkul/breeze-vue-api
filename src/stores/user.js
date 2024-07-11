import axios from '@/lib/axios'
import { useStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useUsers = defineStore('users', {
    state: () => ({
        products: [],
        userData: useStorage('userData', []),
        authStatus: useStorage('authStatus', []),
    }),

    getters: {
        allUser: state => state.users,
        isLoading: state => state.loading,
        getError: state => state.error,
        authUser: state => state.authStatus === 204,
        hasUserData: state => Object.keys(state.userData).length > 0,
        hasVerified: state =>
            Object.keys(state.userData).length > 0
                ? state.userData.email_verified_at !== null
                : false,
    },

    actions: {
        getData() {
            axios
                .get('/api/user')
                .then(response => {
                    this.userData = response.data
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error

                    this.router.push('/verify-email')
                })
        },
        async userAll() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/users')
                    .then(response => {
                        this.users = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },

        async addUser(newUser, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/users', newUser)
                .then(response => {
                    processing.value = false
                    this.users.push(response.data.user)
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },
        async editUser(updateUser, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/users/${id}`, updateUser)
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

        async deleteUser(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/users/${id}`)
                processing.value = false
            } catch (error) {
                this.error = error
                processing.value = false
            } finally {
                processing.value = false
            }
        },

        async register(form, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/register', form.value)
                .then(response => {
                    this.authStatus = response.status
                    processing.value = false

                    this.router.push({ name: 'dashboard' })
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        async login(form, setErrors, processing) {
            await csrf()
            console.log(await csrf())

            processing.value = true

            axios
                .post('/login', form.value)
                .then(response => {
                    this.authStatus = response.status
                    processing.value = false

                    this.router.push({ name: 'admin.dashboard' })
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

        async forgotPassword(form, setStatus, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/forgot-password', form.value)
                .then(response => {
                    setStatus.value = response.data.status
                    processing.value = false
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        async resetPassword(form, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/reset-password', form.value)
                .then(response => {
                    this.router.push(
                        '/login?reset=' + btoa(response.data.status),
                    )
                    processing.value = false
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        resendEmailVerification(setStatus, processing) {
            processing.value = true

            axios.post('/email/verification-notification').then(response => {
                setStatus.value = response.data.status
                processing.value = false
            })
        },

        async logout() {
            await axios
                .post('/logout')
                .then(() => {
                    this.$reset()
                    this.userData = {}
                    this.authStatus = []

                    this.router.push({ name: 'welcome' })
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error
                })
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot))
}
