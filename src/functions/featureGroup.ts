import { FeatureGroup, type InteractiveLayerOptions } from 'leaflet'

import { propsToLeafletOptions } from '../utils'

import {
    type LayerGroupEmits,
    type LayerGroupProps,
    layerGroupPropsDefaults,
    setupLayerGroup,
} from './layerGroup'
import type { Ref } from 'vue'

export type FeatureGroupProps = LayerGroupProps

export const featureGroupPropsDefaults = layerGroupPropsDefaults

export type FeatureGroupEmits = LayerGroupEmits<FeatureGroup>

export const setupFeatureGroup = (
    props: FeatureGroupProps,
    leafletRef: Ref<FeatureGroup | undefined>,
    emit: FeatureGroupEmits,
) => {
    const { options: layerOptions, methods: layerGroupMethods } = setupLayerGroup(
        props,
        leafletRef,
        emit,
    )

    const options = propsToLeafletOptions<InteractiveLayerOptions>(props, layerOptions)

    const methods = {
        ...layerGroupMethods,
    }

    return { options, methods }
}
