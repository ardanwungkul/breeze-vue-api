<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUsers } from '@/stores/user'
import AdminLayout from '@/layouts/AdminLayout.vue'
import 'vuetify/styles'
import UserTable from '@/components/admin/user/UserTable.vue'

const storeUser = useUsers()

const users = ref([])
onMounted(async () => {
    await fetchUsers()
})
async function fetchUsers() {
    await storeUser.userAll()
    users.value = storeUser.allUser.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
    }))
}
</script>
<template>
    <AdminLayout>
        <div class="w-full space-y-5">
            <p class="text-2xl font-bold text-ezzora-900">Shop</p>

            <!-- <UserTable :users="users" :fetchUsers="fetchUsers" /> -->
            <div class="bg-ezzora-100 p-5 rounded-lg space-y-3 border">
                <p class="font-semibold text-lg text-gray-500">Banner</p>
            </div>
        </div>
    </AdminLayout>
</template>
