import { type InteractiveLayerOptions, LayerGroup, type LayerOptions } from 'leaflet'
import { provide, type Ref } from 'vue'

import { AddLayerInjection, RemoveLayerInjection } from '../types/injectionKeys'
import { propsToLeafletOptions } from '../utils'

import { type LayerEmits, type LayerProps, layerPropsDefaults, setupLayer } from './layer'
import type { ILayerDefinition } from '../types/interfaces'

export type LayerGroupProps<T extends LayerOptions = LayerOptions> = LayerProps<T>

export const layerGroupPropsDefaults = layerPropsDefaults

export type LayerGroupEmits<T extends LayerGroup = LayerGroup> = LayerEmits & {
    (event: 'ready', layer: T): void
}

export const setupLayerGroup = <T extends LayerGroup = LayerGroup>(
    props: LayerGroupProps,
    leafletRef: Ref<LayerGroup | undefined>,
    emit: LayerGroupEmits<T>,
) => {
    const { options: layerOptions, methods: layerMethods } = setupLayer(props, leafletRef, emit)

    const options = propsToLeafletOptions<InteractiveLayerOptions>(props, layerOptions)

    const methods = {
        ...layerMethods,
        addLayer(layer: ILayerDefinition) {
            leafletRef.value?.addLayer(layer.leafletObject!)
        },
        removeLayer(layer: ILayerDefinition) {
            leafletRef.value?.removeLayer(layer.leafletObject!)
        },
    }

    provide(AddLayerInjection, methods.addLayer)
    provide(RemoveLayerInjection, methods.removeLayer)

    return { options, methods }
}
