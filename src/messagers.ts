import { env, getLogger } from '@utils/index';

type Messagers = {
  getContext: () => any;
  playlist: (audios: string[]) => any;
  reloadTheme: () => any;
}
declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        MixinContext?: any;
        getContext?: { postMessage: Messagers['getContext'] };
        playlist?: { postMessage: Messagers['playlist'] };
        reloadTheme?: { postMessage: Messagers['reloadTheme'] };
      };
    };
    MixinContext?: {
      getContext?: Messagers['getContext'];
      playlist?: Messagers['playlist'];
      reloadTheme?: Messagers['reloadTheme'];
    };
  }
}

const logger = getLogger('messager');
export function messager(type: keyof Messagers) {
  const envInfo = env();
  const handler = envInfo.isIOS
    ? window?.webkit?.messageHandlers?.[type]?.postMessage.bind(window?.webkit?.messageHandlers?.[type]?.postMessage)
    : window?.MixinContext?.[type]?.bind(window?.MixinContext?.[type]);

  return handler ?? (() => logger().warn('Please call in mixin app!'));
}

export default messager;