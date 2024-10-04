import * as alt from 'alt-server';

import { useApi } from '@Server/api/index.js';
import { useRebar } from '@Server/index.js';
import { sendNotification } from './src/controller.js';
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
    sendCharacterNotification(
        player,
        NotificationTypes.INFO,
        'notification.character.welcomeback.title',
        'notification.character.welcomeback.subtitle',
        'notification.character.welcomeback.message',
    );
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

function handleCallback(player: alt.Player, label: Label) {}

alt.onClient(NotifyEvents.toServer.SEND_LABEL_DATA_TO_SERVER, handleCallback);

// Check for Updates...
if (ASCNotifications.checkForUpdates) {
    async function requestLatestVersion() {
        const apiKey = 'qcsWTe_olrldSoni3K8AHkTeDCeu2rJiG5AKeqAWBBc';
        const repoUrl = 'ascended-team/asc-notifications';

        try {
            const commitResponse = await fetch(`https://api.github.com/repos/${repoUrl}/commits/main`);
            if (!commitResponse.ok) {
                throw new Error(`Failed to fetch commit hash: ${commitResponse.status}`);
            }
            const commitData = await commitResponse.json();
            const currentCommitHash = commitData.sha;

            const apiUrl = `http://api.rebar-ascended.dev:5072/versioncheck-api?url=${repoUrl}&version=${currentCommitHash}&apiKey=${apiKey}`;

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();

            let message = `[\x1b[35mASCENDED-Repository\x1b[0m] => \x1b[35m${data.repository}\x1b[0m is `;
            if (data.isOutdated) {
                message += `\x1b[31mOUTDATED\x1b[0m`;
            } else {
                message += '\x1b[32mUPDATED\x1b[0m';
            }
            message += `. Latest Commit: ${data.latestCommit} (${data.latestCommitHash.slice(0, 5)})`;

            alt.log(message);
        } catch (error) {
            alt.logWarning(
                `[\x1b[35mASCENDED\x1b[0m-Versioncheck-API] => \x1b[31mError checking for updates:\x1b[0m \x1b[35m${error.message}\x1b[0m`,
            );
        }
    }

    requestLatestVersion();
}
