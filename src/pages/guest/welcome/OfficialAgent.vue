<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import OfficialAgentForm from '@/pages/guest/welcome/OfficialAgentForm.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

import placeholderImage from '@/assets/images/placeholder-image.jpg'

import { useUsers } from '@/stores/user'
import { useStoreStore } from '@/stores/store'
import { usePaymentStore } from '@/stores/payment'
import { useResellerPackageStore } from '@/stores/resellerpackage'

const setErrors = ref([])
const cekAuth = ref(false)
const errors = computed(() => setErrors.value)

const user = ref(null)
const storeUser = useUsers()
const storeStore = useStoreStore()
const processing = ref(false)

const storePayment = usePaymentStore()
const payment = ref(null)
const havePayment = ref(true)

const storeResellerPackage = useResellerPackageStore()
const resellerPackage = ref([])

function formatJuta(price) {
    return (price / 1000000).toString().replace(/\./g, ',') + ' Jt'
}

onMounted(async () => {
    await fetchUser()
    await fetchResellerPackage()
    if (storeUser.authUser) {
        await fetchPayment()
    } else {
        payment.value = null
    }
})

watch(
    () => storeUser.authUser,
    async (newValue, oldValue) => {
        await fetchUser()
        await fetchResellerPackage()
        if (user.value) {
            await fetchPayment()
        } else {
            payment.value = null
        }
    },
)

async function fetchUser() {
    await storeUser.getAuth()
    user.value = storeUser.userAuth
}

async function fetchPayment() {
    await storePayment.paymentReseller(user.value.id)
    payment.value = storePayment.singlePayment
}

async function fetchResellerPackage() {
    await storeResellerPackage.resellerPackageAll()

    let allResellerPackage = storeResellerPackage.allResellerPackage

    if (user?.value?.store) {
        allResellerPackage = allResellerPackage.filter(
            P => P.id === user.value.store.reseller_package_id,
        )
    }

    resellerPackage.value = allResellerPackage.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        level: pkg.level,
        package_item: [
            { status: pkg.plakat, name: 'Plakat' },
            { status: pkg.neon_etalase, name: 'Neon Etalase' },
            { status: pkg.rack_product, name: 'Rack Product' },
            { status: pkg.interior_design, name: 'Interior Design' },
            { status: pkg.application_crm, name: 'Application CRM' },
            { status: pkg.application_finance, name: 'Application Finance' },
            { status: pkg.application_logistic, name: 'Application Logistic' },
            { status: pkg.bonus, name: 'Bonus' },
        ],
    }))
}

const swiperModules = [Navigation, Autoplay]
const swiperJs = swiper => {}

const swiperConfig = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}

const Continue = async () => {
    processing.value = true

    const id = payment.value.id

    await storeStore.paymentReseller(id, processing)
}

const AddStore = async newStore => {
    await storeStore.buyPackage(newStore, setErrors, processing)
}

