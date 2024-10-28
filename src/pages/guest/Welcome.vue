<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { useWelcome } from '@/stores/welcome-page/welcome'
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'

import individualcare from '@/assets/images/individualcare.jpg'

import Hero from '@/pages/guest/welcome/Hero.vue'
import ProductTab from '@/pages/guest/welcome/ProductTab.vue'
import BestSeller from '@/pages/guest/welcome/BestSeller.vue'
import ThreeD from '@/pages/guest/welcome/ThreeD.vue'
import OfficialAgent from '@/pages/guest/welcome/OfficialAgent.vue'
const data = ref([])
const store = useWelcome()
onMounted(async () => {
    await store.getData()
    data.value = store.data
})
const tab = ref(null)
</script>
<template>
    <AppLayout>
        <div class="pb-12">
            <!-- Title -->
            <Hero />
            <div class="max-w-[1120px] mx-auto px-3 sm:!px-3 xl:px-0">
                <!-- Best Seller -->
                <BestSeller />

                <!-- Flash Sale -->
                <div class="min-h-[144px]">
                    <v-tabs
                        v-model="tab"
                        align-tabs="start"
                        :color="'#000000'"
                        hide-slider
                        bg-color="transparent"
                        selected-class="hover:!text-black">
                        <v-tab :base-color="'#9ca3af'" :value="1">
                            <p
                                class="!text-lg hover:!bg-transparent hover:text-gray-600">
                                New Products
                            </p></v-tab
                        >
                        <v-tab :base-color="'#9ca3af'" :value="2">
                            <p
                                class="!text-lg hover:!bg-transparent hover:text-gray-600">
                                On Sale
                            </p>
                        </v-tab>
                        <v-tab :base-color="'#9ca3af'" :value="3">
                            <p
                                class="!text-lg hover:!bg-transparent hover:text-gray-600">
                                Feature Products
                            </p>
                        </v-tab>
                    </v-tabs>

                    <v-tabs-window v-model="tab">
                        <div class="py-3">
                            <v-tabs-window-item
                                v-for="n in 3"
                                :key="n"
                                :value="n">
                                <ProductTab />
                            </v-tabs-window-item>
                        </div>
                    </v-tabs-window>
                </div>

                <!-- 3D Products -->
                <!-- {{ data?.flash_sale }} -->
                <ThreeD v-if="data?.flash_sale" :flash_sale="data.flash_sale" />
            </div>

            <!-- Discount -->
            <div
                class="w-full bg-[#f1eee9] min-h-[47vh] mt-10 flex-col flex justify-center items-center gap-3">
                <p class="text-[28px] font-extralight">
                    GET <span class="text-gray-400">10%</span> DISCOUNT
                </p>
                <p class="sm:max-w-[50vw] text-center text-gray-600">
                    Subcribe to the TheFace mailing list to receive update on
                    mnew arrivals, special offers and other discount
                    information.
                </p>
                <RouterLink
                    to="#"
                    class="py-[6px] px-3 border text-base duration-300 border-gray-300 hover:border-transparent">
                    Subscribe
                </RouterLink>
            </div>

            <!-- Individual Care -->
            <div class="max-w-[1120px] mx-auto">
                <div class="py-10 lg:!flex">
                    <div
                        class="bg-[#f1f0ec] lg:!h-[500px] lg:!w-1/2 flex-col flex justify-center py-28 lg:!px-24 px-3 relative">
                        <p
                            class="text-[28px] font-extralight mb-3 text-center lg:!text-start">
                            Individual care
                        </p>
                        <p class="mb-10 text-center lg:!text-start">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Fuga, recusandae in quasi possimus eum
                            excepturi expedita autem, totam aliquam
                            reprehenderit molestias tenetur. Omnis modi ea
                            exercitationem natus suscipit vero et.
                        </p>
                        <div class="flex justify-center lg:!justify-start">
                            <RouterLink
                                to="#"
                                class="py-[6px] px-3 border text-base duration-300 border-gray-300 hover:border-transparent w-min whitespace-nowrap">
                                View More
                            </RouterLink>
                        </div>
                    </div>
                    <div
                        class="top-0 w-1/2 h-[500px] relative lg:!flex items-center hidden">
                        <div
                            class="h-80 w-full object-cover z-10 -translate-x-20">
                            <v-img
                                :src="individualcare"
                                aspect-ratio="1"
                                class="min-h-full"
                                cover>
                                <template v-slot:placeholder>
                                    <div
                                        class="w-full h-full flex justify-center items-center">
                                        <v-progress-circular
                                            color=""
                                            indeterminate></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                        </div>
                    </div>
                </div>

                <OfficialAgent />
            </div>
        </div>
    </AppLayout>
</template>
