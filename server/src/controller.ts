import * as alt from 'alt-server';
import { useWebview } from '@Server/player/webview.js';
import { NotifyEvents } from '../../shared/events.js';
import { NotificationConfig, NotificationTypes } from '../../shared/config.js';
import { Notification } from '../../shared/interface.js';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

export function addNotification(player: alt.Player, notification: Notification) {
    const view = useWebview(player);
    if (!notification.duration) {
        notification.duration = NotificationConfig.notificationDuration;
    }

    if (notification.oggFile && NotificationConfig.enableSounds) {
        Rebar.player.useAudio(player).playSound(`/sounds/${notification.oggFile}.ogg`);
    }

    view.emit(NotifyEvents.CREATE_NOTIFICATION, notification);
}

export function debug(player: alt.Player, message: string) {
    const view = useWebview(player);

    if (NotificationConfig.debugMode) {
        const notification: Notification = {
            title: 'Rebar Notifications',
            subTitle: '<Debug-Notification>',
            icon: NotificationTypes.warning,
            message: message,
            oggFile: 'systemfault',
            duration: NotificationConfig.notificationDuration,
        };
        view.emit(NotifyEvents.CREATE_NOTIFICATION, notification);
    }
}
