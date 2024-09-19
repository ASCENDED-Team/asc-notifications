<template>
    <div :class="labelPositionClass">
        <Transition :name="transitionLabelName" tag="div">
            <div v-if="labels">
                <div
                    class="iphone-notification mx-auto mb-2 w-full rounded-lg bg-opacity-80 p-4 shadow-lg"
                    :class="ASCNotifications.darkMode ? 'bg-black' : 'bg-gray-100'"
                >
                    <div class="iphone-title flex w-full items-center gap-x-2">
                        <span class="rounded-md bg-[#169399] px-2 text-lg font-semibold text-white">
                            {{ labels.key }}
                        </span>
                        <span
                            class="text-lg font-semibold"
                            :class="ASCNotifications.darkMode ? 'text-white' : 'text-black'"
                        >
                            {{ labels.label }}
                        </span>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Label } from '../shared/interface.js';
import { NotifyEvents } from '../shared/events.js';
import { useEvents } from '../../../../webview/composables/useEvents.js';
// import { useAudio } from '../../../../webview/composables/useAudio.js';
import { ASCNotifications } from '../shared/config.js';

// const audio = useAudio();
const events = useEvents();

let debugMode = false; // Set to true for debugging

const labels = ref<Label>();

const transitionLabelName = computed(() => {
    if (ASCNotifications.textlabelPosition.includes('left')) {
        return 'label-slide-left';
    } else if (ASCNotifications.textlabelPosition.includes('right')) {
        return 'label-slide-right';
    }
    return '';
});

const labelPositionClass = computed(() => {
    const positions: { [key: string]: string } = {
        'top-right': 'fixed top-4 right-4',
        'bottom-right': 'fixed bottom-4 right-4',
        'right-center': 'fixed top-1/2 right-4 transform -translate-y-1/2',
        'top-left': 'fixed top-4 left-4',
        'bottom-left': 'fixed bottom-4 left-4',
        'left-center': 'fixed top-1/2 left-4 transform -translate-y-1/2',
    };

    return `${positions[ASCNotifications.textlabelPosition]} z-50 space-x-4`;
});

const addTextLabel = (label: Label) => {
    labels.value = { label: label.label, key: label.key };
};

const removeTextLabel = () => {
    labels.value = null;
};

const addDebugNotification = () => {
    if (debugMode) {
        const debugLabel: Label = {
            key: 'E',
            label: 'Debug Notification',
        };
        addTextLabel(debugLabel);

        setTimeout(() => {
            removeTextLabel();
        }, 5000);
    }
};

const init = () => {
    events.on(NotifyEvents.CREATE_LABEL, (label: Label) => {
        // if (notification.oggFile) {
        //     audio.play(`/sounds/${notification.oggFile}.ogg`);
        // }
        addTextLabel(label);
    });
    events.on(NotifyEvents.REMOVE_TEXTLABEL, () => {
        removeTextLabel();
    });
};

onMounted(() => {
    addDebugNotification();
    init();
});
</script>

<style scoped>
/* Left to Right Transition */
.label-slide-left-enter-active,
.label-slide-left-leave-active {
    transition:
        transform 0.5s ease-out,
        opacity 0.5s ease-out;
}

.label-slide-left-enter-from {
    transform: translateX(-100%); /* Slide in from the left */
    opacity: 0;
}

.label-slide-left-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.label-slide-left-leave-from {
    transform: translateX(0); /* Start from the normal position */
    opacity: 1;
}

.label-slide-left-leave-to {
    transform: translateX(-100%); /* Slide out to the left */
    opacity: 0;
}

/* Right to Left Transition */
.label-slide-right-enter-active,
.label-slide-right-leave-active {
    transition:
        transform 0.5s ease-out,
        opacity 0.5s ease-out;
}

.label-slide-right-enter-from {
    transform: translateX(100%); /* Slide in from the right */
    opacity: 0;
}

.label-slide-right-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.label-slide-right-leave-from {
    transform: translateX(0); /* Start from the normal position */
    opacity: 1;
}

.label-slide-right-leave-to {
    transform: translateX(100%); /* Slide out to the right */
    opacity: 0;
}
</style>
