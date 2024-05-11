import * as alt from 'alt-server';
import { useApi } from '@Server/api/index.js';
import { Notification } from 'plugins/rebar-notifications/shared/interface.js';
import { NotifyController } from './controller.js';

export function useNotificationAPI() {
    function createNotification(player: alt.Player, notification: Notification) {
        NotifyController.addNotification(player, notification);
    }

    return {
        createNotification
    }
}

declare global {
    export interface ServerPlugin {
        ['use-notification-api']: ReturnType<typeof useNotificationAPI>;
    }
}

useApi().register('use-notification-api', useNotificationAPI());