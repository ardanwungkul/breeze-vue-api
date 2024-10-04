<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import 'swiper/css'
import { ref, onBeforeMount, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import Loading from '@/components/Loading.vue'
import '@/assets/css/vuetify.css'

// Initial address data
const currentView = ref('display') // Possible values: 'display', 'edit', 'addNew'

const isLoading = ref(true)
const storeProduct = useProductStore()
const product = ref(null)
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL

const mainImage = ref()
const mainImageDefault = ref()

const provinces = ref([])
const router = useRouter()
const route = useRoute()

onBeforeMount(async () => {
    await fetchProduct()
})

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

onMounted(() => {
    // Mengambil data provinsi saat komponen dimuat
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
        .then(response => response.json())
        .then(data => {
            provinces.value = data // Menyimpan data provinsi ke dalam state
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error) // Menangani kesalahan
        })
})

async function fetchProduct() {
    const route = useRoute()
    const slug = ref(route.params.slug)
    const productId = ref(route.params.id)
    await storeProduct.productBySlugId(slug.value, productId.value)
    if (
        !storeProduct.singleProduct ||
        Object.keys(storeProduct.singleProduct).length === 0
    ) {
        router.replace('/404')
    } else {
        product.value = storeProduct.singleProduct
        mainImage.value =
            import.meta.env.VITE_PUBLIC_BACKEND_URL +
            '/storage/images/product/' +
            product.value.product_image
        mainImageDefault.value = mainImage.value
        isLoading.value = storeProduct.loading
    }
}
</script>
<template>
    <AppLayout>
        <Loading :isLoading="isLoading" />
        <div class="px-10 py-5">
            <div class="w-full max-w-[1080px] mx-auto space-y-6">
                <!-- Address -->
                <div
                    class="flex bg-white mx-auto rounded-lg shadow-lg gap-3 w-full relative">
                    <div class="w-full px-6 py-6 space-y-8">
                        <p class="font-medium">Delivery Address</p>
                        <div class="w-full grid grid-cols-7">
                            <div class="text-wrap font-semibold text-sm">
                                M. Wildan (+62) 85624203799
                            </div>
                            <div class="col-span-5 text-sm">
                                Jaya Makmur, RT.1/RW.9, Kp Jembatan, Andir,
                                Baleendah (Dekat Masjid al hayu), KAB. BANDUNG -
                                BALEENDAH, JAWA BARAT, ID 40375
                            </div>
                            <div class="text-sm flex items-center justify-end">
                                <v-dialog>
                                    <template
                                        v-slot:activator="{
                                            props: activatorProps,
                                        }">
                                        <button v-bind="activatorProps" class=" text-secondary-2">
                                            Change
                                        </button>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <div
                                            class="mx-auto bg-white w-[720px] p-6 rounded-md space-y-6 divide-y-2">
                                            <p class="font-semibold">
                                                My Address
                                            </p>
                                            <!-- Conditional content -->
                                            <div class="pt-3 w-full space-y-4">
                                                <!-- All Address -->
                                                <div
                                                    v-if="
                                                        currentView ===
                                                        'display'
                                                    "
                                                    class="space-y-4">
                                                    <div
                                                        class="w-full flex flex-row gap-2">
                                                        <div>
                                                            <input
                                                                class="border border-neutral-600"
                                                                type="radio"
                                                                name="address_active"
                                                                id="" />
                                                        </div>
                                                        <div
                                                            class="px-3 w-full">
                                                            <div
                                                                class="flex flex-row justify-between">
                                                                <div
                                                                    class="flex flex-row divide-x-2">
                                                                    <p class="pr-3 font-semibold">Nama Lengkap</p>
                                                                    <p class="px-3 text-neutral-600">No. Telephone</p>
                                                                </div>
                                                                <div>
                                                                    <button @click="currentView ='edit'" class=" text-secondary-2">
                                                                        Edit
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="text-sm">
                                                                <p>Objective</p>
                                                                <p>
                                                                    Subjective
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            @click="currentView ='addNew'"
                                                            class=" px-3 py-2 border rounded-md duration-300 hover:bg-neutral-100">
                                                            Add new
                                                        </button>
                                                    </div>
                                                </div>
                                                <!-- Edit -->
                                                <div
                                                    v-if="
                                                        currentView === 'edit'
                                                    "
                                                    class="w-full space-y-8">
                                                    <p class=" text-xl font-semibold">Edit Address</p>
                                                    <div
                                                        class="w-full grid grid-cols-2 gap-4">
                                                        <div
                                                            class="relative w-full">
                                                            <label
                                                                for="input1"
                                                                class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                                Full Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="input1"
                                                                name="input1"
                                                                class="border w-full"
                                                                placeholder="..." />
                                                        </div>
                                                        <div
                                                            class="relative w-full">
                                                            <label
                                                                for="input1"
                                                                class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                                Phone Number
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="input1"
                                                                name="input1"
                                                                class="border w-full"
                                                                placeholder="..." />
                                                        </div>
                                                    </div>
                                                    <div class="relative w-full">
                                                        <label
                                                            for="input1"
                                                            class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                            Province, City, District, Postal Code
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="input1"
                                                            name="input1"
                                                            class="border w-full"
                                                            placeholder="..." />
                                                    </div>
                                                    <div class="relative w-full">
                                                        <label
                                                            for="input1"
                                                            class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                            Street Name, Building, House No.
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="input1"
                                                            name="input1"
                                                            class="border w-full"
                                                            placeholder="..." />
                                                    </div>
                                                    <div class="relative w-full">
                                                        <label
                                                            for="input1"
                                                            class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                            Other Details (e.g. Block/ Unit No., Landmark)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="input1"
                                                            name="input1"
                                                            class="border w-full"
                                                            placeholder="..." />
                                                    </div>
                                                </div>
                                                <!-- Add New -->
                                                <div
                                                    v-if="
                                                        currentView === 'addNew'
                                                    "
                                                    class="w-full space-y-8">
                                                    <p class=" text-xl font-semibold">Add New Address</p>
                                                    <div
                                                        class="w-full grid grid-cols-2 gap-4">
                                                        <div
                                                            class="relative w-full">
                                                            <label
                                                                for="input1"
                                                                class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                                Full Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="input1"
                                                                name="input1"
                                                                class="border w-full"
                                                                placeholder="..." />
                                                        </div>
                                                        <div
                                                            class="relative w-full">
                                                            <label
                                                                for="input1"
                                                                class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                                Phone Number
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="input1"
                                                                name="input1"
                                                                class="border w-full"
                                                                placeholder="..." />
                                                        </div>
                                                    </div>
                                                    <div class="relative w-full">
                                                        <label
                                                            for="input1"
                                                            class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                            Province, City, District, Postal Code
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="input1"
                                                            name="input1"
                                                            class="border w-full"
                                                            placeholder="..." />
                                                    </div>
                                                    <div class="relative w-full">
                                                        <label
                                                            for="input1"
                                                            class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                            Street Name, Building, House No.
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="input1"
                                                            name="input1"
                                                            class="border w-full"
                                                            placeholder="..." />
                                                    </div>
                                                    <div class="relative w-full">
                                                        <label
                                                            for="input1"
                                                            class="absolute -top-3 left-2 px-1 text-gray-600 bg-white text-xs">
                                                            Other Details (e.g. Block/ Unit No., Landmark)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="input1"
                                                            name="input1"
                                                            class="border w-full"
                                                            placeholder="..." />
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- end content -->
                                            <div class="pt-3 flex justify-end">
                                                <div
                                                    class="flex flex-row gap-3">
                                                    <button
                                                        @click="
                                                            currentView ===
                                                            'display'
                                                                ? (isActive.value = false)
                                                                : (currentView =
                                                                      'display')
                                                        "
                                                        class="border py-2 px-3 rounded-md duration-300 hover:bg-neutral-100">
                                                        Cancel
                                                    </button>
                                                    <button
                                                        class="border py-2 px-3 rounded-md bg-secondary-3 text-white duration-300 hover:opacity-80">
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </v-dialog>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Product Voucher -->
                <div
                    class="flex bg-white mx-auto rounded-lg shadow-lg gap-3 w-full relative">
                    <div class="w-full px-6 py-6 space-y-8 divide-y-2">
                        <div class="w-full space-y-12">
                            <div class="w-full grid grid-cols-2">
                                <p class="font-medium">Product Ordered</p>
                                <div
                                    class="w-full grid grid-cols-3 text-right text-sm text-neutral-400 items-center">
                                    <div class="w-full">Unit Price</div>
                                    <div class="w-full">Quantity</div>
                                    <div class="w-full">Item Subtotal</div>
                                </div>
                            </div>
                            <div class="w-full grid grid-cols-2">
                                <div class="text-sm pl-6 flex flex-row gap-4">
                                    <div
                                        class="min-w-10 aspect-square overflow-hidden rounded-sm">
                                        <v-img
                                            :src="mainImage"
                                            class="!aspect-square w-full rounded-sm"
                                            cover>
                                            <template v-slot:placeholder>
                                                <div
                                                    class="w-full flex justify-center items-center h-full">
                                                    <v-progress-circular
                                                        color=""
                                                        indeterminate></v-progress-circular>
                                                </div>
                                            </template>
                                        </v-img>
                                    </div>
                                    <div>
                                        <P class="line-clamp-1">{{
                                            product ? product.product_name : ''
                                        }}</P>
                                        <P></P>
                                    </div>
                                </div>
                                <div
                                    class="w-full grid grid-cols-3 text-right text-sm items-center">
                                    <div class="w-full">
                                        Rp.
                                        {{
                                            product
                                                ? formatPrice(
                                                      product.product_price,
                                                  )
                                                : ''
                                        }}
                                    </div>
                                    <div class="w-full">
                                        {{ route.params.qty }}
                                    </div>
                                    <div class="w-full font-semibold">
                                        Rp.
                                        {{ formatPrice(route.params.amount) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-8">
                            <p class="font-medium">Voucher</p>
                        </div>
                    </div>
                </div>
                <!-- Payment Total -->
                <div
                    class="flex bg-white mx-auto rounded-lg shadow-lg gap-3 w-full relative">
                    <div class="w-full px-6 py-6 space-y-8 divide-y-2">
                        <p class="font-medium">Payment Total</p>
                        <div class="pt-8 w-full flex justify-end">
                            <div
                                class="grid grid-cols-1 gap-4 text-sm text-neutral-600">
                                <div class="grid grid-cols-2">
                                    <p>Merchandise Subtotal</p>
                                    <p class="text-right">
                                        Rp.
                                        {{ formatPrice(route.params.amount) }}
                                    </p>
                                </div>
                                <div class="grid grid-cols-2">
                                    <p>Voucher</p>
                                    <p class="text-right">-Rp. 0</p>
                                </div>
                                <div class="grid grid-cols-2">
                                    <p>Total</p>
                                    <p class="text-right text-xl font-semibold">
                                        Rp.
                                        {{ formatPrice(route.params.amount) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="pt-8 w-full flex justify-end">
                            <button
                                class="bg-secondary-3 text-white py-3 px-4 rounded-md flex flex-row gap-2 duration-300 hover:opacity-80">
                                <div class="w-5 h-5">
                                    <i class="fa-regular fa-cart-shopping"></i>
                                </div>
                                <p>Order</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
