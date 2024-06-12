<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue'
</script>

<template>
    <div
        class="h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-[#f4f0ed] px-3 bg-jar">
        <div
            class="bg-white rounded-2xl md:grid md:grid-cols-2 max-w-3xl overflow-hidden shadow-2xl w-full">
            <div class="p-4 group hidden md:block">
                <div
                    class="overflow-hidden rounded-2xl relative shadow-inner w-full">
                    <div class="absolute top-0 left-0 z-20 p-4">
                        <router-link to="/">
                            <p
                                class="font-poppins text-3xl leading-none font-medium uppercase group-hover:text-white transition-all duration-1000 drop-shadow-2xl text-gray-700">
                                Ezzora
                            </p>
                        </router-link>
                    </div>
                    <div
                        class="w-full h-full absolute bg-black top-0 opacity-0 group-hover:opacity-20 transition-all duration-1000 rounded-2xl z-10"></div>
                    <img
                        class="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-all duration-1000"
                        src="@/assets/images/person.jpeg"
                        alt="" />
                </div>
            </div>
            <div class="md:p-10 p-5 w-full">
                <div class="flex flex-col h-full">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.bg-jar {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1012%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(248%2c 248%2c 246%2c 1)'%3e%3c/rect%3e%3cpath d='M 0%2c64 C 57.6%2c88.4 172.8%2c198.2 288%2c186 C 403.2%2c173.8 460.8%2c-11.2 576%2c3 C 691.2%2c17.2 748.8%2c243 864%2c257 C 979.2%2c271 1036.8%2c85.6 1152%2c73 C 1267.2%2c60.4 1382.4%2c169.8 1440%2c194L1440 560L0 560z' fill='rgba(244%2c 240%2c 237%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c524 C 96%2c480.8 288%2c303.8 480%2c308 C 672%2c312.2 768%2c532.8 960%2c545 C 1152%2c557.2 1344%2c404.2 1440%2c369L1440 560L0 560z' fill='rgba(226%2c 217%2c 217%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1012'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
}
</style>
