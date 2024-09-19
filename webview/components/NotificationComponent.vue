<template>
    <div
        class="iphone-notification max-w-200 mx-auto mb-2 w-full rounded-lg bg-opacity-80 p-4 shadow-lg sm:w-[350px]"
        :class="ASCNotifications.darkMode ? 'bg-black' : 'bg-gray-100'"
    >
        <div class="flex w-full items-center justify-between border-b border-gray-200">
            <div class="iphone-title flex w-full items-center">
                <span class="text-lg font-semibold" :class="ASCNotifications.darkMode ? 'text-white' : 'text-black'">
                    {{ notificationProp.icon }} {{ notificationProp.title }}
                </span>
            </div>
            <span :class="ASCNotifications.darkMode ? 'text-white' : 'text-gray-500'" v-if="secondsAgo >= 10"
                >{{ secondsAgo }}s</span
            >
            <span :class="ASCNotifications.darkMode ? 'text-white' : 'text-gray-500'" v-else>now</span>
        </div>
        <div class="mt-2">
            <div
                class="notification-progress h-2 w-full bg-gradient-to-r from-blue-200 to-blue-500 sm:h-[2px]"
                :style="{ animationDuration: notificationProp.duration + 'ms' }"
            ></div>
        </div>
        <div class="mt-2">
            <p :class="ASCNotifications.darkMode ? 'text-gray-200' : 'text-black'">{{ notificationProp.subtitle }}</p>
            <p :class="ASCNotifications.darkMode ? 'text-gray-300' : 'text-gray-700'">{{ notificationProp.message }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ASCNotifications } from '../../shared/config';

const { notificationProp } = defineProps({
    notificationProp: Object,
    secondsAgo: Number,
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
