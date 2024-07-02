<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUsers } from '@/stores/user'
import AdminLayout from '@/layouts/AdminLayout.vue'
import 'vuetify/styles'
import AboutUsTable from '@/components/admin/about-us/AboutUsTable.vue'

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
            <p class="text-2xl font-bold text-ezzora-900">About Us List</p>

            <AboutUsTable :users="users" :fetchUsers="fetchUsers" />
        </div>
    </AdminLayout>
</template>
