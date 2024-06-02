import * as alt from 'alt-client';
import { NotifyController } from './src/controller.js';
import { useWebview } from '@Client/webview/index.js';


useWebview().show('Notify', 'persistent');
