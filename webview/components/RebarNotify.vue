<template>
    <div
        :class="['mb-4 flex max-w-sm items-start rounded-lg bg-black p-4 text-white shadow-lg', borderClass, 'w-80']"
        class="font-roboto border-l-4"
    >
        <!-- Icon with rounded background -->
        <div
            :class="[
                'mr-4 mt-1.5 flex-shrink-0 rounded-full p-0.5',
                iconBg,
                iconColor,
                'flex items-center justify-center',
            ]"
        >
            <span class="material-symbols-outlined text-white">
                {{ icon }}
            </span>
        </div>

        <!-- Notification content -->
        <div class="flex-1">
            <p class="font-bold uppercase">{{ props.type }}</p>
            <p v-if="props.message" class="text-sm">{{ props.message }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RebarNotification } from '../../shared/interface.js';

const props = defineProps<RebarNotification>();

// Dynamic border color class based on notification type
const borderClass = computed(() => {
    switch (props.type) {
        case 'SUCCESS':
            return 'border-green-500';
        case 'INFO':
            return 'border-blue-500';
        case 'ERROR':
            return 'border-red-500';
        case 'WARNING':
            return 'border-yellow-500';
        default:
            return 'border-gray-500';
    }
});

// Dynamic icon background color based on notification type
const iconBg = computed(() => {
    switch (props.type) {
        case 'SUCCESS':
            return 'bg-green-500';
        case 'INFO':
            return 'bg-blue-500';
        case 'ERROR':
            return 'bg-red-500';
        case 'WARNING':
            return 'bg-yellow-500';
        default:
            return 'bg-gray-500';
    }
});

// Dynamic icon color based on notification type
const iconColor = computed(() => {
    switch (props.type) {
        case 'SUCCESS':
            return 'text-green-500';
        case 'INFO':
            return 'text-blue-500';
        case 'ERROR':
            return 'text-red-500';
        case 'WARNING':
            return 'text-yellow-500';
        default:
            return 'text-gray-500';
    }
});

// Dynamic icon content based on notification type
const icon = computed(() => {
    switch (props.type) {
        case 'SUCCESS':
            return 'check'; // Use correct icon name
        case 'INFO':
            return 'info_i'; // Use correct icon name
        case 'ERROR':
            return 'close'; // Use correct icon name
        case 'WARNING':
            return 'priority_high'; // Use correct icon name
        default:
            return '';
    }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>
