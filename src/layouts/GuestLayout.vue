<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue'
</script>

<template>
    <div
        class="h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f4f0ed]">
        <div
            class="bg-white rounded-2xl grid grid-cols-2 max-w-3xl overflow-hidden shadow-2xl">
            <div class="p-4 group">
                <div class="overflow-hidden rounded-2xl relative shadow-inner">
                    <div class="absolute top-0 left-0 z-20 p-4">
                        <router-link to="/">
                            <p
                                class="font-poppins text-3xl leading-none font-medium uppercase group-hover:text-white transition-all duration-1000 drop-shadow-2xl text-gray-700">
                                Ezzora
                            </p>
                        </router-link>
                    </div>
                    <div
                        class="w-full h-full absolute bg-black top-0 opacity-0 group-hover:opacity-20 transition-all duration-1000 rounded-2xl z-10"></div>
                    <img
                        class="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-all duration-1000"
                        src="@/assets/images/person.jpeg"
                        alt="" />
                </div>
            </div>
            <div class="p-10">
                <div class="flex flex-col h-full">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
