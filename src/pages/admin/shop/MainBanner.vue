<script setup>
import { ref, onMounted } from 'vue'
import { useShopPageStore } from '@/stores/shop-page/shop.js'
import AddMainBanner from '@/pages/admin/shop/AddMainBanner.vue'

const shopStore = useShopPageStore()
const mainBanner = ref([])

onMounted(async () => {
    await shopStore.getAllMainBanner()
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
})
</script>
<template>
    <div class="space-y-3">
        <AddMainBanner />
        <div class="grid grid-cols-4 gap-4">
            <div
                v-for="(item, index) in mainBanner"
                :key="index"
                class="border rounded-lg h-40 overflow-hidden">
                <video
                    v-if="item.main_banner_type == 'video'"
                    poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s"
                    alt=""
                    controls
                    class="h-full w-full object-cover lazyload">
                    <source :src="item.src" type="video/mp4" />
                </video>
                <img
                    class="h-full w-full object-cover lazyload"
                    :src="item.src"
                    v-if="item.main_banner_type == 'image'"
                    alt="" />
            </div>
        </div>
    </div>
</template>
