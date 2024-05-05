import * as alt from 'alt-server';

import { NotifyController } from './src/controller.js';

alt.on('playerConnect', (player: alt.Player) => {
    setTimeout(() => {
        NotifyController.addNotification(player, {
            title: 'Selected-Character',
            message: `Welcome to our Server!`,
            icon: '😍',
            subTitle: 'Info'
        });
    }, 250);
})