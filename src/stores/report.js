import axios from '@/lib/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useReportStore = defineStore({
    id: 'report',
    state: () => ({
        datas: [],
        data: {},
        loading: false,
        error: null,
    }),
    actions: {
        async dashboard() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/report/dashboard')
                    .then(response => {
                        console.log(response)

                        this.datas = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getDataCreate() {
            this.loading = true
            try {
                const response = await axios
                    .get('/api/expense/create')
                    .then(response => {
                        this.create = response.data
                    })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async expenseById(id) {
            this.loading = true
            try {
                const response = await axios.get(
                    `/api/expense/expense-id/${id}`,
                )
                if (response.status === 200) {
                    this.singleExpense = response.data
                } else {
                    this.singleExpense = {}
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.singleExpense = {}
                } else {
                    this.error = error
                }
            } finally {
                this.loading = false
            }
        },
        async downloadExpense(id) {
            this.loading = true
            try {
                window.location.href =
                    import.meta.env.VITE_PUBLIC_BACKEND_URL +
                    `/api/expense/download/${id}`
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },

        async addExpense(form, setErrors, processing) {
            await csrf()
            processing.value = true
            axios
                .post('/api/expense', form)
                .then(response => {
                    processing.value = false
                    this.expenses.push(response.data)
                    this.router.push({ name: 'admin.cashflow.index' })
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
        async editExpense(form, setErrors, processing, id) {
            await csrf()
            processing.value = true
            axios
                .post(`/api/expense/${id}`, form)
                .then(response => {
                    processing.value = false
                    this.router.push({ name: 'admin.cashflow.index' })
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
        async deleteExpense(id, processing) {
            await csrf()
            processing.value = true
            try {
                const response = await axios.delete(`/api/expense/${id}`)
                this.expenses = this.expenses.filter(
                    expense => expense.id !== id,
                )
                processing.value = false
            } catch (error) {
                this.error = error
                console.log(this.error)
                processing.value = false
            } finally {
                processing.value = false
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useReportStore, import.meta.hot))
}
