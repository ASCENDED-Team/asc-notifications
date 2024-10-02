import { useClientApi } from '@Client/api/index.js';
import { Label, Notification, RebarNotification } from '../../shared/interface.js';
import { addNotification, addRebarNotification, createTextlabel, removeTextlabel } from './controller.js';

export function useNotificationAPI() {
    function create(notification: Notification) {
        addNotification(notification);
    }
    function createRebarNotify(notification: RebarNotification) {
        addRebarNotification(notification);
    }
    function createTextLabel(label: Label) {
        createTextlabel(label);
    }
    function removeTextLabel() {
        removeTextlabel();
    }
    return {
        create,
        createRebarNotify,
        createTextLabel,
        removeTextLabel,
    };
}

declare global {
    export interface ClientPlugin {
        ['ascended-notification-api']: ReturnType<typeof useNotificationAPI>;
    }
}

useClientApi().register('ascended-notification-api', useNotificationAPI());
