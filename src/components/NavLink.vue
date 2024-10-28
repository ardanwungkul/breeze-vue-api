<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    name: String,
})

const route = useRoute()

const isActive = computed(() => route.name === props.name)

const classes = computed(() =>
    isActive.value
        ? 'inline-flex items-center p-2 text transition duration-150 ease-in-out'
        : 'inline-flex items-center p-2 text-gray-500 transition duration-150 ease-in-out',
)
</script>

<template>
    <router-link :to="{ name: props.name }">
        <span :class="classes">
            <slot />
        </span>
    </router-link>
</template>
