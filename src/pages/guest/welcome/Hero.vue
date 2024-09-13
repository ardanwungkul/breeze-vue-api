<script setup>
import cosmetic from '@/assets/images/cosmetic.jpeg'
</script>
<template>
    <div class="w-full relative h-[calc(100vh-57px)]">
        <div
            class="absolute top-[-57px] left-0 w-full h-screen object-cover z-10">
            <v-img :src="cosmetic" aspect-ratio="1" class="min-h-full" cover>
                <template v-slot:placeholder>
                    <div class="w-full h-full flex justify-center items-center">
                        <v-progress-circular
                            color=""
                            indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
        </div>
        <div
            class="w-full h-screen flex items-center z-20 absolute top-[-57px]">
            <div class="mx-auto w-full max-w-[1120px] relative">
                <div class="flex flex-col sm:w-2/3 md:w-[45%] sm:px-3 w-full">
                    <div
                        class="text-[40px] font-extralight leading-[1.2] mb-9 text-center sm:!text-start">
                        Natural Cosmetics for gentle skincare
                    </div>
                    <div class="flex justify-center sm:!justify-start w-full">
                        <RouterLink
                            :to="{ name: 'shop' }"
                            class="text-base font-normal px-3 py-[6px] border duration-300 border-neutral-400 hover:border-transparent">
                            Shop Now
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
