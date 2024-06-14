<script setup>
import { RouterView } from 'vue-router'
import { ref, inject, provide } from 'vue'
import Navigation from '@/components/AdminNavigation.vue'

const rail = ref(false)
provide('rail', rail)
</script>
<template>
    <div class="font-poppins">
        <v-card class="!bg-neutral-100">
            <v-layout>
                <div class="py-3 h-screen relative">
                    <div class="h-full sticky top-0">
                        <Navigation></Navigation>
                    </div>
                </div>

                <div class="min-h-screen w-full p-5">
                    <div class="bg-white rounded-lg p-5">
                        <slot />
                    </div>
                </div>
            </v-layout>
        </v-card>
    </div>
</template>
