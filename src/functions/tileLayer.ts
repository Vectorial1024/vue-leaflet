import {
    type GridLayerEmits,
    type GridLayerProps,
    gridLayerPropsDefaults,
    setupGridLayer,
} from './gridLayer'
import type { Ref } from 'vue'
import { type TileLayer, type TileLayerOptions } from 'leaflet'
import { propsToLeafletOptions } from '../utils.ts'

export interface TileLayerProps<T extends TileLayerOptions = TileLayerOptions> extends GridLayerProps<T> {
    tms?: boolean
    subdomains?: string | string[]
    detectRetina?: boolean
    url: string
}

export const tileLayerPropsDefaults = {
    ...gridLayerPropsDefaults,
    tms: undefined,
    detectRetina: undefined,
}

export type TileLayerEmits<T extends TileLayer = TileLayer> = GridLayerEmits<T>

export const setupTileLayer = <T extends TileLayer>(
    props: TileLayerProps,
    leafletRef: Ref<T | undefined>,
    emit: TileLayerEmits<T>,
) => {
    const { options: gridLayerOptions, methods: gridLayerMethods } = setupGridLayer(
        props,
        leafletRef,
        emit,
    )
    const options = propsToLeafletOptions<TileLayerOptions>(props, gridLayerOptions)

    const methods = {
        ...gridLayerMethods,
    }

    return { options, methods }
}
