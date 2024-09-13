<script setup>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

const props = defineProps({
    showCropper: Boolean,
    img: String,
    method: Function,
    aspect: Number,
})
function clear() {
    if (!cropper) return
    cropper.clear()
}
function reset() {
    if (!cropper) return
    cropper.reset()
}
const handleMethod = async method => {
    await props.method(method)
}
</script>
<template>
    <div
        v-if="showCropper"
        class="w-full h-screen bg-black/50 fixed z-[9999999] top-0 left-0 py-3 flex items-center">
        <div class="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            <div class="px-5 py-3">
                <div class="flex justify-between">
                    <p class="whitespace-nowrap w-full">Crop Image</p>
                    <div class="w-full flex justify-end gap-3 bg-white pb-3">
                        <button
                            class="text-sm bg-gray-300 px-3 py-1 rounded-lg text-white"
                            @click="handleMethod('cancel')">
                            Cancel
                        </button>
                        <button
                            class="text-sm bg-gray-300 px-3 py-1 rounded-lg text-white"
                            @click="clear">
                            Clear
                        </button>
                        <button
                            class="text-sm bg-gray-300 px-3 py-1 rounded-lg text-white"
                            @click="reset">
                            Reset
                        </button>
                        <button
                            class="text-sm bg-secondary-3 px-3 py-1 rounded-lg text-white primary"
                            @click="handleMethod('crop')">
                            Crop
                        </button>
                    </div>
                </div>
                <VuePictureCropper
                    class=""
                    :boxStyle="{
                        backgroundColor: '',
                        width: '100%',
                        maxWidth: '1000px',
                        maxHeight: '80vh',
                    }"
                    :img="img"
                    :options="{
                        viewMode: 1,
                        dragMode: 'crop',
                        aspectRatio: aspect,
                    }" />
            </div>
        </div>
    </div>
</template>
