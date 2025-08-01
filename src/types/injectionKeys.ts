import type { InjectionKey } from 'vue'

import type { IControlDefinition, ILayerDefinition } from './interfaces'
import type { Control, DivIcon, Icon, Layer, Marker } from 'leaflet'

export const AddLayerInjection = Symbol('addLayer') as InjectionKey<
    (layer: ILayerDefinition) => void
>

export const RemoveLayerInjection = Symbol('removeLayer') as InjectionKey<
    (layer: ILayerDefinition) => void
>

export const RegisterControlInjection = Symbol('registerControl') as InjectionKey<
    (control: IControlDefinition) => void
>

export const RegisterLayerControlInjection = Symbol('registerLayerControl') as InjectionKey<
    (control: IControlDefinition<Control.Layers>) => void
>

export const CanSetParentHtmlInjection = Symbol('canSetParentHtml') as InjectionKey<() => boolean>

export const SetParentHtmlInjection = Symbol('setParentHtml') as InjectionKey<
    (html: string) => void
>

export const SetIconInjection = Symbol('setIcon') as InjectionKey<
    (newIcon: DivIcon | Icon | undefined) => Marker<any> | undefined
>

export const BindPopupInjection = Symbol('bindPopup') as InjectionKey<
    (leafletObject: Layer | undefined) => void
>

export const BindTooltipInjection = Symbol('bindTooltip') as InjectionKey<
    (leafletObject: Layer | undefined) => void
>

export const UnbindPopupInjection = Symbol('unbindPopup') as InjectionKey<() => void>

export const UnbindTooltipInjection = Symbol('unbindTooltip') as InjectionKey<() => void>
