import { useApi } from '@Server/api/index.js';
import { sendNotification, createTextlabel, removeTextlabel, sendNotificationToAll } from './controller.js';
import { NotificationTypes } from '../../shared/interface.js';

function useNotificationAPI() {
    const general = {
        send: sendNotification,
        sendAll: sendNotificationToAll,
        getTypes: () => {
            return NotificationTypes;
        },
    };

    const textLabel = {
        create: createTextlabel,
        remove: removeTextlabel,
    };

    return {
        general,
        textLabel,
    };
}

declare global {
    export interface ServerPlugin {
        ['ascended-notification-api']: ReturnType<typeof useNotificationAPI>;
    }
}

useApi().register('ascended-notification-api', useNotificationAPI());
