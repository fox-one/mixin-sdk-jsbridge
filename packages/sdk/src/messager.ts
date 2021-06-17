import { env, getLogger } from '@utils/index';

type CONTEXT = {
  app_version: string;
  immersive: boolean;
  appearance: 'light' | 'dark';
  currency: string;
  locale: string;
  platform: 'iOS' | 'Android' | 'Desktop';
  conversation_id: string;
  [props: string]: any;
};
interface MESSAGERS {
  getContext: () => CONTEXT;
  playlist: (audios: string[]) => any;
  reloadTheme: () => void;
}
declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        MixinContext?: any;
        playlist?: { postMessage: MESSAGERS['playlist'] };
        reloadTheme?: { postMessage: MESSAGERS['reloadTheme'] };
      };
    };
    MixinContext?: {
      getContext?: MESSAGERS['getContext'];
      playlist?: MESSAGERS['playlist'];
      reloadTheme?: MESSAGERS['reloadTheme'];
    };
  }
}

const logger = getLogger('messager');
export function messager<T extends keyof MESSAGERS>(type: T) {
  const envInfo = env();
  const handler =
    envInfo.isIOS
      ? type === 'getContext'
        ? () => JSON.parse(prompt('MixinContext.getContext()') as any) as CONTEXT
        : window?.webkit?.messageHandlers?.[type as Exclude<T, 'getContext'>]?.postMessage.bind(window?.webkit?.messageHandlers?.[type as Exclude<T, 'getContext'>]) as MESSAGERS[Exclude<T, 'getContext'>]
      : window?.MixinContext?.[type]?.bind(window?.MixinContext) as MESSAGERS[T];

  return handler ?? (() => logger().warn(`The messager "${type}" is not support yet!`));
}

export default messager;