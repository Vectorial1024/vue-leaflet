import { props as controlProps, setup as controlSetup } from "./control";

export const props = {
  ...controlProps,
  collapsed: {
    type: Boolean,
    default: true,
  },
  autoZIndex: {
    type: Boolean,
    default: true,
  },
  hideSingleBase: {
    type: Boolean,
    default: false,
  },
  sortLayers: {
    type: Boolean,
    default: false,
  },
  sortFunction: {
    type: Function,
    default: undefined,
  },
};

export const setup = (props, leafletRef) => {
  controlSetup(leafletRef);
  const options = {
    collapsed: props.collapsed,
    autoZIndex: props.autoZIndex,
    hideSingleBase: props.hideSingleBase,
    sortLayers: props.sortLayers,
    sortFunction: props.sortFunction,
  };

  const methods = {
    addLayer(layer) {
      if (layer.layerType === "base") {
        leafletRef.value.addBaseLayer(layer.mapObject, layer.name);
      } else if (layer.layerType === "overlay") {
        leafletRef.value.addOverlay(layer.mapObject, layer.name);
      }
    },
    removeLayer(layer) {
      leafletRef.value.removeLayer(layer.mapObject);
    },
  };
  return { options, methods };
};
