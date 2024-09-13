<script setup>
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'
import placeholder from '@/assets/images/placeholder-image.jpg'

const selectedProduct1 = ref('')
const selectedProduct2 = ref('')
const props = defineProps({
    products: Object,
})

const product1 = ref({
    price: null,
    image: placeholder,
    description: null,
})
const product2 = ref({
    price: null,
    image: placeholder,
    description: null,
})

async function changeProduct(value) {
    if (value == '1') {
        product1.value.price = selectedProduct1.value.product_price
        product1.value.description = selectedProduct1.value.product_description
        product1.value.image =
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/images/product/' +
            selectedProduct1.value.product_image
    } else if (value == '2') {
        product2.value.price = selectedProduct2.value.product_price
        product2.value.description = selectedProduct2.value.product_description
        product2.value.image =
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/images/product/' +
            selectedProduct2.value.product_image
    }
}
</script>
<template>
    <div
        class="flex flex-col justify-center mx-auto w-full px-4 lg:px-5 md:max-w-[1320px] relative">
        <div class="w-full flex flex-row gap-5">
            <div class="w-full">
                <table class="w-full">
                    <tr class="border-t">
                        <td class="font-bold text-lg w-1/3 text-gray-500">
                            Select Product
                        </td>
                        <td class="w-1/3 p-1 md:p-4">
                            <multiselect
                                v-model="selectedProduct1"
                                @select="changeProduct(1)"
                                :options="products"
                                :searchable="true"
                                :close-on-select="true"
                                label="product_name"
                                track-by="product_name"
                                :preserve-search="true"
                                placeholder="Select Product"></multiselect>
                        </td>
                        <td class="w-1/3 p-1 md:p-4">
                            <multiselect
                                v-model="selectedProduct2"
                                @select="changeProduct(2)"
                                :options="products"
                                :searchable="true"
                                :close-on-select="true"
                                label="product_name"
                                track-by="product_name"
                                :preserve-search="true"
                                placeholder="Select Product"></multiselect>
                        </td>
                    </tr>
                    <tr class="border-t">
                        <td
                            class="font-bold text-lg w-full py-4 flex text-gray-500">
                            Product Image
                        </td>
                        <td class="w-1/3 p-1 md:p-4">
                            <div
                                class="w-full md:w-4/6 mx-auto rounded-lg flex justify-center items-center border shadow-lg overflow-hidden">
                                <v-img
                                    :src="product1.image"
                                    aspect-ratio="1"
                                    class="w-full aspect-square"
                                    cover>
                                    <template v-slot:placeholder>
                                        <div
                                            class="w-full h-full flex justify-center items-center">
                                            <v-progress-circular
                                                color=""
                                                indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </div>
                        </td>
                        <td class="w-1/3 p-1 md:p-4">
                            <div
                                class="w-full md:w-4/6 mx-auto rounded-lg flex justify-center items-center border shadow-lg overflow-hidden">
                                <v-img
                                    :src="product2.image"
                                    aspect-ratio="1"
                                    class="w-full aspect-square"
                                    cover>
                                    <template v-slot:placeholder>
                                        <div
                                            class="w-full h-full flex justify-center items-center">
                                            <v-progress-circular
                                                color=""
                                                indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </div>
                        </td>
                    </tr>
                    <tr class="border-t">
                        <td class="font-bold text-lg w-1/3 text-gray-500">
                            Product Price
                        </td>
                        <td class="w-1/3 text-gray-500 p-4">
                            {{ product1.price ? product1.price : 'N/A' }}
                        </td>
                        <td class="w-1/3 text-gray-500 p-4">
                            {{ product2.price ? product2.price : 'N/A' }}
                        </td>
                    </tr>
                    <tr class="border-t">
                        <td class="font-bold text-lg w-1/3 text-gray-500">
                            Product Description
                        </td>
                        <td class="w-1/3 text-gray-500 p-4">
                            {{
                                product1.description
                                    ? product2.description
                                    : 'N/A'
                            }}
                        </td>
                        <td class="w-1/3 text-gray-500 p-4">
                            {{
                                product2.description
                                    ? product2.description
                                    : 'N/A'
                            }}
                        </td>
                    </tr>
                    <tr
                        class="border-t"
                        v-if="selectedProduct1 || selectedProduct2">
                        <td class="font-bold text-lg w-1/3 text-gray-500"></td>
                        <td class="w-1/3 text-gray-500 p-4">
                            <router-link
                                v-if="selectedProduct1"
                                :to="{
                                    name: 'product.detail',
                                    params: {
                                        slug: selectedProduct1.product_slug,
                                        id: selectedProduct1.id,
                                    },
                                }">
                                <button
                                    type="button"
                                    class="border bg-secondary-3 text-white px-3 py-1 rounded-lg hover:bg-opacity-90">
                                    Views Product
                                </button>
                            </router-link>
                        </td>
                        <td class="w-1/3 text-gray-500 p-4">
                            <router-link
                                v-if="selectedProduct2"
                                :to="{
                                    name: 'product.detail',
                                    params: {
                                        slug: selectedProduct2.product_slug,
                                        id: selectedProduct2.id,
                                    },
                                }">
                                <button
                                    type="button"
                                    class="border bg-secondary-3 text-white px-3 py-1 rounded-lg hover:bg-opacity-90">
                                    Views Product
                                </button>
                            </router-link>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<style>
.multiselect__input::focus,
.multiselect__input::active {
    padding: none !important;
}
span.multiselect__single {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>
