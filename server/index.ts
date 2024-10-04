import * as alt from 'alt-server';

import { useApi } from '@Server/api/index.js';
import { useRebar } from '@Server/index.js';
import { sendNotification, sendRebarNotification } from './src/controller.js';
import { ASCNotifications } from '../shared/config.js';
import { useTranslate } from '@Shared/translate.js';

import './src/api.js';
import '../shared/translations.js';
import { Label, NotificationTypes } from '../shared/interface.js';
import { NotifyEvents } from '../shared/events.js';

const { t } = useTranslate('de');
const api = useApi();
const Rebar = useRebar();

const sendCharacterNotification = (
    player: alt.Player,
    type: NotificationTypes,
    titleKey: string,
    subtitleKey: string,
    messageKey: string,
) => {
    const playerData = Rebar.document.character.useCharacter(player).get();
    sendNotification(player, {
        icon: type,
        title: t(titleKey),
        subtitle: t(subtitleKey),
        message: t(messageKey, { name: playerData.name }),
    });
};

const handleCharacterCreated = (player: alt.Player) => {
    sendCharacterNotification(
        player,
        NotificationTypes.SUCCESS,
        'notification.character.created.title',
        'notification.character.created.subtitle',
        'notification.character.created.message',
    );
};

const handleCharacterCreateSkip = (player: alt.Player) => {
    // sendCharacterNotification(
    //     player,
    //     NotificationTypes.INFO,
    //     'notification.character.welcomeback.title',
    //     'notification.character.welcomeback.subtitle',
    //     'notification.character.welcomeback.message',
    // );
    sendRebarNotification(player, {
        type: 'SUCCESS',
        message: t('notification.character.created.title'),
    });
};

async function init() {
    await alt.Utils.waitFor(() => api.isReady('character-creator-api'), 30000);
    const charSelectApi = api.get('character-creator-api');
    charSelectApi.onCreate(handleCharacterCreated);
    charSelectApi.onSkipCreate(handleCharacterCreateSkip);
}

if (ASCNotifications.enableRebarSelector) {
    init();
}
