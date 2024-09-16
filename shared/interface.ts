export enum NotificationTypes {
    INFO = '❗',
    ERROR = '❌',
    SUCCESS = '✅',
    WARNING = '⚠️',
}

export interface Notification {
    icon: string;
    title: string;
    subtitle?: string;
    message: string;
    duration?: number;
    oggFile?: string;
}
