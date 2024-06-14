import { useClientApi } from '@Client/api/index.js';
import { Notification } from '../../shared/interface.js';
import { addNotification } from './controller.js';

export function useNotificationAPI() {
    function create(notification: Notification) {
        addNotification(notification);
    }
    return {
        create,
    };
}

declare global {
    export interface ClientPlugin {
        ['ascended-notification-api']: ReturnType<typeof useNotificationAPI>;
    }
}

useClientApi().register('ascended-notification-api', useNotificationAPI());
