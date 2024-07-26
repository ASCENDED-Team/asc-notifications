# Ascended Notification Plugin

![Notification_Kopie](https://github.com/Booster1212/rebar-notifications/assets/82890183/6e9aaa18-903f-4c27-bee1-50109a4809b1)

Ascended Notification Plugin is a plugin for the Rebar Framework that allows you to display custom notifications in your application with a que.

## Usage

### Adding a Notification

You can add a notification by calling the `addNotification` method provided by the plugin. Here's an example of how to use it:

# Serverside

```javascript
addNotification(player, {
    icon: '🤑',
    title: 'Some Notification...',
    message: `You've successfully bought x${items} for ${totalPrice}$!`,
    duration: 5000,
});
```

# Usage with Rebar PluginAPI:

```javascript
import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();
const NotificationAPI = await Rebar.useApi().getAsync('use-notification-api');

NotificationAPI.create(player, {
    title: 'Success',
    subTitle: 'Spawned vehicle',
    message: `Successfully spawned Fulltuned Vehicle [Model: ${model}] at your current position.`,
    icon: '✅',
    duration: 15000,
});
```

## Setting the position of the Notification
You have to modify the postion in the shared/config.ts file

```javascript
export const NotificationConfig = {
    debugMode: true,
    enableSounds: true,
    enableRebarSelector: true,
    notificationDuration: 10000,
    darkMode: false,
    notificationPosition: 'top-left', // Available: top-right | top-left | bottom-right | bottom-left
};
```

# Params

-   `icon`: The emoji to display in the notification.
-   `title`: The title of the notification.
-   `subtitle`: The subtitle of the notification.
-   `message`: The notification message.
-   `duration`: The duration in milliseconds for how long the notification should be displayed.
-   `oggFile?`: Sound (ogg) of the notification from /sounds folder.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Getting Started

To get started with the Ascended Notification Plugin, you can clone it from the source code.

1. Clone the repository:

```shell
git clone https://github.com/ASCENDED-Team/asc-notifications
```

## Acknowledgments

-   This project was inspired by the need for a simple and customizable notification system in Rebar applications.

## Authors

-   [Der Lord!](https://github.com/Booster1212)

## Support

For support, bug reports, or feature requests, please create an issue here on GitHub.

## Release History

-   1.0.0
    -   Initial release

## Changelog

See the [CHANGELOG.md](CHANGELOG.md) file for details about changes between versions.
