import { useApi } from '@Server/api/index.js';
import { sendNotification } from './controller.js';
import { NotificationTypes } from '../../shared/interface.js';

function useNotificationAPI() {
    const general = {
        send: sendNotification,
        sendAll: sendNotification,
        getTypes: () => {
            return NotificationTypes;
        },
    };

    return {
        general,
    };
}

declare global {
    export interface ServerPlugin {
        ['ascended-notification-api']: ReturnType<typeof useNotificationAPI>;
    }
}

useApi().register('ascended-notification-api', useNotificationAPI());