const modules = swiperModules
</script>
<template>
    <div class="px-3 xl:px-0">
        <ValidationErrors class="w-full" :errors="errors" />
        <div
            class="w-full rounded-md border p-5 bg-[#f4f0ed]"
            style="box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.2)">
            <swiper
                :modules="modules"
                :loop="true"
                :autoplay="{
                    delay: 3000,
                }"
                :breakpoints="{
                    '640': {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    '768': {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    '1024': {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }"
                @swiper="swiperJs">
                <swiper-slide v-for="n in 10" :key="n">
                    <div
                        class="flex flex-col justify-center items-center text-center gap-2">
                        <div
                            class="w-20 h-20 object-cover rounded-full overflow-hidden">
                            <v-img
                                :src="placeholderImage"
                                aspect-ratio="1"
                                class="min-h-full"
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
                        <p class="text-gray-600">
                            Lorem ipsum dolor sit amet, consec adipiscing elit.
                            Nam eusem scelerisque tempor, varius quam
                        </p>
                        <div>
                            <svg viewBox="0 0 32 32" class="w-8 fill-gray-300">
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <path
                                            d="M13,11c0.6,0,1-0.4,1-1s-0.4-1-1-1c-5,0-9,4-9,9c0,2.8,2.2,5,5,5s5-2.2,5-5s-2.2-5-5-5c-0.3,0-0.7,0-1,0.1 C9.3,11.8,11,11,13,11z"></path>
                                        <path
                                            d="M23,13c-0.3,0-0.7,0-1,0.1c1.3-1.3,3-2.1,5-2.1c0.6,0,1-0.4,1-1s-0.4-1-1-1c-5,0-9,4-9,9c0,2.8,2.2,5,5,5s5-2.2,5-5 S25.8,13,23,13z"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <p class="text-blue-700 uppercase font-bold">
                            Jessica Milla
                        </p>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="flex justify-center mt-10">
                <v-dialog>
                    <template v-slot:activator="{ props: activatorProps }">
                        <button
                            v-bind="activatorProps"
                            class="rounded-md tracking-widest uppercase font-semibold text-gray-700 transition-all duration-500 hover:bg-[#f8f8f6] hover:shadow px-10 py-2">
                            Let's Become Partners!
                        </button>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <div
                            class="w-full max-w-4xl mx-auto bg-light-primary-1 rounded-xl overflow-hidden shadow-lg h-auto max-h-[80vh] mt-4">
                            <div
                                class="flex justify-end items-center p-3 bg-light-primary-1 relative w-full">
                                <button
                                    @click="isActive.value = false"
                                    class="fa-solid fa-xmark rounded-xl hover:scale-110 px-3 py-2 duration-300 hover:bg-ezzora-100 hover:text-ezzora-800"></button>
                            </div>
                            <div
                                class="p-3 invisible-scrollbar overflow-y-scroll space-y-2 max-h-[calc(80vh-56px)]">
                                <div
                                    v-if="
                                        payment &&
                                        user?.store === null &&
                                        havePayment
                                    "
                                    class="w-full border border-ezzora-500 rounded-md py-2 px-4 flex justify-between -mt-2 bg-ezzora-100">
                                    <p class="text-gray-500">
                                        A previous transaction is still
                                        incomplete. Do you want to continue with
                                        the pending transaction?
                                    </p>
                                    <div class="flex gap-2 items-center">
                                        <button
                                            @click="Continue()"
                                            class="font-semibold hover:scale-110 duration-300 border rounded-lg px-5 text-sm bg-green-500 text-white">
                                            Yes
                                        </button>
                                        <p class="text-xs text-gray-500">/</p>
                                        <button
                                            @click="havePayment = false"
                                            class="font-semibold hover:scale-110 duration-300 border rounded-lg px-5 text-sm bg-red-500 text-white">
                                            No
                                        </button>
                                    </div>
                                </div>
                                <swiper
                                    v-if="resellerPackage"
                                    :modules="swiperModules"
                                    :breakpoints="{
                                        '640': {
                                            slidesPerView: 1,
                                            spaceBetween: 20,
                                        },
                                        '768': {
                                            slidesPerView: 3,
                                            spaceBetween: 20,
                                        },
                                        '1024': {
                                            slidesPerView: 4,
                                            spaceBetween: 20,
                                        },
                                    }"
                                    @swiper="swiperJs">
                                    <swiper-slide
                                        v-for="item in resellerPackage"
                                        :key="item.index"
                                        class="flex justify-center">
                                        <div
                                            class="w-full h-full text-gray-500 text-center flex justify-center flex-col">
                                            <div
                                                class="text-2xl font-semibold text-ezzora-700">
                                                {{ item.name }}
                                            </div>
                                            <div
                                                class="text-3xl font-bold mb-2 text-ezzora-900">
                                                Rp. {{ formatJuta(item.price) }}
                                            </div>

                                            <div class="border-t w-full">
                                                <div class="py-4 pb-0">
                                                    <div
                                                        v-for="package_item in item.package_item"
                                                        :key="
                                                            package_item.index
                                                        "
                                                        class="flex flex-row items-center gap-2 odd:bg-white even:bg-ezzora-50 py-1 px-2">
                                                        <div
                                                            v-if="
                                                                package_item.status
                                                            "
                                                            class="w-3 h-3 text-sm flex items-center text-secondary-3">
                                                            <i
                                                                class="fa-solid fa-check"></i>
                                                        </div>
                                                        <div
                                                            v-if="
                                                                !package_item.status
                                                            "
                                                            class="w-3 h-3 text-sm flex items-center text-red-600">
                                                            <i
                                                                class="fa-solid fa-xmark"></i>
                                                        </div>
                                                        <p
                                                            class="font-semibold text-sm text-start">
                                                            {{
                                                                package_item.name
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="w-full justify-center mt-4">
                                                <OfficialAgentForm
                                                    :resellerPackage="item"
                                                    :user="user"
                                                    :method="AddStore" />
                                            </div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                                <div v-if="resellerPackage.length == 0">
                                    <p class="text-center text-gray-700">
                                        No Data Available
                                    </p>
                                </div>
                            </div>
                        </div>
                    </template>
                </v-dialog>
            </div>
        </div>
    </div>
</template>
