<script setup>
import NavLink from '@/components/NavLink.vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import { Collapse } from 'flowbite'
import { useUsers } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import logo from '@/assets/images/logo/logo-original.png'

const store = useUsers()
const storeCart = useCartStore()
const processing = ref(false)
onBeforeMount(() => {
    if (store.authUser) {
        if (!store.hasUserData) {
            store.getData()
        }
    }
})
onMounted(async () => {
    const $targetEl = document.getElementById('targetEl')
    const $triggerEl = document.getElementById('triggerEl')

    new Collapse($targetEl, $triggerEl)
    await storeCart.cartAll(store.userData.id, processing)
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
const submitLogout = () => {
    store.logout()
}
</script>
<template>
    <nav
        class="bg-[#f4f0ed] border-b border border-white fixed top-0 w-full z-[9999]">
        <div class="max-w-[1140px] mx-auto px-1">
            <div class="flex justify-between h-[56px] items-center">
                <!-- Logo -->
                <div class="shrink-0 flex items-center py-[5px] px-4">
                    <router-link to="/">
                        <img :src="logo" class="h-8" alt="" />
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
                        <router-link :to="{ name: 'cart.index' }">
                            <div class="relative">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <p
                                    v-if="
                                        store.hasUserData &&
                                        storeCart.cartsCount > 0
                                    "
                                    class="absolute -top-1 -right-3 text-xs bg-red-500 text-typography-1 rounded-full px-1">
                                    <span>{{ storeCart.cartsCount }}</span>
                                </p>
                            </div>
                        </router-link>
                        <v-menu>
                            <template #activator="{ props }">
                                <div
                                    v-bind="props"
                                    class="rounded-full w-[30px] h-[30px] border flex items-center justify-center border-white cursor-pointer">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                            </template>
                            <div
                                class="bg-ezzora-50 mt-4 rounded-lg min-w-40 px-2 py-2 border shadow-lg text-xs">
                                <ul class="space-y-1">
                                    <li v-if="store.authUser" class="border-b">
                                        <div
                                            class="tracking-wide px-3 py-2 rounded-lg text-gray-600">
                                            {{ store.userData.email }}
                                        </div>
                                    </li>
                                    <li v-if="store.authUser == false">
                                        <router-link :to="{ name: 'login' }">
                                            <div
                                                class="tracking-wide font-semibold hover:bg-white px-3 py-2 rounded-lg text-gray-600">
                                                Log In
                                            </div>
                                        </router-link>
                                    </li>
                                    <li></li>
                                    <li
                                        v-if="
                                            (store.authUser &&
                                                store.userData.role ==
                                                    'admin') ||
                                            store.userData.role == 'packing'
                                        ">
                                        <router-link
                                            :to="{ name: 'admin.dashboard' }">
                                            <div
                                                class="tracking-wide font-semibold hover:bg-white px-3 py-2 rounded-lg text-gray-600">
                                                Dashboard
                                            </div>
                                        </router-link>
                                    </li>
                                    <li
                                        v-if="
                                            store.userData.store &&
                                            store.userData.role == 'reseller'
                                        ">
                                        <router-link
                                            :to="{ name: 'store.dashboard' }">
                                            <div
                                                class="tracking-wide font-semibold hover:bg-white px-3 py-2 rounded-lg text-gray-600">
                                                Dashboard
                                            </div>
                                        </router-link>
                                    </li>
                                    <li v-if="store.authUser">
                                        <router-link :to="{ name: 'purchase' }">
                                            <div
                                                class="tracking-wide font-semibold hover:bg-white px-3 py-2 rounded-lg text-gray-600">
                                                My Orders
                                            </div>
                                        </router-link>
                                    </li>
                                    <li v-if="store.authUser">
                                        <div
                                            class="tracking-wide font-semibold hover:bg-white px-3 py-2 rounded-lg text-gray-600 cursor-pointer"
                                            @click="submitLogout">
                                            Log Out
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </v-menu>
                    </div>
                </div>

                <!-- Hamburger -->
                <div class="block md:hidden">
                    <button
                        id="triggerEl"
                        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                        aria-expanded="false">
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
            <div
                id="targetEl"
                class="hidden md:hidden p-1 shadow-2xl rounded-b-lg">
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
