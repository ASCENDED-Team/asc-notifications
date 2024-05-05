# Athena Notification Plugin

Athena Notification Plugin is a plugin for the Athena framework that allows you to display notifications in your application.

## Usage

### Adding a Notification

You can add a notification by calling the `addNotification` method provided by the plugin. Here's an example of how to use it:

# Serverside

```javascript
const Notify = await Athena.systems.plugins.useAPI('notification-api');
Notify.addNotification(player, {
    icon: '🤑',
    title: 'Open Source Shopg',
    message: `You've successfully bought x${items} for ${totalPrice}$!`,
    duration: 5000,
});
```

# Clientside

-   Will Follow

# Params

-   `icon`: The emoji to display in the notification.
-   `title`: The title of the notification.
-   `message`: The notification message.
-   `duration`: The duration in milliseconds for how long the notification should be displayed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Getting Started

To get started with the Athena Notification Plugin, you can clone it from the source code.

1. Clone the repository:

```shell
git clone https://github.com/Booster1212/plugin-notifications.git
```

## Acknowledgments

-   This project was inspired by the need for a simple and customizable notification system in Athena applications.

## Authors

-   [Der Lord!](https://github.com/Booster1212)

## Support

For support, bug reports, or feature requests, please create an issue here on GitHub.

## Release History

-   1.0.0
    -   Initial release

## Changelog

See the [CHANGELOG.md](CHANGELOG.md) file for details about changes between versions.
