<template>
    <div :class="notificationPositionClass">
        <transition-group :name="transitionNotificationName" tag="div">
            <div v-for="(notification, index) in reversedNotifications" :key="notification.id">
                <NotificationComponent :notification-prop="notification" :secondsAgo="notification.elapsedSeconds" />
            </div>
        </transition-group>
    </div>
    <div :class="labelPositionClass">
        <Transition :name="transitionLabelName" tag="div">
            <div v-if="labels">
                <LabelComponent :label-prop="labels" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Notification, Label, LabelPositionsT } from '../shared/interface.js';
import { NotifyEvents } from '../shared/events.js';
import { useEvents } from '../../../../webview/composables/useEvents';
import NotificationComponent from './components/NotificationComponent.vue';
import { useAudio } from '../../../../webview/composables/useAudio';
import { ASCNotifications } from '../shared/config.js';
import LabelComponent from './components/LabelComponent.vue';

const audio = useAudio();
const events = useEvents();

defineProps({
    notificationProp: Object,
    secondsAgo: Number,
    labelProp: Object,
});

let debugMode = false; // Set to true for debugging

interface VueNotification extends Notification {
    id?: number;
    progress?: number;
    startTime?: number;
    elapsedSeconds?: number;
}

const notifications = ref<VueNotification[]>([]);
const labels = ref<Label>();

let timer: NodeJS.Timeout | null = null;

const reversedNotifications = computed(() => {
    return notifications.value.slice().reverse();
});

const notificationPositionClass = computed(() => {
    const positions: { [key: string]: string } = {
        'top-right': 'fixed top-4 right-4',
        'bottom-right': 'fixed bottom-4 right-4',
        'right-center': 'fixed top-1/2 right-4 transform -translate-y-1/2',
        'top-left': 'fixed top-4 left-4',
        'bottom-left': 'fixed bottom-4 left-4',
        'left-center': 'fixed top-1/2 left-4 transform -translate-y-1/2',
    };
    return `${positions[ASCNotifications.position]} z-50 space-x-4`;
});

const transitionLabelName = computed(() => {
    if (ASCNotifications.textlabelPosition.includes('left')) {
        return 'label-slide-left';
    } else if (ASCNotifications.textlabelPosition.includes('right')) {
        return 'label-slide-right';
    }
    return '';
});

const transitionNotificationName = computed(() => {
    if (ASCNotifications.position.includes('left')) {
        return 'label-slide-left';
    } else if (ASCNotifications.position.includes('right')) {
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

const addNotification = (notification: VueNotification) => {
    notification.progress = 0;
    notification.id = generateUniqueId();
    notification.startTime = Date.now();

    notifications.value.push(notification);

    if (!timer) {
        timer = setInterval(updateProgress, 10);
    }
};

const addTextLabel = (label: Label) => {
    labels.value = { label: label.label, key: label.key };
};

const removeTextLabel = () => {
    labels.value = null;
};

const removeNotification = (index: number) => {
    notifications.value.splice(index, 1);

    if (notifications.value.length === 0 && timer) {
        clearInterval(timer);
        timer = null;
    }
};

function generateUniqueId() {
    return Date.now();
}

const updateProgress = () => {
    const currentTime = Date.now();

    for (let i = notifications.value.length - 1; i >= 0; i--) {
        const notification = notifications.value[i];
        if (notification.progress < 100) {
            const elapsedTime = currentTime - notification.startTime;
            notification.elapsedSeconds = Math.floor(elapsedTime / 1000);
            if (elapsedTime < notification.duration) {
                notification.progress = (elapsedTime / notification.duration) * 100;
            } else {
                notification.progress = 100;
                removeNotification(i);
            }
        }
    }
};

const addDebugNotification = () => {
    if (!debugMode) {
        const debugNotification: VueNotification = {
            title: 'Debug Notification',
            icon: '🤣',
            message:
                'This is a very long test debug notification to redesign the notification system! This is a very long test debug notification to redesign the notification system!',
            duration: 60000 * 60, // 1 hour in milliseconds
        };
        const debugLabel: Label = {
            key: 'E',
            label: 'Debug Notification',
        };
        addTextLabel(debugLabel);
        addNotification(debugNotification);

        setTimeout(() => {
            removeTextLabel();
        }, 5000);
    }
};

const init = () => {
    events.on(NotifyEvents.CREATE_NOTIFICATION, (notification: VueNotification) => {
        if (notification.oggFile) {
            audio.play(`/sounds/${notification.oggFile}.ogg`);
        }
        addNotification(notification);
    });
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
.notification-slide-enter-active,
.notification-slide-leave-active {
    transition:
        opacity 1.5s,
        transform 1.5s;
}

.notification-slide-enter,
.notification-slide-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

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
