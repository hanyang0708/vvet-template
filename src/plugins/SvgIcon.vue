<template>
    <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size" :style="`color:${color}`">
        <use :xlink:href="symbolId" rel="external nofollow"  :fill="props.color" />
    </svg>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    const props = defineProps({
    prefix: {
        type: String,
        default: 'icon'
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#fff'
    },
    size: {
        type: String,
        default: '1em'
    }
    })
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="less">
    
</style>