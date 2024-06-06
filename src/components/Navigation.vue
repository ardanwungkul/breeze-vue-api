<script setup>
import NavLink from '@/components/NavLink.vue'
import { ref } from 'vue'

const navItems = ref([
    {
        name: 'Home',
        to: 'welcome',
    },
    {
        name: 'Shop',
        to: 'shop',
    },
    {
        name: 'Article',
        to: 'article',
    },
    {
        name: 'Official Agent',
        to: 'officialAgent',
    },
    {
        name: 'About Us',
        to: 'aboutUs',
    },
])
</script>
<template>
    <nav
        class="bg-[#f4f0ed] border-b border border-white fixed top-0 w-full z-[9999]">
        <div class="max-w-[1140px] mx-auto px-1">
            <div class="flex justify-between h-[56px] items-center">
                <!-- Logo -->
                <div class="shrink-0 flex items-center py-[5px] pr-4">
                    <router-link to="/">
                        <p
                            class="font-poppins text-xl font-extralight uppercase">
                            Ezzora
                        </p>
                    </router-link>
                </div>

                <!-- Navigation Links -->
                <div class="flex items-center font-poppins text-base font-base">
                    <NavLink
                        v-for="(item, index) in navItems"
                        :key="index"
                        :name="item.to">
                        {{ item.name }}
                    </NavLink>
                    <div class="ml-6 flex gap-5 pr-2 items-center">
                        <div>
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <div>
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div>
                            <router-link to="login">
                                <div
                                    class="rounded-full w-[30px] h-[30px] border flex items-center justify-center border-white">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
