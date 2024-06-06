<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue'
</script>

<template>
    <div
        class="h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#e2d9d9]">
        <div class="bg-[#f4f0ed] rounded-lg grid grid-cols-2">
            <div>
                <svg width="0" height="0">
                    <defs>
                        <clipPath
                            id="polygon-clip"
                            clipPathUnits="objectBoundingBox">
                            <path
                                d="M 0,0 
                 L 0.76,0 
                 Q 0.76,0 0.76,0.14 
                 L 1,0.14 
                 Q 1,0.14 1,1 
                 L 0.25,1 
                 Q 0.25,1 0.25,0.84 
                 L 0,0.84 
                 Q 0,0.84 0,0" />
                        </clipPath>
                    </defs>
                </svg>
                <div class="rounded-polygon"></div>
            </div>
            <div class="p-10">
                <slot />
            </div>
        </div>
    </div>
</template>
