import { useWebview } from '@Client/webview/index.js';
import './src/api.js';
useWebview().show('Notify', 'persistent');
useWebview().show('RebarNotification', 'persistent');
useWebview().show('Label', 'overlay');
