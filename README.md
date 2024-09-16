# Ascended Notification Plugin

![Notification_Kopie](https://github.com/Booster1212/rebar-notifications/assets/82890183/6e9aaa18-903f-4c27-bee1-50109a4809b1)

Ascended Notification Plugin is a plugin for the Rebar Framework that allows you to display custom notifications in your application with a queue.

## Usage

### Adding a Notification

You can add a notification using the Rebar Plugin API. Here's an example:

```typescript
import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { NotificationTypes } from 'your-plugin-path/shared/interface.js'; // Adjust path

const Rebar = useRebar();
const NotificationAPI = await Rebar.useApi().getAsync('ascended-notification-api');

// Send notification to a specific player
NotificationAPI.general.send(player, {
    icon: NotificationTypes.SUCCESS, // Use enum for icon types
    title: 'Success',
    subtitle: 'Spawned vehicle',
    message: `Successfully spawned Fulltuned Vehicle [Model: ${model}] at your current position.`,
    duration: 15000,
});

// Send notification to all players
NotificationAPI.general.sendAll({
    icon: NotificationTypes.INFO,
    title: 'Server Announcement',
    message: 'A new update is coming soon!',
});
```

### Setting the position of the Notification

You can modify the position in the shared/config.ts file:

```typescript
export const ASCNotifications = {
    // ... other config options
    position: 'top-left', // Available: top-right | top-left | bottom-right | bottom-left
};
```

### Notification Object Properties

-   **icon**: The icon to display in the notification (use NotificationTypes enum).
-   **title**: The title of the notification.
-   **subtitle**: (Optional) The subtitle of the notification.
-   **message**: The notification message.
    duration**: (Optional) The duration in milliseconds for how long the notification should be displayed (defaults to value in config).
    oggFile**: (Optional) Sound (ogg) of the notification from the /sounds folder (defaults to 'notification').

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Getting Started

To get started with the Ascended Notification Plugin, you can clone it from the source code.

# Clone the repository:

```bash
git clone https://github.com/ASCENDED-Team/asc-notifications
```

### Acknowledgments

-   This project was inspired by the need for a simple and customizable notification system in Rebar applications.
    **Authors**:

*   Der Lord!

# Support

-   For support, bug reports, or feature requests, please create an issue here on GitHub.
