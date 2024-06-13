<script setup>
import { ref, inject } from 'vue'
const rail = inject('rail')
const sidebarItem = ref([
    {
        icon: 'fa-solid fa-users',
        to: 'admin.user',
        title: 'User',
    },
    {
        icon: 'fa-solid fa-box',
        to: 'admin.dashboard',
        title: 'Product',
    },
    {
        icon: 'fa-solid fa-store',
        to: 'admin.dashboard',
        title: 'Shop',
    },
    {
        icon: 'fa-solid fa-newspaper',
        to: 'admin.dashboard',
        title: 'Articles',
    },
    {
        icon: 'fa-solid fa-building',
        to: 'admin.dashboard',
        title: 'About Us',
    },
    {
        icon: 'fa-solid fa-credit-card',
        to: 'admin.dashboard',
        title: 'Payment',
    },
    {
        icon: 'fa-solid fa-user-check',
        to: 'admin.dashboard',
        title: 'Agent',
    },
    {
        icon: 'fa-solid fa-tags',
        to: 'admin.dashboard',
        title: 'Voucher',
    },
])
</script>
<template>
    <v-navigation-drawer
        :rail="rail"
        rail-width="60"
        permanent=""
        class="!rounded-2xl !ml-5 !relative !shadow-lg">
        <button
            @click.stop="rail = !rail"
            class="absolute -right-3 z-10 bg-white w-8 h-8 rounded-full border border-black">
            <i
                class="fa-solid"
                :class="!rail ? 'fa-chevron-left' : 'fa-chevron-right'"></i>
        </button>
        <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                subtitle="sandra_a88@gmailcom"
                title="Sandra Adams"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <ul class="p-2 space-y-1">
            <li v-for="(item, index) in sidebarItem" :key="index">
                <router-link :to="{ name: item.to }">
                    <div
                        class="w-full py-2 px-2 hover:bg-neutral-200 cursor-pointer rounded-lg flex items-center gap-4">
                        <div class="w-[28px] flex-none flex justify-center">
                            <i :class="item.icon" class="text-neutral-500"></i>
                        </div>
                        <p
                            class="font-medium text-sm whitespace-nowrap text-gray-700">
                            {{ item.title }}
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </v-navigation-drawer>
</template>
