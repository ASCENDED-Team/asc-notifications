import * as alt from 'alt-server';
import { useWebview } from '@Server/player/webview.js';
import { NotifyEvents } from '../../shared/events.js';
import { NotificationConfig } from '../../shared/config.js';
import { Notification } from '../../shared/interface.js';
import { useRebar } from '@Server/index.js';
const Rebar = useRebar();

export class NotifyController {
    static addNotification(player: alt.Player, notification: Notification) {
        const view = useWebview(player);
        if (!notification.duration) {
            notification.duration = 5000;
        }

        if (notification.oggFile) {
            Rebar.player.useAudio(player).playSound(`/sounds/${notification.oggFile}.ogg`);
        }
        
        view.emit(NotifyEvents.CREATE_NOTIFICATION, notification);
    }

    static debug(msg: string) {
        if (NotificationConfig.debugMode) {
            console.log(`[Notification-DEBUG]: ${msg}`);
        }
    }
}
