import type { ImageOverlay, ImageOverlayOptions, LatLngBounds, LatLngBoundsExpression } from 'leaflet'
import type { Ref } from 'vue'

import { propsToLeafletOptions } from '../utils'

import { type LayerEmits, type LayerProps, layerPropsDefaults, setupLayer } from './layer'

export interface ImageOverlayProps extends LayerProps {
    opacity?: number
    alt?: string
    interactive?: boolean
    crossOrigin?: boolean
    errorOverlayUrl?: string
    zIndex?: number
    className?: string
    url: string
    bounds: LatLngBoundsExpression
}

export const imageOverlayPropsDefaults = {
    ...layerPropsDefaults,
    interactive: undefined,
    crossOrigin: undefined,
}

export type ImageOverlayEmits = LayerEmits & {
    (event: 'ready', layer: ImageOverlay): void
}

export const setupImageOverlay = (
    props: ImageOverlayProps,
    leafletRef: Ref<ImageOverlay | undefined>,
    emit: ImageOverlayEmits,
) => {
    const { options: layerOptions, methods: layerMethods } = setupLayer(props, leafletRef, emit)

    const options = propsToLeafletOptions<ImageOverlayOptions>(props, layerOptions)

    const methods = {
        ...layerMethods,
        /**
         * Sets the opacity of the overlay.
         * @param {number} opacity
         */
        setOpacity(opacity: number) {
            return leafletRef.value?.setOpacity(opacity)
        },
        /**
         * Changes the URL of the image.
         * @param {string} url
         */
        setUrl(url: string) {
            return leafletRef.value?.setUrl(url)
        },
        /**
         * Update the bounds that this ImageOverlay covers
         * @param {LatLngBounds | Array<Array<number>>} bounds
         */
        setBounds(bounds: LatLngBounds) {
            return leafletRef.value?.setBounds(bounds)
        },
        /**
         * Get the bounds that this ImageOverlay covers
         * @returns {LatLngBounds}
         */
        getBounds() {
            return leafletRef.value?.getBounds()
        },
        /**
         * Returns the instance of HTMLImageElement used by this overlay.
         * @returns {HTMLElement}
         */
        getElement() {
            return leafletRef.value?.getElement()
        },
        /**
         * Brings the layer to the top of all overlays.
         */
        bringToFront() {
            return leafletRef.value?.bringToFront()
        },
        /**
         * Brings the layer to the bottom of all overlays.
         */
        bringToBack() {
            return leafletRef.value?.bringToBack()
        },
        /**
         * Changes the zIndex of the image overlay.
         * @param {number} zIndex
         */
        setZIndex(zIndex: number) {
            return leafletRef.value?.setZIndex(zIndex)
        },
    }

    return { options, methods }
}
