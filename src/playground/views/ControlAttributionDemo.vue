<script setup lang="ts">
import { LControlAttribution, LMap, LTileLayer } from '../../components'
import { ref } from 'vue'

const customAttributionPrefix = ref<string>('<strong>Custom bottom left attribution</strong>')
</script>

<template>
    <LMap ref="map" :zoom="2" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>
        <LControlAttribution position="bottomleft" :prefix="customAttributionPrefix" />
    </LMap>
</template>

<style></style>
