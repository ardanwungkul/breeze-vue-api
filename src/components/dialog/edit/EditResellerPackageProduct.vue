<script setup>
import { computed } from 'vue'

const props = defineProps({
    product: Array,
    resellerPackage: Object,
})

const selectedProducts = computed(() => props.resellerPackage?.products || [])

const selectedCount = computed(() => selectedProducts.value.length)

const toggleSelection = item => {
    const index = selectedProducts.value.findIndex(p => p.id === item.id)
    if (index !== -1) {
        selectedProducts.value.splice(index, 1)
    } else {
        selectedProducts.value.push(item)
    }
    props.resellerPackage.products = selectedProducts.value
}
</script>
<template>
    <v-dialog>
        <template v-slot:activator="{ props: activatorProps }">
            <div
                v-bind="activatorProps"
                class="text-sm rounded-lg bg-gray-100 w-full py-2 px-3 cursor-pointer">
                <p>
                    Selected <span>{{ selectedCount }}</span> Product
                </p>
            </div>
        </template>

        <template v-slot:default="{ isActive }">
            <div class="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
                <div
                    class="flex justify-between border-b py-3 px-4 items-center">
                    <p class="font-medium text-lg">Product Item</p>
                    <button
                        @click="isActive.value = false"
                        class="fa-solid fa-x rounded-xl hover:bg-gray-100 px-3 py-2"></button>
                </div>
                <div class="p-5 overflow-y-scroll space-y-3 max-h-[70vh]">
                    {{ selectedProducts }}
                    <div class="flex items-center justify-end">
                        <button
                            class="!text-light-primary-1 px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3 bg-secondary-3 hover:bg-opacity-90">
                            Save
                        </button>
                    </div>
                    <div class="rounded-lg overflow-hidden border">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="px-3 py-2 text-sm"></th>
                                    <th class="px-3 py-2 text-sm font-semibold">
                                        Product Name
                                    </th>
                                    <th class="px-3 py-2 text-sm font-semibold">
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item, index) in product"
                                    :key="index"
                                    class="hover:bg-gray-50">
                                    <td
                                        class="border border-gray-300 px-3 py-2 text-center">
                                        <input
                                            :checked="
                                                selectedProducts.includes(item)
                                            "
                                            @change="toggleSelection(item)"
                                            type="checkbox"
                                            class="border rounded-full" />
                                    </td>
                                    <td
                                        class="border border-gray-300 px-3 py-2">
                                        <p class="line-clamp-2 text-xs">
                                            {{ item.product_name }}
                                        </p>
                                    </td>
                                    <td
                                        class="border border-gray-300 px-3 py-2 text-center">
                                        <input
                                            type="number"
                                            min="0"
                                            class="rounded-lg border text-sm w-16 text-center" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>
    </v-dialog>
</template>
