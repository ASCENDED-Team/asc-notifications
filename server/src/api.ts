import * as alt from 'alt-server';
import { useApi } from '@Server/api/index.js';

import { Notification } from '../../shared/interface.js';
import { addNotification } from './controller.js';
import { NotificationTypes } from '../../shared/config.js';

function useNotificationAPI() {
    function create(player: alt.Player, notification: Notification) {
        addNotification(player, notification);
    }

    function type() {
        return NotificationTypes;
    }

    return {
        create,
        type
    }
}

declare global {
    export interface ServerPlugin {
        ['ascended-notification-api']: ReturnType<typeof useNotificationAPI>;
    }
}

useApi().register('ascended-notification-api', useNotificationAPI());