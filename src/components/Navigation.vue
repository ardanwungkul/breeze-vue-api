<script setup>
import NavLink from '@/components/NavLink.vue'
import { ref, onMounted } from 'vue'
import { Collapse } from 'flowbite'

onMounted(() => {
    const $targetEl = document.getElementById('targetEl')
    const $triggerEl = document.getElementById('triggerEl')

    new Collapse($targetEl, $triggerEl)
})

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
                <div
                    class="md:flex items-center font-poppins text-base font-base hidden">
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

                <!-- Hamburger -->
                <div>
                    <button
                        type="button"
                        id="triggerEl"
                        aria-expanded="false"
                        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <svg
                            class="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="targetEl" class="hidden md:hidden p-1">
                <ul
                    class="w-full text-sm text-gray-900 dark:bg-gray-700 dark:text-white border border-gray-300 rounded-lg p-3">
                    <li v-for="(item, index) in navItems" :key="index">
                        <router-link :to="{ name: item.to }">
                            <div class="py-2 px-3 hover:bg-white rounded-lg">
                                {{ item.name }}
                            </div>
                        </router-link>
                    </li>
                    <li class="px-3 mt-3">
                        <div
                            class="flex justify-center gap-5 pt-3 items-center border-t border-gray-300">
                            <i class="fa-regular fa-heart"></i>
                            <i class="fa-solid fa-cart-shopping"></i>
                            <router-link to="login">
                                <div
                                    class="rounded-full w-[30px] h-[30px] border flex items-center justify-center border-white">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
