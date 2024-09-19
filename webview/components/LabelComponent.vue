<template>
    <div
        class="iphone-notification mx-auto mb-2 w-full rounded-lg bg-opacity-80 p-4 shadow-lg"
        :class="ASCNotifications.darkMode ? 'bg-black' : 'bg-gray-100'"
    >
        <div class="iphone-title flex w-full items-center gap-x-2">
            <span class="rounded-md bg-[#169399] px-2 text-lg font-semibold text-white">
                {{ labelProp.key }}
            </span>
            <span class="text-lg font-semibold" :class="ASCNotifications.darkMode ? 'text-white' : 'text-black'">
                {{ labelProp.label }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ASCNotifications } from '../../shared/config';

const { labelProp } = defineProps({
    labelProp: Object,
});
</script>

<style scoped>
.notification-progress {
    width: 100%;
    animation: progressAnimation linear forwards;
    height: 2px;
}

@keyframes progressAnimation {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}
</style>
