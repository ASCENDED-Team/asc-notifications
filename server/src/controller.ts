import * as alt from 'alt-server';
import { useWebview } from '@Server/player/webview.js';
import { NotifyEvents } from '../../shared/events.js';
import { AllPlayerLabels, Label, Notification, NotificationTypes, RebarNotification } from '../../shared/interface.js';
import { useRebar } from '@Server/index.js';
import { ASCNotifications } from '../../shared/config.js';

const Rebar = useRebar();

const allPlayerLabels: { [key: number]: AllPlayerLabels } = {};

class InternalFunctions {
    static update(playerLabels: AllPlayerLabels) {
        allPlayerLabels[playerLabels.playerId] = playerLabels;
    }
}

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
        icon: notification.icon,
    };

    if (notificationToSend.oggFile && ASCNotifications.sounds) {
        Rebar.player.useAudio(player).playSound(`/sounds/${notificationToSend.oggFile}.ogg`);
    }

    view.emit(NotifyEvents.toWebview.CREATE_NOTIFICATION, notificationToSend);
}

export function sendRebarNotification(player: alt.Player, notification: RebarNotification) {
    const view = useWebview(player);

    const notificationToSend: RebarNotification = {
        duration: ASCNotifications.duration,
        oggFile: 'mixkit',
        ...notification,
    };

    if (notificationToSend.oggFile && ASCNotifications.sounds) {
        Rebar.player.useAudio(player).playSound(`/sounds/${notificationToSend.oggFile}.ogg`);
    }

    view.emit(NotifyEvents.toWebview.CREATE_REBAR_NOTIFICATION, notificationToSend);
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

export function sendRebarNotificationToAll(notification: RebarNotification) {
    alt.Player.all.forEach((player) => {
        sendRebarNotification(player, notification);
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

/**
 * Sends a text label to the player.
 * @param player The player to send the text label to.
 * @param label The notification object containing  title, key, etc.
 */
export function createTextlabel(player: alt.Player, label: Label) {
    const view = useWebview(player);

    const labelToSend: Label = {
        oggFile: 'notification',
        ...label,
    };

    if (labelToSend.oggFile && ASCNotifications.labelSound) {
        Rebar.player.useAudio(player).playSound(`/sounds/${labelToSend.oggFile}.ogg`);
    }
    const labelToUpdate: AllPlayerLabels = {
        playerId: player.id,
        ...label,
    };
    allPlayerLabels[player.id] = labelToUpdate;
    InternalFunctions.update(allPlayerLabels[player.id]);
    view.emit(NotifyEvents.toWebview.CREATE_LABEL, labelToSend);
}

export function removeTextlabel(player: alt.Player) {
    const view = useWebview(player);
    delete allPlayerLabels[player.id];
    view.emit(NotifyEvents.toWebview.REMOVE_TEXTLABEL);
}

function handleCallback(player: alt.Player) {
    if (!player || !allPlayerLabels[player.id]) return;
    if (allPlayerLabels[player.id]) {
        createTextlabel(player, allPlayerLabels[player.id]);
    }
}

alt.onClient(NotifyEvents.toServer.SEND_LABEL_DATA_TO_SERVER, handleCallback);
