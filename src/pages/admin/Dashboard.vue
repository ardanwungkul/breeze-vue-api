<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
</script>

<template>
    <AdminLayout title="Dashboard">
        <div class="grid grid-cols-4 gap-5">
            <div class="grid grid-cols-2 col-span-2 gap-5">
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-24"></div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-24"></div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-24"></div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-24"></div>
            </div>
            <div
                class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>
            <div
                class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>

            <div class="col-span-2 grid gap-5">
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-40"></div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-40"></div>
            </div>
            <div class="col-span-2 flex flex-col gap-5">
                <div class="grid grid-cols-2 gap-5 h-24 flex-none">
                    <div
                        class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>
                    <div
                        class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>
                </div>
                <div
                    class="rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 shadow-md h-full"></div>
            </div>
        </div>
    </AdminLayout>
</template>
