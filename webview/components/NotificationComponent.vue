<template>
    <div
        class="iphone-notification max-w-200 mx-auto p-4 bg-gray-100 bg-opacity-80 shadow-lg rounded-lg w-full sm:w-[350px] mb-2"
    >
        <div class="flex items-center border-b border-gray-200 justify-between w-full">
            <div class="iphone-title flex items-center w-full">
                <span class="font-semibold text-lg text-black">
                    {{ notificationProp.icon }} {{ notificationProp.title }}
                </span>
            </div>
            <span class="text-gray-500" v-if="secondsAgo >= 10">{{ secondsAgo }}s</span>
            <span class="text-gray-500" v-else>now</span>
        </div>
        <div class="mt-2">
            <div
                class="notification-progress h-2 sm:h-[2px] bg-gradient-to-r from-blue-200 to-blue-500 w-full"
                :style="{ animationDuration: notificationProp.duration + 'ms' }"
            ></div>
        </div>
        <div class="mt-2">
            <p class="text-black">{{ notificationProp.subTitle }}</p>
            <p class="text-gray-700">{{ notificationProp.message }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

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
