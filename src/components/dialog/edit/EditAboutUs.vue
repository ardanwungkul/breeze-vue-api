<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const processing = ref(false)
const props = defineProps({
    aboutus: Object
})

</script>

<template>
    <RouterLink
        :to="{
            name: 'admin.about-us.edit',
            params: {
                id: props.aboutus.id,
            },
        }"
        class="flex gap-2 items-center text-white bg-secondary-2 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer">
        <i class="fa-solid fa-pen"></i>
        <p>Edit</p>
    </RouterLink>
</template>
