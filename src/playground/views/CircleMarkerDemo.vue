<script setup lang="ts">
import { LCircleMarker, LMap, LTileLayer } from '../../components'
import { ref } from 'vue'

const zoom = ref<number>(16)
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[41.89026, 12.49238]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>

        <LCircleMarker :lat-lng="[41.89026, 12.49238]" :radius="50" />
    </LMap>
</template>

<style></style>
