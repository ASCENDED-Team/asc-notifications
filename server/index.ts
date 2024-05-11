import * as alt from 'alt-server';

import { NotifyController } from './src/controller.js';
import { useApi } from '@Server/api/index.js';
import { NotificationConfig, NotificationTypes } from '../shared/config.js';
import { useRebar } from '@Server/index.js';

const api = useApi();
const Rebar = useRebar();


async function init() {
    await alt.Utils.waitFor(() => api.isReady('character-creator-api'), 30000);

    const charSelectApi = api.get('character-creator-api');

    charSelectApi.onCreate(handleCharacterCreated);
    charSelectApi.onSkipCreate(handleCharacterCreateSkip);
}

function handleCharacterCreated(player: alt.Player) {
    const playerData = Rebar.document.character.useCharacter(player);
    NotifyController.addNotification(player, {
        icon: NotificationTypes.success,
        title: 'Herzlich Willkommen',
        subTitle: 'Charackter erfolgreich erstellt.',
        message: `Herzlich Willkommen auf unserem Server ${playerData.get().name}!`,
    })
}

function handleCharacterCreateSkip(player: alt.Player) {
    const playerData = Rebar.document.character.useCharacter(player);
    NotifyController.addNotification(player, {
        icon: NotificationTypes.info,
        title: 'Willkommen zurück',
        subTitle: 'Dein Charakter wurde erfolgreich geladen.',
        message: `Willkommen auf unserem Server ${playerData.get().name}!`,
    })

    NotifyController.debug(player, `Hello World, this is a test for the debugging function.`)
}

if(NotificationConfig.enableRebarSelector)
{
    init();
}