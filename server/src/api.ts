import * as alt from 'alt-server';
import { useApi } from '@Server/api/index.js';

import { Notification } from '../../shared/interface.js';
import { addNotification } from './controller.js';

function useNotificationAPI() {
    function create(player: alt.Player, notification: Notification) {
        addNotification(player, notification);
    }

    return {
        create,
    }
}

declare global {
    export interface ServerPlugin {
        ['use-notification-api']: ReturnType<typeof useNotificationAPI>;
    }
}

useApi().register('use-notification-api', useNotificationAPI());