<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const props = defineProps({
    qr: Object,
    show: Object,
    result: String,
})
const facingMode = ref('environment')
const noRearCamera = ref(false)
const noFrontCamera = ref(false)
const emit = defineEmits(['update:result'])
const switchCamera = async () => {
    switch (facingMode.value) {
        case 'environment':
            facingMode.value = 'user'
            break
        case 'user':
            facingMode.value = 'environment'
            break
    }
}

const onError = async error => {
    const triedFrontCamera = facingMode.value === 'user'
    const triedRearCamera = facingMode.value === 'environment'

    const cameraMissingError = error.name === 'OverconstrainedError'

    if (triedRearCamera && cameraMissingError) {
        noRearCamera.value = true
    }

    if (triedFrontCamera && cameraMissingError) {
        noFrontCamera.value = true
    }

    console.error(error)
}
const onDetect = async detectedCodes => {
    const detectedResult = detectedCodes.map(code => code.rawValue)
    console.log(detectedCodes)

    emit('update:result', detectedResult)
    props.qr.paused = true
    props.show.value = false
}
function paintBoundingBox(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height },
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
    }
}
</script>
<template>
    <div
        class="bg-white max-w-3xl mx-auto rounded-lg overflow-hidden !h-[calc(80vh)]">
        <div class="px-3 py-2 flex justify-between items-center">
            <p class="font-medium text-lg">Scan QR Code</p>
            <button
                @click="show.value = false"
                class="rounded-full hover:bg-gray-100 w-8 h-8 flex items-center justify-center">
                <i class="fa-solid fa-x"></i>
            </button>
        </div>
        <QrcodeStream
            :constraints="{ facingMode }"
            @error="onError"
            :paused="qr.paused"
            @detect="onDetect"
            :track="paintBoundingBox">
            <button
                type="button"
                @click="switchCamera"
                class="absolute top-3 left-3">
                <div
                    class="bg-light-primary-2 rounded-full w-10 h-10 flex items-center justify-center">
                    <i class="fa-solid fa-repeat"></i>
                </div></button
        ></QrcodeStream>
    </div>
</template>
