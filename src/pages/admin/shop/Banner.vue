<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import MainBanner from '@/pages/admin/shop/MainBanner.vue'

const tab = ref(null)
</script>
<template>
    <AdminLayout title="Banner Shop">
        <div class="w-full">
            <div
                class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 border">
                <v-card
                    class="shadow-lg border dark:!border-gray-800 dark:!shadow-white">
                    <v-tabs
                        v-model="tab"
                        class="bg-light-primary-2 dark:bg-dark-primary-1 overflow-hidden !border-none">
                        <v-tab
                            value="one"
                            class="!capitalize !font-semibold !text-typography-2 dark:!text-typography-1 !tracking-normal"
                            >Main Banner</v-tab
                        >
                        <v-tab
                            value="two"
                            class="!capitalize !font-semibold !text-typography-2 dark:!text-typography-1 !tracking-normal"
                            >Secondary Banner</v-tab
                        >
                        <v-tab
                            value="three"
                            class="!capitalize !font-semibold !text-typography-2 dark:!text-typography-1 !tracking-normal"
                            >Side Banner</v-tab
                        >
                    </v-tabs>

                    <v-card-text
                        class="!bg-light-primary-1 dark:!bg-dark-primary-2">
                        <v-tabs-window v-model="tab" class="dark:!text-white">
                            <v-tabs-window-item value="one">
                                <MainBanner />
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
