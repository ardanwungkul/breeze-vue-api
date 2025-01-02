<script setup>
const props = defineProps({
    data: Array,
})
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>
<template>
    <div class="flex p-3">
        <div class="flex gap-5">
            <v-img
                :src="
                    backendUrl +
                    '/storage/images/product/' +
                    data?.product?.product_image
                "
                class="h-28 w-28 rounded-lg"
                contain>
                <template v-slot:placeholder>
                    <div class="w-full h-full flex justify-center items-center">
                        <v-progress-circular
                            color=""
                            indeterminate></v-progress-circular>
                    </div>
                </template>
            </v-img>
            <div class="flex flex-col gap-1">
                <p class="line-clamp-2">
                    {{ data?.product?.product_name }}
                </p>
                <p
                    v-if="data.bundling"
                    class="text-xs text-typography-2 border w-min whitespace-nowrap px-2 py-1 rounded-lg border-typography-2">
                    {{ data.bundling.name }}
                </p>
                <p class="text-xs text-typography-2">x{{ data.quantity }}</p>
            </div>
        </div>
        <div class="py-2 whitespace-nowrap pl-10">
            Rp. {{ formatPrice(data.price) }}
        </div>
    </div>
</template>
