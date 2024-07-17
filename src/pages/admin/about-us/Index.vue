<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAboutUsStore } from '@/stores/aboutus'
import AdminLayout from '@/layouts/AdminLayout.vue'
import '@/assets/css/vuetify.css'
import AboutUsTable from '@/components/admin/about-us/AboutUsTable.vue'

const storeAboutUs = useAboutUsStore()

const aboutus = ref([])
onMounted(async () => {
    await fetchAboutUs()
})
async function fetchAboutUs() {
    await storeAboutUs.aboutUsAll()
    aboutus.value = storeAboutUs.allAboutUs.map(aboutus => ({
        id: aboutus.id,
        title: aboutus.about_us_title,
        description: aboutus.about_us_description,
    }))
}
</script>
<template>
    <AdminLayout title="About Us List">
        <div class="w-full">
            <AboutUsTable :aboutus="aboutus" :fetchAboutUs="fetchAboutUs" />
        </div>
    </AdminLayout>
</template>
