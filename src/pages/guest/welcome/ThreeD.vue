<script setup>
import { ref, onMounted } from 'vue'
import VanillaTilt from 'vanilla-tilt'
import threed from '@/assets/images/3d-product.png'

onMounted(() => {
    VanillaTilt.init(element.value, {
        reverse: true,
        max: 20,
        perspective: 300,
        easing: 'cubic-bezier(.03,.98,.52,.99)',
        scale: 1.1,
        speed: 400,
        transition: true,
        glare: false,
        reset: true,
    })
})

const element = ref(null)
</script>
<template>
    <div class="md:grid md:grid-cols-2 gap-3">
        <div
            class="bg-[#f1eee9] rounded-md p-2 max-h-[400px] flex items-center justify-center">
            <div
                ref="element"
                class="object-contain w-full h-full"
                style="
                    transform-style: preserve-3d;
                    transform: perspective(1000px);
                    position: relative;
                ">
                <v-img
                    :src="threed"
                    aspect-ratio="1"
                    class="min-h-full max-w-[50%]">
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
        <div class="bg-[#f1eee9] rounded-md p-2 max-h-[400px]">
            <div class="bg-white w-full p-12 h-full">
                <p class="text-center text-[28px] font-medium mb-3">
                    AFTERSHAVE SHALON
                </p>
                <div class="flex justify-center gap-1 mb-1">
                    <i
                        v-for="n in 5"
                        :key="n"
                        class="fa-solid fa-star text-yellow-300 text-xs"></i>
                </div>
                <p class="text-center mb-5">Rp.200.000</p>
                <p class="text-xs text-center mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Similique, enim. Nihil repudiandae odit totam maiores
                    blanditiis. Magni ea vel,iure perspiciatis dignissimos..
                </p>
                <div class="flex w-full gap-[10px] justify-center">
                    <div
                        v-for="n in 4"
                        :key="n"
                        class="rounded-full border-2 border-[#f1eee9] w-[84px] h-[84px] flex items-center justify-center">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-600 text-center">0</p>
                            <p class="text-xs text-gray-600 text-center">day</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
