<script setup lang="ts">
import { LControlLayers, LMap, LTileLayer } from '../../components'
</script>

<template>
    <LMap ref="map" :zoom="2" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            layer-type="base"
            name="Humanitarian OpenStreetMap"
            attribution="© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France"
        />
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>
        <LControlLayers />
    </LMap>
</template>

<style></style>
