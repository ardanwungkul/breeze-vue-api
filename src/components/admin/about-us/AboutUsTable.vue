<script setup>
import { ref, computed, watchEffect } from 'vue'
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue'
import EditAboutUs from '@/components/dialog/edit/EditAboutUs.vue'
import { useAboutUsStore } from '@/stores/aboutus'
import ValidationErrors from '@/components/ValidationErrors.vue'
import AddAboutUs from '@/components/dialog/add/AddAboutUs.vue'

const storeAboutUs = useAboutUsStore()
const props = defineProps({
    aboutus: Array,
    fetchAboutUs: Function,
})
const searchAboutUs = ref('')
const pageAboutUs = ref(1)
const itemsPerPageAboutUs = ref(10)

const headersAboutUs = [
    { key: 'title', title: 'Title' },
    { key: 'description', title: 'Description' },
    { key: 'id', title: 'Action', align: 'center' },
]
const pageCount = computed(() => {
    return Math.ceil(filteredAboutUs.value.length / itemsPerPageAboutUs.value)
})

const filteredAboutUs = computed(() => {
    return props.aboutus.filter(aboutus => {
        return aboutus.title.toLowerCase().includes(searchAboutUs.value)
    })
})

const processing = ref(false)

const setErrors = ref([])
const errors = computed(() => setErrors.value)

const deleteAboutUs = async id => {
    await storeAboutUs.deleteAboutUs(id, processing)
    watchEffect(() => {
        props.fetchAboutUs()
    }, props.aboutus)
}
</script>
<template>
    <div class="relative">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg">
            <div class="flex justify-between items-center">
                <AddAboutUs></AddAboutUs>
                <input
                    type="text"
                    v-model="searchAboutUs"
                    class="rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white"
                    placeholder="Search Content" />
            </div>
            <v-data-table
                v-model:page="pageAboutUs"
                :search="searchAboutUs"
                :headers="headersAboutUs"
                :items="aboutus"
                hide-default-footer
                :header-props="{
                    class: 'dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30',
                }"
                item-key="id"
                class="border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1">
                <template v-slot:item.id="{ item }">
                    <div class="flex gap-3 items-center justify-center text-xs">
                        <EditAboutUs
                            :aboutus="item"></EditAboutUs>
                        <ConfirmDelete
                            :type="'About Us'"
                            :id="item.id"
                            :method="deleteAboutUs"></ConfirmDelete>
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                v-model="pageAboutUs"
                :length="pageCount"
                class="bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white"
                :total-visible="5">
            </v-pagination>
        </div>
    </div>
</template>
