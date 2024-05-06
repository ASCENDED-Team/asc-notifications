import * as alt from 'alt-client';
import { NotifyController } from './src/controller.js';
import { useWebview } from '@Client/webview/index.js';


useWebview().show('Notify', 'persistent');

alt.on('keydown', (key: number) => {
    if(key === 'H'.charCodeAt(0)) {
        NotifyController.addNotification({
            icon: '✅',
            title: 'Notification Test',
            message: 'Hello World - This is a notification test!',
            duration: 5000,
            subTitle: 'Initialized',
            oggFile: 'notification'
        })
    }
})
