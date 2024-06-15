import { useWebview } from '@Client/webview/index.js';
import './src/api.js';
useWebview().show('Notify', 'persistent');
