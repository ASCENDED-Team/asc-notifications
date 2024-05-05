import { useWebview } from '@Client/webview/index.js';
import { NotifyEvents } from '../../shared/events.js';
import { Notification } from '../../shared/interface.js';

export class NotifyController {
    static addNotification(notification: Notification) {
        if (!notification.duration) {
            notification.duration = 5000;
        }

        useWebview().emit(NotifyEvents.CREATE_NOTIFICATION, notification);

        console.log(`Current Notification: ${JSON.stringify(notification, undefined, 4)}`)
    }
}
