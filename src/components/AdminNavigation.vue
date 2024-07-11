<script setup>
import { ref, inject, onMounted, onBeforeMount } from 'vue'
import { useUsers } from '@/stores/user'

const store = useUsers()

onBeforeMount(() => {
    if (!store.hasUserData) {
        store.getData()
    }
})

const rail = inject('rail')
const sidebarItem = ref([
    {
        icon: 'fa-solid fa-users',
        to: 'admin.user.index',
        title: 'User',
        isHasChild: false,
    },
    {
        icon: 'fa-solid fa-boxes-stacked',
        title: 'Product',
        isHasChild: true,
        child: [
            {
                title: 'Product Category',
                icon: 'fa-solid fa-layer-group',
                to: 'admin.category.index',
            },
            {
                title: 'Product Item',
                icon: 'fa-solid fa-box',
                to: 'admin.product.index',
            },
        ],
    },
    {
        icon: 'fa-solid fa-store',
        title: 'Shop',
        isHasChild: true,
        child: [
            {
                title: 'Banner',
                icon: 'fa-solid fa-rectangle-vertical-history',
                to: 'admin.shop.index.banner',
            },
            {
                title: 'Flash Sale',
                icon: 'fa-solid fa-bolt-lightning',
                to: 'admin.shop.index.flash-sale',
            },
        ],
    },
    {
        icon: 'fa-solid fa-newspaper',
        to: 'admin.article.index',
        title: 'Articles',
        isHasChild: false,
    },
    {
        icon: 'fa-solid fa-building',
        to: 'admin.about-us.index',
        title: 'About Us',
        isHasChild: false,
    },
    {
        icon: 'fa-solid fa-credit-card',
        to: 'admin.dashboard',
        title: 'Payment',
        isHasChild: false,
    },
    {
        icon: 'fa-solid fa-user-check',
        to: 'admin.dashboard',
        title: 'Agent',
        isHasChild: false,
    },
    {
        icon: 'fa-solid fa-tags',
        to: 'admin.voucher.index',
        title: 'Voucher',
        isHasChild: false,
    },
])

const activeAccordion = ref(null)

const toggleAccordion = index => {
    if (activeAccordion.value === index) {
        activeAccordion.value = null
    } else {
        activeAccordion.value = index
    }
}
const submitLogout = () => {
    store.logout()
}
</script>
<template>
    <v-navigation-drawer
        :rail="rail"
        rail-width="60"
        permanent=""
        disable-route-watcher=""
        disable-resize-watcher=""
        class="!rounded-2xl !ml-5 !shadow-lg !h-[90%] my-auto border !border-gray-300">
        <button
            @click.stop="rail = !rail"
            class="absolute -right-3 z-10 bg-white w-8 h-8 rounded-full border border-gray-300 hover:bg-ezzora-200">
            <i
                class="fa-solid !text-ezzora-700"
                :class="!rail ? 'fa-chevron-left' : 'fa-chevron-right'"></i>
        </button>
        <v-list class="!overflow-hidden !rounded-t-2xl">
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                :subtitle="store.userData.email"
                :title="store.userData.name"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <ul class="p-2 space-y-1 overflow-hidden">
            <li v-for="(item, index) in sidebarItem" :key="index">
                <div v-if="item.isHasChild">
                    <h2
                        :id="'accordion-heading-' + index"
                        class="bg-transparent">
                        <button
                            type="button"
                            class="w-full py-2 px-2 hover:bg-ezzora-200 cursor-pointer rounded-lg flex items-center gap-4"
                            @click="toggleAccordion(index)"
                            :aria-expanded="activeAccordion === index"
                            :aria-controls="'accordion-body-' + index">
                            <div class="w-[28px] flex-none flex justify-center">
                                <i
                                    class="text-ezzora-500"
                                    :class="item.icon"></i>
                            </div>
                            <p
                                class="font-medium text-sm whitespace-nowrap text-ezzora-700">
                                {{ item.title }}
                            </p>
                        </button>
                    </h2>
                    <div
                        :id="'accordion-body-' + index"
                        :class="activeAccordion === index ? '' : 'hidden'"
                        :aria-labelledby="'accordion-heading-' + index">
                        <div class="border-y rounded-lg mt-1">
                            <router-link
                                :to="{ name: child.to }"
                                v-for="(child, i) in item.child"
                                :key="i"
                                class="w-full py-2 px-2 hover:bg-ezzora-200 cursor-pointer rounded-lg flex items-center gap-4">
                                <div
                                    class="w-[28px] flex-none flex justify-center">
                                    <i
                                        class="text-ezzora-500"
                                        :class="child.icon"></i>
                                </div>
                                <p
                                    class="font-medium text-sm whitespace-nowrap text-ezzora-700">
                                    {{ child.title }}
                                </p>
                            </router-link>
                        </div>
                    </div>
                </div>
                <router-link :to="{ name: item.to }" v-if="!item.isHasChild">
                    <div
                        class="w-full py-2 px-2 hover:bg-ezzora-200 cursor-pointer rounded-lg flex items-center gap-4">
                        <div class="w-[28px] flex-none flex justify-center">
                            <i :class="item.icon" class="text-ezzora-500"></i>
                        </div>
                        <p
                            class="font-medium text-sm whitespace-nowrap text-ezzora-700">
                            {{ item.title }}
                        </p>
                    </div>
                </router-link>
            </li>
            <div class="bottom-3">
                <button
                    @click="submitLogout"
                    type="button"
                    class="w-full py-2 px-2 hover:bg-ezzora-200 cursor-pointer rounded-lg flex items-center gap-4">
                    <div class="w-[28px] flex-none flex justify-center">
                        <i
                            class="text-ezzora-500 fa-solid fa-right-from-bracket"></i>
                    </div>
                    <p
                        class="font-medium text-sm whitespace-nowrap text-ezzora-700">
                        Logout
                    </p>
                </button>
            </div>
        </ul>
    </v-navigation-drawer>
</template>
