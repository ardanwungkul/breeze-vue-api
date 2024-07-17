<script setup>
import { ref, onMounted } from 'vue'
import '@/assets/css/vue-select.css'
import { RouterLink } from 'vue-router'
</script>

<template>
    <RouterLink
        :to = "{name:'admin.about-us.create'}"
        class="bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg">
        <i class="fa-solid fa-plus"></i>
        <p>Add About Us Content</p>
    </RouterLink>
</template>
