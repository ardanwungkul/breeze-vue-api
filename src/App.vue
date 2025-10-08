<script setup>
import { watch } from 'vue'
import { useResponseStore } from './stores/response'
import { ref } from 'vue'
import { computed } from 'vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const responseStore = useResponseStore()
const setErrors = ref([])
const messageErrors = computed(() => setErrors.value)
watch(
    () => responseStore.errors,
    errors => {
        if (errors.length > 0) {
            errors.forEach(msg => {
                messageErrors.value.push(msg)
            })
            responseStore.clearErrors()
        }
    },
)
</script>
<template>
    <ValidationErrors class="w-full" :errors="messageErrors" />
    <router-view></router-view>
</template>
