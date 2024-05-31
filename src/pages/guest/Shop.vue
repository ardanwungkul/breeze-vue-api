<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
</script>
<template>
    <AppLayout>
        <div class="w-full min-h-96 bg-black"></div>
        <div class="w-full py-16">
            <div class="flex flex-col mx-auto w-full max-w-[1120px] relative">
                <div
                    id="controls-carousel"
                    class="relative w-full"
                    data-carousel="static">
                    <!-- Carousel wrapper -->
                    <div class="relative h-56 overflow-hidden md:h-[250px]">
                        <!-- Item 1 -->
                        <div
                            class="hidden duration-700 ease-in-out"
                            data-carousel-item>
                            <div
                                class="w-full h-full flex flex-row bg-black"></div>
                        </div>
                        <!-- Item 1 -->
                        <div
                            class="hidden duration-700 ease-in-out"
                            data-carousel-item>
                            <div
                                class="w-full h-full flex flex-row bg-white"></div>
                        </div>
                        <!-- Item 1 -->
                        <div
                            class="hidden duration-700 ease-in-out"
                            data-carousel-item>
                            <div
                                class="w-full h-full flex flex-row bg-black"></div>
                        </div>
                        <!-- Item 1 -->
                        <div
                            class="hidden duration-700 ease-in-out"
                            data-carousel-item>
                            <div
                                class="w-full h-full flex flex-row bg-white"></div>
                        </div>
                    </div>
                    <!-- Slider controls -->
                    <button
                        type="button"
                        class="absolute top-0 start-0 z-50 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-prev>
                        <span
                            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 group-hover:bg-gray-200/50">
                            <svg
                                class="w-4 h-4 text-black rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10">
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 1 1 5l4 4" />
                            </svg>
                            <span class="sr-only">Previous</span>
                        </span>
                    </button>
                    <button
                        type="button"
                        class="absolute top-0 end-0 z-50 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-next>
                        <span
                            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 group-hover:bg-gray-200/50">
                            <svg
                                class="w-4 h-4 text-black rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10">
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 9 4-4-4-4" />
                            </svg>
                            <span class="sr-only">Next</span>
                        </span>
                    </button>
                </div>
                <div class="justify-center max-w-[25%] px-5">
                    <div
                        class="flex justify-center text-2xl font-semibold text-red-600">
                        FLASH SALE
                    </div>
                    <div
                        class="flex justify-center text-2xl font-semibold text-gray-500 flex-row gap-7">
                        <div>12</div>
                        <div>12</div>
                        <div>12</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pb-16">
            <div
                class="flex flex-col justify-center mx-auto w-full max-w-[1120px] relative">
                <div
                    class="w-full flex justify-center gap-4 text-lg font-semibold">
                    <div
                        style="background-color: rgb(237, 241, 255)"
                        class="w-1/3 flex flex-row px-5">
                        <div class="w-1/2 text-center relative p-4">
                            <div class="absolute top-1/2 -translate-y-1/2">
                                New Product Upto 50% off
                            </div>
                        </div>
                        <div class="w-1/2 bg-black min-h-32"></div>
                    </div>
                    <div
                        style="background-color: rgb(237, 241, 255)"
                        class="w-1/3 flex flex-row px-5">
                        <div class="w-1/2 text-center relative p-4">
                            <div class="absolute top-1/2 -translate-y-1/2">
                                New Product Upto 50% off
                            </div>
                        </div>
                        <div class="w-1/2 bg-black min-h-32"></div>
                    </div>
                    <div
                        style="background-color: rgb(237, 241, 255)"
                        class="w-1/3 flex flex-row px-5">
                        <div class="w-1/2 text-center relative p-4">
                            <div class="absolute top-1/2 -translate-y-1/2">
                                New Product Upto 50% off
                            </div>
                        </div>
                        <div class="w-1/2 bg-black min-h-32"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pb-16">
            <div
                class="flex flex-col justify-center mx-auto w-full max-w-[1120px] relative">
                <div class="w-full flex flow-row gap-5">
                    <div class="w-1/3">
                        <div class="border p-5">
                            <div class="font-medium">Filter by Price</div>
                            <input
                                id="medium-range"
                                type="range"
                                min="0"
                                max="300000"
                                value="0"
                                class="w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            <div class="font-medium">Filter By Rating</div>
                            <select
                                name=""
                                id=""
                                class="border-black/20 hover:border-black/30">
                                <option value="1star">Select Rating</option>
                                <option value="1star">*</option>
                                <option value="2star">**</option>
                                <option value="3star">***</option>
                                <option value="4star">****</option>
                                <option value="5star">*****</option>
                            </select>
                        </div>
                        <div
                            id="accordion-flush"
                            data-accordion="collapse"
                            class="border w-full"
                            data-active-classes="text-gray-900"
                            data-inactive-classes="text-gray-900">
                            <h2
                                id="accordion-flush-heading-1"
                                class="flex w-full">
                                <button
                                    type="button"
                                    class="p-5 flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-900 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                                    data-accordion-target="#accordion-flush-body-1"
                                    aria-expanded="true"
                                    aria-controls="accordion-flush-body-1">
                                    <span class=""> Categories </span>
                                </button>
                            </h2>
                            <div
                                id="accordion-flush-body-1"
                                class="hidden p-5"
                                aria-labelledby="accordion-flush-heading-1">
                                <div
                                    class="border-transparent border-b border-gray-200 dark:border-gray-700">
                                    <div class="flex flex-row mb-2 relative">
                                        <input
                                            class="mt-1"
                                            type="radio"
                                            name="tipe"
                                            id="" />
                                        <div class="px-2">Body Care</div>
                                    </div>
                                    <div class="flex flex-row mb-2 relative">
                                        <input
                                            class="mt-1"
                                            type="radio"
                                            name="tipe"
                                            id="" />
                                        <div class="px-2">Cosmetic</div>
                                    </div>
                                    <div class="flex flex-row mb-2 relative">
                                        <input
                                            class="mt-1"
                                            type="radio"
                                            name="tipe"
                                            id="" />
                                        <div class="px-2">Skin Care</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full mt-10">
                            <!-- <img
                                src="/public/images/banner1.png"
                                alt=""
                                srcset="" /> -->
                        </div>
                    </div>
                    <div class="w-2/3 flex flex-col">
                        <div class="flex flex-row justify-between">
                            <div class="flex flex-row">
                                <input
                                    type="text"
                                    class="h-10 border border-black/20"
                                    placeholder="Search by name" />
                                <button
                                    class="h-10 w-10 border border-black/20"></button>
                            </div>
                            <ul class="flex flex-row">
                                <li>
                                    <button
                                        type="button"
                                        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium text-sm px-5 py-2.5 me-2 mb-2">
                                        Most Relevan
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium text-sm px-5 py-2.5 me-2 mb-2">
                                        Most Rated
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium text-sm px-5 py-2.5 me-2 mb-2">
                                        Recomended
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            <div
                                class="flex flex-col p-4 min-w-[32.2%] w-full border">
                                <div class="w-full bg-black h-52">
                                    <img src="" alt="" srcset="" />
                                </div>
                                <div class="text-lg font-medium mb-2">
                                    Face Wash
                                </div>
                                <div class="text-slate-500 text-sm mb-5">
                                    Rp. 200.000
                                </div>
                                <div class="mb-5">
                                    <RouterLink
                                        to="#"
                                        class="text-base bg-black text-white p-2 px-3 border duration-300 border-neutral-400 hover:border-transparent rounded">
                                        view detail
                                    </RouterLink>
                                </div>
                            </div>
                            <div
                                class="flex flex-col p-4 min-w-[32.2%] w-full border">
                                <div class="w-full bg-black h-52">
                                    <img src="" alt="" srcset="" />
                                </div>
                                <div class="text-lg font-medium mb-2">
                                    Face Wash
                                </div>
                                <div class="text-slate-500 text-sm mb-5">
                                    Rp. 200.000
                                </div>
                                <div class="mb-5">
                                    <RouterLink
                                        to="#"
                                        class="text-base bg-black text-white p-2 px-3 border duration-300 border-neutral-400 hover:border-transparent rounded">
                                        view detail
                                    </RouterLink>
                                </div>
                            </div>
                            <div
                                class="flex flex-col p-4 min-w-[32.2%] w-full border">
                                <div class="w-full bg-black h-52">
                                    <img src="" alt="" srcset="" />
                                </div>
                                <div class="text-lg font-medium mb-2">
                                    Face Wash
                                </div>
                                <div class="text-slate-500 text-sm mb-5">
                                    Rp. 200.000
                                </div>
                                <div class="mb-5">
                                    <RouterLink
                                        to="#"
                                        class="text-base bg-black text-white p-2 px-3 border duration-300 border-neutral-400 hover:border-transparent rounded">
                                        view detail
                                    </RouterLink>
                                </div>
                            </div>
                            <div
                                class="flex flex-col p-4 min-w-[32.2%] w-full border">
                                <div class="w-full bg-black h-52">
                                    <img src="" alt="" srcset="" />
                                </div>
                                <div class="text-lg font-medium mb-2">
                                    Face Wash
                                </div>
                                <div class="text-slate-500 text-sm mb-5">
                                    Rp. 200.000
                                </div>
                                <div class="mb-5">
                                    <RouterLink
                                        to="#"
                                        class="text-base bg-black text-white p-2 px-3 border duration-300 border-neutral-400 hover:border-transparent rounded">
                                        view detail
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full pb-16">
            <div
                class="flex flex-col justify-center mx-auto w-full max-w-[1120px] relative">
                <div
                    style="background-color: rgb(237, 241, 255)"
                    class="w-full">
                    <div class="w-2/3"></div>
                    <div class="w-1/3"></div>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <div class="w-full py-16 bg-black text-white">
            <div
                class="flex flex-col mx-auto justify-center w-full max-w-[1120px] relative">
                <div class="flex flex-row justify-between mb-14">
                    <div class="w-[31%]">
                        <div class="text-2xl mb-5">About Us</div>
                        <div class="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut elit tellus, luctus nec ullamcorper mattis,
                            pulvinar dapibus leo.
                        </div>
                    </div>
                    <div class="w-[31%]">
                        <div class="text-2xl mb-5">Follow Us</div>
                        <div class="">
                            <div class="flex">
                                <div class="w-5 mr-2 mb-2">
                                    <svg
                                        viewBox="0 0 512 512"
                                        xml:space="preserve"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        stroke-linejoin="round"
                                        stroke-miterlimit="2">
                                        <path
                                            d="M512 256C512 114.615 397.385 0 256 0S0 114.615 0 256c0 127.777 93.616 233.685 216 252.89V330h-65v-74h65v-56.4c0-64.16 38.219-99.6 96.695-99.6 28.009 0 57.305 5 57.305 5v63h-32.281C305.918 168 296 187.733 296 207.978V256h71l-11.35 74H296v178.89C418.385 489.685 512 383.777 512 256Z"
                                            fill="#ffffff"
                                            fill-rule="nonzero"
                                            class="fill-1877f2"></path>
                                        <path
                                            d="M355.65 330 367 256h-71v-48.022c0-20.245 9.917-39.978 41.719-39.978H370v-63s-29.297-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.89a257.912 257.912 0 0 0 40 3.11c13.608 0 26.966-1.065 40-3.11V330h59.65Z"
                                            fill="#000000"
                                            fill-rule="nonzero"
                                            class="fill-ffffff"></path>
                                    </svg>
                                </div>
                                <div class="text-sm">ezzora.official</div>
                            </div>
                            <div class="flex">
                                <div class="w-5 mr-2 mb-2">
                                    <svg
                                        viewBox="0 0 600 600"
                                        xml:space="preserve"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        stroke-linejoin="round"
                                        stroke-miterlimit="2">
                                        <path
                                            d="M251.921.159c-68.418 0-76.997.29-103.867 1.516-26.814 1.224-45.127 5.482-61.152 11.71-16.566 6.438-30.615 15.052-44.62 29.057-14.005 14.005-22.619 28.054-29.057 44.62-6.228 16.024-10.486 34.337-11.71 61.151C.289 175.083 0 183.662 0 252.08c0 68.417.289 76.996 1.515 103.866 1.224 26.814 5.482 45.127 11.71 61.151 6.438 16.566 15.052 30.615 29.057 44.621 14.005 14.005 28.054 22.619 44.62 29.057 16.025 6.227 34.338 10.486 61.152 11.709 26.87 1.226 35.449 1.516 103.867 1.516 68.417 0 76.996-.29 103.866-1.516 26.814-1.223 45.127-5.482 61.151-11.709 16.566-6.438 30.615-15.052 44.621-29.057 14.005-14.006 22.619-28.055 29.057-44.621 6.227-16.024 10.486-34.337 11.709-61.151 1.226-26.87 1.516-35.449 1.516-103.866 0-68.418-.29-76.997-1.516-103.867-1.223-26.814-5.482-45.127-11.709-61.151-6.438-16.566-15.052-30.615-29.057-44.62-14.006-14.005-28.055-22.619-44.621-29.057-16.024-6.228-34.337-10.486-61.151-11.71C328.917.449 320.338.159 251.921.159Zm0 45.392c67.265 0 75.233.256 101.797 1.468 24.562 1.121 37.901 5.225 46.778 8.674 11.759 4.57 20.151 10.03 28.966 18.845 8.816 8.815 14.275 17.208 18.845 28.966 3.45 8.877 7.554 22.216 8.674 46.778 1.212 26.564 1.469 34.532 1.469 101.798 0 67.265-.257 75.233-1.469 101.797-1.12 24.562-5.224 37.901-8.674 46.778-4.57 11.759-10.029 20.151-18.845 28.966-8.815 8.816-17.207 14.275-28.966 18.845-8.877 3.45-22.216 7.554-46.778 8.674-26.56 1.212-34.527 1.469-101.797 1.469-67.271 0-75.237-.257-101.798-1.469-24.562-1.12-37.901-5.224-46.778-8.674-11.759-4.57-20.151-10.029-28.967-18.845-8.815-8.815-14.275-17.207-18.844-28.966-3.45-8.877-7.554-22.216-8.675-46.778-1.212-26.564-1.468-34.532-1.468-101.797 0-67.266.256-75.234 1.468-101.798 1.121-24.562 5.225-37.901 8.675-46.778 4.569-11.758 10.029-20.151 18.844-28.966 8.816-8.815 17.208-14.275 28.967-18.845 8.877-3.449 22.216-7.553 46.778-8.674 26.564-1.212 34.532-1.468 101.798-1.468Z"
                                            transform="translate(44 43.838) scale(1.01619)"
                                            fill-rule="nonzero"
                                            fill="#ffffff"
                                            class="fill-000000"></path>
                                        <path
                                            d="M251.921 336.053c-46.378 0-83.974-37.596-83.974-83.973 0-46.378 37.596-83.974 83.974-83.974 46.377 0 83.973 37.596 83.973 83.974 0 46.377-37.596 83.973-83.973 83.973Zm0-213.338c-71.447 0-129.365 57.918-129.365 129.365 0 71.446 57.918 129.364 129.365 129.364 71.446 0 129.364-57.918 129.364-129.364 0-71.447-57.918-129.365-129.364-129.365ZM416.627 117.604c0 16.696-13.535 30.23-30.231 30.23-16.695 0-30.23-13.534-30.23-30.23 0-16.696 13.535-30.23 30.23-30.23 16.696 0 30.231 13.534 30.231 30.23Z"
                                            transform="translate(44 43.838) scale(1.01619)"
                                            fill="#ffffff"
                                            fill-rule="nonzero"
                                            class="fill-030404"></path>
                                    </svg>
                                </div>
                                <div class="text-sm">ezzora.official</div>
                            </div>
                            <div class="flex">
                                <div class="w-5 mr-2 mb-2">
                                    <svg
                                        viewBox="0 0 448 512"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"
                                            fill="#ffffff"
                                            class="fill-000000"></path>
                                    </svg>
                                </div>
                                <div class="text-sm">ezzora.official</div>
                            </div>
                            <div class="flex">
                                <div class="w-5 mr-2 mb-2">
                                    <svg
                                        viewBox="0 0 512 512"
                                        xml:space="preserve"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        stroke-linejoin="round"
                                        stroke-miterlimit="2">
                                        <path
                                            d="M501.299 132.766c-5.888-22.03-23.234-39.377-45.264-45.264-39.932-10.701-200.037-10.701-200.037-10.701s-160.105 0-200.038 10.701c-22.025 5.887-39.376 23.234-45.264 45.264C0 172.694 0 256.002 0 256.002s0 83.308 10.696 123.232c5.888 22.03 23.239 39.381 45.264 45.268 39.933 10.697 200.038 10.697 200.038 10.697s160.105 0 200.037-10.697c22.03-5.887 39.376-23.238 45.264-45.268C512 339.31 512 256.002 512 256.002s0-83.308-10.701-123.236Z"
                                            fill="#ffffff"
                                            fill-rule="nonzero"
                                            class="fill-ed1f24"></path>
                                        <path
                                            d="m204.796 332.803 133.018-76.801-133.018-76.801v153.602Z"
                                            fill="#000000"
                                            fill-rule="nonzero"
                                            class="fill-ffffff"></path>
                                    </svg>
                                </div>
                                <div class="text-sm">ezzora.official</div>
                            </div>
                        </div>
                    </div>
                    <div class="w-[31%]">
                        <div class="text-2xl mb-5">Help Desk</div>
                        <div class="text-sm mb-2">FAQ</div>
                        <div class="text-sm mb-2">Refund Policy</div>
                        <div class="text-sm mb-2">Privacy</div>
                        <div class="text-2xl mt-5 mb-5">Customer Services</div>
                        <div class="">0822-7689-2222</div>
                    </div>
                </div>
                <div class="text-2xl mb-5 text-center">Find Us</div>
            </div>
        </div>
    </AppLayout>
</template>
