<script setup>
import { ref, inject, onMounted } from 'vue'
import { Dropdown } from 'flowbite'

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
        to: 'admin.dashboard',
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
        to: 'admin.dashboard',
        title: 'Shop',
        isHasChild: false,
    },
    {
        icon: 'fa-solid fa-newspaper',
        to: 'admin.dashboard',
        title: 'Articles',
        isHasChild: false,
    },
    {
        icon: 'fa-solid fa-building',
        to: 'admin.dashboard',
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
        to: 'admin.dashboard',
        title: 'Voucher',
        isHasChild: false,
    },
])

onMounted(() => {
    const accordionElement = document.getElementById('accordion-example')

    const accordionItems = [
        {
            id: 'accordion-example-heading-1',
            triggerEl: document.querySelector('#accordion-example-heading-1'),
            targetEl: document.querySelector('#accordion-example-body-1'),
            active: false,
        },
    ]

    const options = {
        alwaysOpen: false,
        activeClasses: 'bg-gray-100 dark:bg-gray-800 text-gray-900',
        inactiveClasses: 'text-gray-500 dark:text-gray-400',
    }

    const instanceOptions = {
        id: 'accordion-example',
        override: true,
    }
    const accordion = new Accordion(
        accordionElement,
        accordionItems,
        options,
        instanceOptions,
    )
})
</script>
<template>
    <v-navigation-drawer
        :rail="rail"
        rail-width="60"
        permanent=""
        disable-route-watcher=""
        disable-resize-watcher=""
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
                <div id="accordion-example" v-if="item.isHasChild == true">
                    <h2 id="accordion-example-heading-1" class="bg-transparent">
                        <button
                            type="button"
                            class="w-full py-2 px-2 hover:bg-neutral-200 cursor-pointer rounded-lg flex items-center gap-4 rounded-t-lg"
                            aria-expanded="true"
                            aria-controls="accordion-example-body-1">
                            <div class="w-[28px] flex-none flex justify-center">
                                <i
                                    class="text-neutral-500"
                                    :class="item.icon"></i>
                            </div>
                            <p
                                class="font-medium text-sm whitespace-nowrap text-gray-700">
                                {{ item.title }}
                            </p>
                        </button>
                    </h2>
                    <div
                        id="accordion-example-body-1"
                        class="hidden"
                        aria-labelledby="accordion-example-heading-1">
                        <div class="border-y rounded-lg mt-1">
                            <router-link
                                :to="{ name: child.to }"
                                v-for="(child, i) in item.child"
                                :key="i"
                                class="w-full py-2 px-2 hover:bg-neutral-200 cursor-pointer rounded-lg flex items-center gap-4">
                                <div
                                    class="w-[28px] flex-none flex justify-center">
                                    <i
                                        class="text-neutral-500"
                                        :class="child.icon"></i>
                                </div>
                                <p
                                    class="font-medium text-sm whitespace-nowrap text-gray-700">
                                    {{ child.title }}
                                </p>
                            </router-link>
                        </div>
                    </div>
                </div>
                <router-link
                    :to="{ name: item.to }"
                    v-if="item.isHasChild == false">
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
