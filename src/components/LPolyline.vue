<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import {
    type PolylineEmits,
    type PolylineProps,
    polylinePropsDefaults,
    setupPolyline,
} from '../functions/polyline'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import { Polyline } from 'leaflet'

const props = withDefaults(defineProps<PolylineProps>(), polylinePropsDefaults)
const emit = defineEmits<PolylineEmits>()

const { ready, leafletObject } = usePolyline()
defineExpose({ ready, leafletObject })

function usePolyline() {
    const leafletObject = ref<Polyline>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { options, methods } = setupPolyline(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<Polyline>(new Polyline(props.latLngs, options))

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
    return { ready, leafletObject }
}
</script>

<template>
    <div v-if="ready" style="display: none">
        <slot />
    </div>
</template>
