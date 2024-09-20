import { useWebview } from '@Client/webview/index.js';
import { NotifyEvents } from '../../shared/events.js';
import { Label, Notification } from '../../shared/interface.js';

export function addNotification(notification: Notification) {
    if (!notification.duration) {
        notification.duration = 5000;
    }

    useWebview().emit(NotifyEvents.toWebview.CREATE_NOTIFICATION, notification);
}

export function createTextlabel(label: Label) {
    useWebview().emit(NotifyEvents.toWebview.CREATE_LABEL, label);
}

export function removeTextlabel() {
    useWebview().emit(NotifyEvents.toWebview.REMOVE_TEXTLABEL);
}
