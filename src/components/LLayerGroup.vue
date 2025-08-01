<script setup lang="ts">
import { LayerGroup } from 'leaflet'
import { markRaw, nextTick, onMounted, ref, useAttrs } from 'vue'
import { AddLayerInjection } from '../types/injectionKeys'
import { assertInject, propsBinder, remapEvents } from '../utils.js'
import {
    type LayerGroupEmits,
    type LayerGroupProps,
    layerGroupPropsDefaults,
    setupLayerGroup,
} from '../functions/layerGroup.ts'

const props = withDefaults(defineProps<LayerGroupProps>(), layerGroupPropsDefaults)
const emit = defineEmits<LayerGroupEmits>()

const { ready, leafletObject } = useLayerGroup()
defineExpose({ ready, leafletObject })

function useLayerGroup() {
    const leafletObject = ref<LayerGroup>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { methods } = setupLayerGroup(props, leafletObject, emit)

    onMounted(async () => {
        leafletObject.value = markRaw<LayerGroup>(new LayerGroup(undefined, props.options))

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
