<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
// import EditProduct from '@/components/dialog/edit/EditProduct.vue'
import { useUsers } from '@/stores/user'
import ValidationErrors from '@/components/ValidationErrors.vue'
import AddAboutUs from '@/components/dialog/add/AddAboutUs.vue'

const storeUser = useUsers()
const props = defineProps({
    users: Array,
    fetchUsers: Function,
})
const searchUser = ref('')
const pageUser = ref(1)
const itemsPerPageUser = ref(10)

const headersUser = [
    { key: 'name', title: 'Title' },
    { key: 'email', title: 'Content' },
    { key: 'id', title: 'Action', align: 'center' },
]
const pageCount = computed(() => {
    return Math.ceil(filteredUsers.value.length / itemsPerPageUser.value)
})

const filteredUsers = computed(() => {
    return props.users.filter(user => {
        return user.name.toLowerCase().includes(searchUser.value)
    })
})

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)
const addUser = async newUser => {
    await storeUser.addUser(newUser, setErrors, processing)
    watchEffect(() => {
        props.fetchUsers()
    }, props.users)
}
const editUser = async (updateUser, id) => {
    await storeUser.editUser(updateUser, setErrors, processing, id)
    watchEffect(() => {
        props.fetchUsers()
    }, props.users)
}
const deleteUser = async id => {
    await storeUser.deleteUser(id, processing)
    watchEffect(() => {
        props.fetchUsers()
    }, props.users)
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <AddAboutUs :method="addUser"></AddAboutUs>
                <input
                    type="text"
                    v-model="searchUser"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search About Us" />
            </div>
            <v-data-table
                v-model:page="pageUser"
                :search="searchUser"
                :headers="headersUser"
                :items="users"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <!-- <EditProduct
                            :user="item"
                            :method="editUser"></EditProduct> -->
                        <ConfirmDelete
                            :type="'User'"
                            :id="item.id"
                            :method="deleteUser"></ConfirmDelete>
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageUser"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
