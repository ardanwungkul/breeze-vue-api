<template>
    <div class="">
        <div class="font-medium my-5">Bank Transfer</div>
        <div class="grid grid-cols-2 gap-8">
            <div class="flex flex-col">
                <label class="font-medium mb-2" for=""
                    >Bank Name</label
                >
                <input
                    class="border border-gray-300 duration-300 rounded-lg"
                    type="text" />
            </div>
            <div class="flex flex-col">
                <label class="font-medium mb-2" for=""
                    >Account Number</label
                >
                <input
                    class="border border-gray-300 duration-300 rounded-lg"
                    type="text" />
            </div>
        </div>
    </div>
    <div class="font-medium mb-2 col-span-2 mt-5">
        E-Money
    </div>
    <div
        v-for="i in 5"
        :key="i"
        class="border-b flex flex-row items-center">
        <div class="w-7 h-7"></div>
        <input
            type="text"
            class="border-none focus:ring-transparent"
            placeholder="No Ovo" />
    </div>
    <div class="font-medium mt-10 mb-5">
        Choose your Supplier (max 5)
    </div>
    <div class="w-full flex flex-row gap-5">
        <select
            class="rounded-lg focus:ring-0 border focus:border-gray-300 border-gray-300"
            name=""
            id="">
            <option value="">Provinsi</option>
        </select>
        <select
            class="rounded-lg focus:ring-0 border focus:border-gray-300 border-gray-300"
            name=""
            id="">
            <option value="">Kota</option>
        </select>
        <div
            class="rounded-lg flex flex-row border border-gray-300 focus:ring-4 focus:ring-blue-600/50 items-center">
            <input
                type="text"
                class="rounded-lg focus:ring-transparent border-0" />
            <div class="w-6 h-6 mr-3">
                <svg
                    enable-background="new 0 0 32 32"
                    id="Glyph"
                    version="1.1"
                    viewBox="0 0 32 32"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path
                        d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                        id="XMLID_223_" />
                </svg>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-8 mt-10">
        <div
            v-for="i in 4"
            :key="i"
            class="p-5 border rounded-lg">
            <div class="font-semibold mb-2">
                Cantik shop
            </div>
            <div class="text-sm text-gray-600">
                Address : Jl.Apa aja
            </div>
            <div
                class="text-sm text-gray-600 my-4 flex flex-row gap-1 items-center">
                <div class="">Rating :</div>
                <i
                    v-for="n in 5"
                    :key="n"
                    class="fa-solid fa-star text-yellow-300 text-xs"></i>
            </div>
            <div class="w-full flex justify-center">
                <input
                    class="rounded border-2 w-4 h-4"
                    type="checkbox"
                    name=""
                    id="" />
            </div>
        </div>
    </div>
</template>