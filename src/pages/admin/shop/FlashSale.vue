<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUsers } from '@/stores/user'
import AdminLayout from '@/layouts/AdminLayout.vue'
import 'vuetify/styles'
import FlashSaleTable from '@/components/admin/shop/FlashSaleTable.vue'

const storeUser = useUsers()
const users = ref([])
const tab = ref(null)

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
    <AdminLayout title="Flash Sale">
        <div class="w-full">
            <FlashSaleTable :users="users" :fetchUsers="fetchUsers" />
        </div>
    </AdminLayout>
</template>
