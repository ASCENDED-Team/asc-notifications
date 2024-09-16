import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    de: {
        'notification.character.created.title': 'Charakter erstellt',
        'notification.character.created.subtitle': 'Willkommen!',
        'notification.character.created.message': 'Herzlich Willkommen auf unserem Server, {{name}}!',
        'notification.character.welcomeback.title': 'Schön dich zu sehen',
        'notification.character.welcomeback.subtitle': 'Willkommen zurück!',
        'notification.character.welcomeback.message': 'Willkommen zurück auf unserem Server, {{name}}!',
    },
    en: {
        'notification.character.created.title': 'Character Created',
        'notification.character.created.subtitle': 'Welcome!',
        'notification.character.created.message': 'Welcome to our server, {{name}}!',
        'notification.character.welcomeback.title': 'Good to see you',
        'notification.character.welcomeback.subtitle': 'Welcome back!',
        'notification.character.welcomeback.message': 'Welcome back to our server, {{name}}!',
    },
});
