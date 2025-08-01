import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Home from './views/DemoHome.vue'
import 'leaflet/dist/leaflet.css'

const routes = [
    { path: '/', component: Home },
    { path: '/grid-layer', component: () => import('./views/GridLayerDemo.vue') },
    { path: '/tile-layer', component: () => import('./views/TileLayerDemo.vue') },
    {
        path: '/wms-tile-layer',
        component: () => import('./views/WmsTileLayerDemo.vue'),
    },
    {
        path: '/feature-group',
        component: () => import('./views/FeatureGroupDemo.vue'),
    },
    { path: '/circle', component: () => import('./views/CircleDemo.vue') },
    {
        path: '/circle-marker',
        component: () => import('./views/CircleMarkerDemo.vue'),
    },
    {
        path: '/control-attribution',
        component: () => import('./views/ControlAttributionDemo.vue'),
    },
    {
        path: '/control-custom-message',
        component: () => import('./views/ControlCustomMessageDemo.vue'),
    },
    {
        path: '/control-layers',
        component: () => import('./views/ControlLayersDemo.vue'),
    },
    {
        path: '/control-scale',
        component: () => import('./views/ControlScaleDemo.vue'),
    },
    {
        path: '/control-zoom',
        component: () => import('./views/ControlZoomDemo.vue'),
    },
    { path: '/geo-json', component: () => import('./views/GeoJsonDemo.vue') },
    { path: '/icon', component: () => import('./views/IconDemo.vue') },
    { path: '/marker', component: () => import('./views/MarkerDemo.vue') },
    {
        path: '/image-overlay',
        component: () => import('./views/ImageOverlayDemo.vue'),
    },
    { path: '/polygon', component: () => import('./views/PolygonDemo.vue') },
    { path: '/polyline', component: () => import('./views/PolylineDemo.vue') },
    { path: '/popup', component: () => import('./views/PopupDemo.vue') },
    { path: '/rectangle', component: () => import('./views/RectangleDemo.vue') },
    { path: '/tooltip', component: () => import('./views/TooltipDemo.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
