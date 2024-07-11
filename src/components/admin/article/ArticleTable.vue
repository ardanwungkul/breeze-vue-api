<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import AddArticle from '@/components/dialog/add/AddArticle.vue'
// import EditProduct from '@/components/dialog/edit/EditProduct.vue'
import { useUsers } from '@/stores/user'
import ValidationErrors from '@/components/ValidationErrors.vue'

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
    { key: 'email', title: 'Created By' },
    { key: 'email', title: 'Published' },
    { key: 'email', title: 'Publish Date' },
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
        <div class="bg-ezzora-100 p-5 rounded-lg space-y-3 border">
            <div class="flex justify-between items-center">
                <AddArticle :method="addUser"></AddArticle>
                <input
                    type="text"
                    v-model="searchUser"
                    class="rounded-lg text-sm min-w-52"
                    placeholder="Search Articles" />
            </div>
            <v-data-table
                v-model:page="pageUser"
                :search="searchUser"
                :headers="headersUser"
                :items="users"
                hide-default-footer
                :header-props="{
                    class: 'bg-ezzora-200',
                }"
                item-key="id"
                class="border shadow-lg">
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
                class="bg-ezzora-200 rounded-lg"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
