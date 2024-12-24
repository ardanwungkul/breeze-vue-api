<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUsers } from '@/stores/user'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import UserTable from '@/components/admin/user/UserTable.vue'

const storeUser = useUsers()

const users = ref([])
onMounted(async () => {
    await fetchUsers()
})
async function fetchUsers() {
    await storeUser.userAll()
    users.value = storeUser.allUser.filter(user => {
        return user.role !== 'admin'
    })
}
</script>
<template>
    <AdminLayout title="List User">
        <div class="w-full">
            <UserTable :users="users" :fetchUsers="fetchUsers" />
        </div>
    </AdminLayout>
</template>
