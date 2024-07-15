<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue'
import { useShopPageStore } from '@/stores/shop-page/shop.js'
import AddMainBanner from '@/pages/admin/shop/AddMainBanner.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const shopStore = useShopPageStore()
const mainBanner = ref([])
const processing = ref(false)
const setErrors = ref([])
const errors = computed(() => setErrors.value)

const getMainBanner = () => {
    mainBanner.value = shopStore.mainBanners.map(banner => ({
        id: banner.id,
        main_banner_media: banner.main_banner_media,
        main_banner_alt: banner.main_banner_alt,
        main_banner_type: banner.main_banner_type,
        main_banner_status: banner.main_banner_status,
        isDefault: banner.isDefault,
        src:
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/media/shop/main-banner/' +
            banner.main_banner_media,
    }))
}
const deleteMainBanner = async id => {
    processing.value = true
    await shopStore.deleteMainBanner(id, setErrors, processing)
    processing.value = false
}
const updateBannerStatus = async (id, event) => {
    processing.value = true
    const formData = new FormData()
    formData.append('id', id)
    formData.append('value', event.target.checked)
    await shopStore.updateMainBannerStatus(formData, setErrors, processing)
    processing.value = false
}
onMounted(async () => {
    await shopStore.getAllMainBanner()
    getMainBanner()
})
watchEffect(() => {
    getMainBanner()
})
</script>
<template>
    <div class="space-y-3">
        <div class="flex justify-between w-full">
            <AddMainBanner />
            <svg
                v-if="processing"
                role="status"
                class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
        </div>

        <div class="grid grid-cols-4 gap-4 py-4">
            <div
                v-for="(item, index) in mainBanner"
                :key="index"
                class="rounded-lg overflow-hidden flex flex-col shadow-lg border">
                <video
                    v-if="item.main_banner_type == 'video'"
                    poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s"
                    :alt="item.main_banner_alt"
                    disablePictureInPicture
                    controls
                    controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
                    class="w-full object-cover lazyload h-40">
                    <source :src="item.src" type="video/mp4" />
                </video>
                <img
                    class="w-full object-cover lazyload h-40"
                    :src="item.src"
                    v-if="item.main_banner_type == 'image'"
                    :alt="item.main_banner_alt" />
                <div class="h-10 w-full flex px-3 justify-between items-center">
                    <v-tooltip
                        :text="
                            item.main_banner_status
                                ? 'Disable Banner'
                                : 'Enable Banner'
                        ">
                        <template v-slot:activator="{ props }">
                            <input
                                @change="updateBannerStatus(item.id, $event)"
                                v-bind="props"
                                type="checkbox"
                                name=""
                                :checked="item.main_banner_status"
                                class="rounded-full border" />
                        </template>
                    </v-tooltip>
                    <v-tooltip
                        :text="
                            item.isDefault
                                ? 'Can\'t Delete Main Banner'
                                : 'Delete Main Banner'
                        ">
                        <template v-slot:activator="{ props }">
                            <form @submit.prevent="deleteMainBanner(item.id)">
                                <button
                                    :disabled="item.isDefault == true"
                                    :class="
                                        item.isDefault
                                            ? 'cursor-default !text-gray-500'
                                            : '!text-red-500'
                                    "
                                    type="submit"
                                    v-bind="props"
                                    class="fa-duotone fa-trash"></button>
                            </form>
                        </template>
                    </v-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
video::-webkit-media-controls-fullscreen-button {
    display: none;
}
</style>
