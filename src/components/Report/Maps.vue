<script setup>
import map from '@svg-maps/indonesia';
import { ref } from 'vue';

// maps
const cityCountData = [
    {
        id: "id-ac",
        data: 23,
    },
    {
        id: "id-ba",
        data: 12
    },
    {
        id: "id-pa",
        data: 13
    },
    {
        id: 'id-jb',
        data: '23'
    }
]
const hoveredCityCount = ref(null);
const tooltipX = ref(0);
const tooltipY = ref(0);
function handleCityHover(event, id) {
    const cityData = cityCountData.find(item => item.id === id);
    hoveredCityCount.value = cityData ? cityData.data : '0';
    tooltipX.value = event.clientX;
    tooltipY.value = event.clientY - 20;
}

function hideCityCount(event) {
    hoveredCityCount.value = null;
    const element = event.target;
    element.classList.remove('hovered');
}
// end maps
</script>
<template>
    <div
        class="w-full shadow-lg dark:bg-dark-primary-2 border dark:!border-typography-2 bg-light-primary-1 px-8 rounded-lg">
        <svg width="100%" height="400" viewBox="0 29 793 288">
            <path v-for="location in map.locations" :key="location.id" :id="location.id" :d="location.path"
                class="province" :class="cityCountData.some(ids => ids.id === location.id) ? '!fill-red-500' : ''"
                @mouseover="handleCityHover($event, location.id)" @mouseleave="hideCityCount" />
        </svg>
        <div v-if="hoveredCityCount" class="tooltip" :style="{ top: `${tooltipY}px`, left: `${tooltipX}px` }">
            {{ hoveredCityCount }} kota
        </div>
    </div>
</template>
<style>
.province {
    fill: #ccc;
    stroke: #333;
    stroke-width: 1;
}

.province.hovered {
    fill: green;
}

.tooltip {
    position: fixed;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    transform: translate(-50%, -100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: opacity 0.3s ease;
}

/* Segitiga untuk penjorokan */
.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: calc(50% - 8px);
    border-width: 8px;
    border-style: solid;
    border-color: white transparent transparent transparent;
}
</style>