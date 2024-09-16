import * as alt from 'alt-server';
import { useWebview } from '@Server/player/webview.js';
import { NotifyEvents } from '../../shared/events.js';
import { Notification, NotificationTypes } from '../../shared/interface.js';
import { useRebar } from '@Server/index.js';
import { ASCNotifications } from '../../shared/config.js';

const Rebar = useRebar();

/**
 * Sends a notification to the player.
 * @param player The player to send the notification to.
 * @param notification The notification object containing icon, title, message, etc.
 */
export function sendNotification(player: alt.Player, notification: Notification) {
    const view = useWebview(player);

    const notificationToSend: Notification = {
        duration: ASCNotifications.duration,
        oggFile: 'notification',
        ...notification,
        icon: notification.icon.valueOf(),
    };

    if (notificationToSend.oggFile && ASCNotifications.sounds) {
        Rebar.player.useAudio(player).playSound(`/sounds/${notificationToSend.oggFile}.ogg`);
    }

    console.log(`${JSON.stringify(notificationToSend)}`);
    view.emit(NotifyEvents.CREATE_NOTIFICATION, notificationToSend);
}

/**
 * Sends a notification to all online players.
 * @param notification The notification object containing icon, title, message, etc.
 */
export function sendNotificationToAll(notification: Notification) {
    alt.Player.all.forEach((player) => {
        sendNotification(player, notification);
    });
}

/**
 * Sends a debug notification to the player if debug mode is enabled.
 * @param player The player to send the notification to.
 * @param message The debug message to display.
 */
export function sendDebugNotification(player: alt.Player, message: string) {
    if (!ASCNotifications.debug) {
        return;
    }

    sendNotification(player, {
        icon: NotificationTypes.WARNING,
        title: 'Debug',
        message: message,
        duration: 10000,
        oggFile: 'systemfault',
    });
}
