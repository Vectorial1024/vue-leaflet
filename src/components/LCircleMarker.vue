<script setup lang="ts">
import { CircleMarker } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'

import {
    type CircleMarkerEmits,
    type CircleMarkerProps,
    circleMarkerPropsDefaults,
    setupCircleMarker,
} from '../functions/circleMarker'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'

const props = withDefaults(defineProps<CircleMarkerProps>(), circleMarkerPropsDefaults)
const emit = defineEmits<CircleMarkerEmits>()

const { ready, leafletObject } = useCircleMarker()
defineExpose({ ready, leafletObject })

function useCircleMarker() {
    const leafletObject = ref<CircleMarker>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupCircleMarker(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<CircleMarker>(new CircleMarker(props.latLng, options))

        const { listeners } = remapEvents(useAttrs())
        leafletObject.value.on(listeners)

        propsBinder(methods, leafletObject.value, props)

        addLayer({
            ...props,
            ...methods,
            leafletObject: leafletObject.value,
        })
        ready.value = true
        nextTick(() => emit('ready', leafletObject.value!))
    })
    return { leafletObject, ready }
}
</script>

<template>
    <div v-if="ready" style="display: none">
        <slot />
    </div>
</template>
