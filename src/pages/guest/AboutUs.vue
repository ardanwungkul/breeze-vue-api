<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { ref, onMounted } from 'vue'

import { useAboutUsStore } from '@/stores/aboutus'

// import aboutbg from '@/assets/images/about-us-background.png'
// import lamp from '@/assets/images/lamp.png'

const tab = ref()
const storeAboutUs = useAboutUsStore()
const aboutUs = ref([])
const props = defineProps({
    type: {
        type: String,
    },
})

onMounted(async () => {
    await fetchAboutUs()
    tab.value = aboutUs.value.length > 0 ? aboutUs.value[0].id : ''
})

async function fetchAboutUs() {
    await storeAboutUs.aboutUsAll()
    const allAboutUs = storeAboutUs.allAboutUs

    aboutUs.value = allAboutUs.map(aboutus => ({
        about_us_title: aboutus.about_us_title,
        id: aboutus.id,
        about_us_description: aboutus.about_us_description,
        about_us_main_image_alt: aboutus.about_us_main_image_alt,
        about_us_second_image_alt: aboutus.about_us_second_image_alt,
        about_us_main_image:
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/images/aboutus/' +
            aboutus.about_us_main_image,
        about_us_second_image:
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/images/aboutus/' +
            aboutus.about_us_second_image,
    }))
    console.log(aboutUs.value)
}
</script>
<template>
    <AppLayout footer="disable">
        <div class="flex-col w-full h-[calc(100vh-57px)] flex">
            <v-card style="border-radius: 0; box-shadow: none" class="h-full">
                <div class="w-full h-[60%] sm:h-[65%] flex">
                    <div
                        class="flex flex-row w-full sm:w-[60%] xl:pl-48 sm:pl-8 min-h-full items-center relative">
                        <div
                            class="w-full h-full absolute top-0 -left-10 opacity-20">
                            <v-img
                                :src="aboutbg"
                                aspect-ratio="1"
                                class="h-full"
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
                        <div
                            class="flex flex-col w-10/12 sm:w-3/4 lg:w-1/2 relative z-10">
                            <v-card-text>
                                <v-tabs-window v-model="tab">
                                    <v-tabs-window-item
                                        v-for="item in aboutUs"
                                        :key="item.id"
                                        :value="item.id">
                                        <div
                                            class="text-4xl text-[#284723]/80 font-semibold mb-5">
                                            {{ item.about_us_title }}
                                        </div>
                                        <div class="">
                                            {{ item.about_us_description }}
                                        </div>
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </div>
                        <div
                            class="w-40 sm:w-2/5 lg:w-1/3 sm:h-full absolute top-52 sm:top-[20%] lg:top-[20%] -right-5 sm:right-0 sm:left-[65%] overflow-hidden">
                            <v-card-text class="!p-0">
                                <v-tabs-window v-model="tab">
                                    <v-tabs-window-item
                                        v-for="item in aboutUs"
                                        :key="item.id"
                                        :value="item.id">
                                        <v-img
                                            :src="item.about_us_main_image"
                                            aspect-ratio="1"
                                            class="min-h-[180px] sm:min-h-[360px] lg:min-h-[480px] relative justify-center">
                                            <template v-slot:placeholder>
                                                <div
                                                    class="w-full h-full flex justify-center items-center">
                                                    <v-progress-circular
                                                        color=""
                                                        indeterminate></v-progress-circular>
                                                </div>
                                            </template>
                                        </v-img>
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </div>
                    </div>
                    <div
                        class="w-[40%] hidden sm:flex flex-row min-h-full bg-[#f8f8f6] xl:pr-48 sm:pr-8 md:pr-8">
                        <div class="w-5/6 min-h-full">
                            <v-card-text class="!p-0">
                                <v-tabs-window v-model="tab">
                                    <v-tabs-window-item
                                        v-for="item in aboutUs"
                                        :key="item.id"
                                        :value="item.id">
                                        <v-img
                                            :src="item.about_us_second_image"
                                            aspect-ratio="1"
                                            class="w-full min-h-[65vh]"
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
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </div>
                        <div
                            class="w-1/6 min-h-full flex flex-col py-5 items-center gap-5">
                            <div
                                class="w-8 h-8 flex justify-center items-center">
                                <i class="fa-solid fa-user text-[20px]"></i>
                            </div>
                            <div
                                class="w-8 h-8 flex justify-center items-center">
                                <i
                                    class="fa-solid fa-cart-shopping text-[20px]"></i>
                            </div>
                            <div
                                class="w-8 h-8 flex justify-center items-center">
                                <i class="fa-regular fa-heart text-[20px]"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full h-[40%] sm:h-[35%] flex flex-col sm:flex-row">
                    <div
                        class="w-full sm:w-[60%] sm:h-full xl:pl-48 sm:pl-8 bg-[#ceddce] flex flex-col">
                        <div
                            class="flex flex-col sm:flex-row gap-5 sm:gap-5 lg:gap-20 p-5">
                            <button
                                class="py-3 px-10 border border-white text-white font-semibold bg-gradient-to-r from-lime-600 to-lime-950 duration-200 hover:opacity-70 rounded-xl relative z-10">
                                Check Shop
                            </button>
                            <button
                                class="font-semibold duration-200 hover:text-gray-500">
                                Learn more ->
                            </button>
                        </div>
                        <div
                            style="box-shadow: 0px -1px 10px 20px #ceddce"
                            class="w-full h-full hidden sm:flex flex-row static z-10 sm:gap-1 lg:gap-5 bg-[#ceddce]">
                            <div
                                class="flex flex-row sm:gap-1 lg:gap-3"
                                v-for="i in 3"
                                :key="1">
                                <div class="min-w-16 h-20">
                                    <v-img
                                        :src="lamp"
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
                                <div
                                    class="flex-col sm:max-w-[100px] lg:max-w-28">
                                    <div class="">Dimensions</div>
                                    <div class="text-[8px]">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Atque perspiciatis
                                        asperiores laboriosam rem
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-full sm:w-[40%] h-full xl:pr-48 sm:pr-8 md:pr-8 bg-[#ceddce] sm:bg-[#f8f8f6] static z-10">
                        <v-tabs
                            style="background-color: transparent !important"
                            v-model="tab"
                            center-active
                            bg-color="primary"
                            class="min-h-full w-full flex">
                            <v-tab
                                v-for="item in aboutUs"
                                :key="item.id"
                                :value="item.id"
                                class="min-h-full !p-0 w-1/4 sm:w-1/3 max-w-1/3 duration-300 hover:opacity-100 opacity-70 overflow-hidden">
                                <div
                                    class="w-full min-h-full flex flex-col justify-center items-center gap-5 relative">
                                    <v-img
                                        :src="item.about_us_main_image"
                                        aspect-ratio="1"
                                        class="min-w-[80px] max-w-[140px] min-h-[130px] top-0 left-0">
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
                            </v-tab>
                        </v-tabs>
                    </div>
                </div>
            </v-card>
        </div>
    </AppLayout>
</template>
<style>
.v-slide-group__prev {
    margin-left: -52px;
}
.v-slide-group__next {
    margin-right: -52px;
}
</style>
