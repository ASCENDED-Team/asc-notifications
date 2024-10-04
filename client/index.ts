import { useWebview } from '@Client/webview/index.js';
import './src/api.js';

useWebview().show('Label', 'overlay');
useWebview().show('Notify', 'persistent');
