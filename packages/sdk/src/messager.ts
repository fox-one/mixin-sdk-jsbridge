import { env, getLogger } from '@utils/index';

type Messagers = {
  getContext: () => Record<string, any>;
  playlist: (audios: string[]) => any;
  reloadTheme: () => void;
}
declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        MixinContext?: any;
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
export function messager<T extends keyof Messagers>(type: T) {
  const envInfo = env();
  const handler = envInfo.isIOS
    ? type === 'getContext'
      ? () => JSON.parse(prompt('MixinContext.getContext()') as any) as Record<string, any>
      : window?.webkit?.messageHandlers?.[type as Exclude<T, 'getContext'>]?.postMessage.bind(window?.webkit?.messageHandlers?.[type as Exclude<T, 'getContext'>]) as Messagers[Exclude<T, 'getContext'>]
    : window?.MixinContext?.[type]?.bind(window?.MixinContext) as Messagers[T];

  return handler ?? (() => logger().warn(`The messager "${type}" is not support yet!`));
}

export default messager;