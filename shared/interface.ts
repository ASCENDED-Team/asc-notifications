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

export interface ASCNotification {
    debug: boolean;
    sounds: boolean;
    labelSound: boolean;
    enableRebarSelector: boolean;
    duration: number;
    darkMode: boolean;
    position: keyof LabelPositionsT;
    textlabelPosition: keyof LabelPositionsT;
    checkForUpdates: boolean;
}

export interface Label {
    keyToPress: string;
    label: string;
    oggFile?: string;
}

export interface AllPlayerLabels extends Label {
    playerId: number;
}

export type LabelPositionsT = {
    'top-left': string;
    'bottom-left': string;
    'left-center': string;
    'top-right': string;
    'bottom-right': string;
    'right-center': string;
};
