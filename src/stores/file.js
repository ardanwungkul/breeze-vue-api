import axios from '@/lib/axios'
import { useStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useUsers } from './user'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useFileStore = defineStore({
    id: 'xenditFile',
    state: () => ({
        files: [],
        file: {},
    }),
    actions: {
        async post(form) {
            await csrf()
            console.log(form)

            axios
                .post('api/xendit/file', form, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status !== 422) throw error

                    // setErrors.value = Object.values(
                    //     error.response.data.errors,
                    //     console.log(error.response.data.errors),
                    // ).flat()
                })
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFileStore, import.meta.hot))
}
