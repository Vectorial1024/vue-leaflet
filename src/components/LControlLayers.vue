<script setup lang="ts">
import { markRaw, nextTick, onMounted, ref } from 'vue'
import { Control } from 'leaflet'
import { RegisterLayerControlInjection } from '../types/injectionKeys.ts'
import {
    type ControlLayersEmits,
    type ControlLayersProps,
    controlLayersPropsDefaults,
    setupControlLayers,
} from '../functions/controlLayers.ts'
import { assertInject, propsBinder } from '../utils.ts'

const props = withDefaults(defineProps<ControlLayersProps>(), { ...controlLayersPropsDefaults })
const emit = defineEmits<ControlLayersEmits>()

const { leafletObject } = useControlLayers()
defineExpose({ leafletObject })

function useControlLayers() {
    const leafletObject = ref<Control.Layers>()

    const registerLayerControl = assertInject(RegisterLayerControlInjection)

    const { options, methods } = setupControlLayers(props, leafletObject)

    onMounted(async () => {
        leafletObject.value = markRaw<Control.Layers>(
            new Control.Layers(undefined, undefined, options),
        )

        propsBinder(methods, leafletObject.value, props)

        registerLayerControl({
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
