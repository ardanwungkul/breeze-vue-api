<script setup>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const props = defineProps({
    isLoading: Boolean,
})
const emit = defineEmits(['update:isLoading'])
</script>
<template>
    <loading
        :active="isLoading"
        :can-cancel="true"
        :loader="'dots'"
        :background-color="'#edede7'"
        :color="'#4e4a40'"
        :opacity="0.8"
        @update:active="active => emit('update:isLoading', active)" />
</template>
