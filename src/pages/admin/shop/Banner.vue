<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import 'vuetify/styles'
import UserTable from '@/components/admin/user/UserTable.vue'

const tab = ref(null)
</script>
<template>
    <AdminLayout title="Banner Shop">
        <div class="w-full">
            <!-- <UserTable :users="users" :fetchUsers="fetchUsers" /> -->
            <div class="bg-ezzora-100 p-5 rounded-lg space-y-3 border">
                <v-card>
                    <v-tabs v-model="tab" class="bg-ezzora-200 border">
                        <v-tab
                            value="one"
                            class="!capitalize !font-semibold !text-ezzora-800 !tracking-normal"
                            >Main Banner</v-tab
                        >
                        <v-tab
                            value="two"
                            class="!capitalize !font-semibold !text-ezzora-800 !tracking-normal"
                            >Secondary Banner</v-tab
                        >
                        <v-tab
                            value="three"
                            class="!capitalize !font-semibold !text-ezzora-800 !tracking-normal"
                            >Side Banner</v-tab
                        >
                    </v-tabs>

                    <v-card-text>
                        <v-tabs-window v-model="tab">
                            <v-tabs-window-item value="one">
                                One
                            </v-tabs-window-item>

                            <v-tabs-window-item value="two">
                                Two
                            </v-tabs-window-item>

                            <v-tabs-window-item value="three">
                                Three
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </AdminLayout>
</template>
