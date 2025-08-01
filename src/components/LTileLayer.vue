<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { TileLayer } from 'leaflet'
import { assertInject, propsBinder, remapEvents } from '../utils.ts'
import { AddLayerInjection } from '../types/injectionKeys.ts'
import {
    setupTileLayer,
    type TileLayerEmits,
    type TileLayerProps,
    tileLayerPropsDefaults,
} from '../functions/tileLayer.ts'

const props = withDefaults(defineProps<TileLayerProps>(), tileLayerPropsDefaults)
const emit = defineEmits<TileLayerEmits>()

const { leafletObject } = useTileLayer()

defineExpose({ leafletObject })

function useTileLayer() {
    const leafletObject = ref<TileLayer>()

    const addLayer = assertInject(AddLayerInjection)
    const { options, methods } = setupTileLayer(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<TileLayer>(new TileLayer(props.url, options))

        const { listeners } = remapEvents(useAttrs())
        leafletObject.value.on(listeners)

        propsBinder(methods, leafletObject.value, props)
        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value,
        })
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return { leafletObject }
}
</script>

<template>
    <div style="display: none"></div>
</template>
