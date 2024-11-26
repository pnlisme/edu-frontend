<template>
    <button :class="buttonClasses" :type="type" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import type { Button } from '@/interfaces';
import { computed, defineProps } from 'vue';

const props = defineProps<Button>()
const buttonClasses = computed(() => {
    switch (props.variant) {
        case 'primary':
            return ' hover:shadow-md hover:shadow-indigo-200 rounded-md lg:rounded-lg font-medium lg:py-3 py-2 px-4 lg:text-md text-sm lg:px-8 text-white transition ease-in-out bg-indigo-500   hover:bg-indigo-600 duration-300';
        case 'default':
        default:
            return 'hover:shadow-md hover:shadow-indigo-100 border border-indigo-600 rounded-md lg:rounded-lg font-medium lg:py-2 py-1 px-4 lg:text-md text-sm lg:px-8 text-indigo-600 transition ease-in-out bg-white   hover:bg-indigo-100 duration-300';
    }
});
</script>
