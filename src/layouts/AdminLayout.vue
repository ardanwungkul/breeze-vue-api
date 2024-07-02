<script setup>
import { ref, inject, provide } from 'vue'
import Navigation from '@/components/AdminNavigation.vue'

const rail = ref(false)
provide('rail', rail)
</script>
<template>
    <v-app class="!bg-ezzora-50">
        <Navigation />
        <v-main>
            <v-container class="!py-0">
                <div class="py-5 px-10">
                    <slot />
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>
